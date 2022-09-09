import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  public static updateEmpleados: Subject<boolean> = new Subject();

  public p: number = 1;
  
  constructor(
    private dataApi: DataApiService,
    private apiAuthService: AuthUserService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    EmpleadosComponent.updateEmpleados.subscribe((res) => {
      // setTimeout(() => {
      //   this.getListUsers();
      // }, 100);
    });
  }

  public empleadoNoEmp = '';
  public email = '';
  public usuarioApellidoP = '';
  public empresaNombre = '';
  public usuario: Usuario;
  public users: Observable<Usuario[]>;
  public isAdmin: any = null;
  public userUid: number = null;

  public usuarioFiltro: Usuario;

  ngOnInit() {
     this.cambiarEstatusSpinner(true);
    // this.getListUsers();
    this.getCurrentUser();
    this.RecuperaEmpresas();
  }

  //Lista de las empresas
  public empresas: Empresa[]; 

   //Inicio del filtro
   public selectEmpresa: Empresa;

   //Se recuperan las empresas y se ordenan de forma alfabetica
  RecuperaEmpresas() {
   
    this.dataApi.GetList('/Empresas').subscribe(
      (empresas) => {
        this.empresas = empresas.sort((a, b) => {
          if (a.empresaNombre > b.empresaNombre) {
            return 1;
          }
          if (a.empresaNombre < b.empresaNombre) {
            return -1;
          }
          return 0;
        });
        this.selectEmpresa = this.empresas[0];
        this.cambiarEstatusSpinner(false);
      },
      (error) => {
        this.cambiarEstatusSpinner(false);
        this.toastr.error(
          'Error en el servidor, contacte al administrador del sistema.',
          'Error',
          {
            timeOut: 3000,
          }
        );
      }
    );
  }
  
  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    if (this.usuario) {
      this.userUid = this.usuario.usuarioId;
      if (this.usuario.rolId == 1) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  getListUsers() {
    this.cambiarEstatusSpinner(true);

    this.usuarioFiltro = {
      usuarioId :0,
      email: this.email,
      empleadoNoEmp: this.empleadoNoEmp,
      empresaId: this.selectEmpresa.empresaId,
      // empleadoRFC: null,
      // imageBase64:null,
      // imageFullPath: null,
      // password: null,
      // rolId: null,
      // usuarioApellidoM: null,
      // usuarioApellidoP: null,
      // imagePath: null,
      // usuarioClave: null,
      // usuarioEstatusSesion: null,
      // usuarioFechaLimite: null,
      // usuarioNombre: null,
      // usuarioNumConfirmacion: null,
      // usuarioToken: null
      }
      
    setTimeout(() => {
      // console.log(this.usuarioFiltro)
      this.dataApi.Post('/Usuarios/GetEmpleadosFiltro', this.usuarioFiltro).subscribe(
        (users) => {
          this.cambiarEstatusSpinner(false);
          if(users.length > 0){
            // this.users = users.sort((a, b) => {
            //   if (a.empleadoNoEmp > b.empleadoNoEmp) {
            //     return 1;
            //   }
            //   if (a.empleadoNoEmp < b.empleadoNoEmp) {
            //     return -1;
            //   }
            //   return 0;
            // });
            this.users = users.sort((a,b)=>a.empleadoNoEmp-b.empleadoNoEmp);
          // this.users = users;
        }else{
          this.toastr.error(
            'No se encontraron registros para esta búsqueda.',
            'Error',
            {
              timeOut: 3000,
            }
          );
        }
        },
        (error) => {
          console.error(error);
          this.cambiarEstatusSpinner(false);
          this.toastr.error(
            'Error en el servidor, contacte al administrador del sistema.',
            'Error',
            {
              timeOut: 3000,
            }
          );
        }
      );
    }, 2000);
   
  }

  onDeleteEmpleado(user: Usuario): void {
    this.cambiarEstatusSpinner(true);
    Swal.fire({
      title: '¿Quiere eliminar el registro?',
      confirmButtonText: `Continuar`,
      denyButtonText: `Cancelar`,
      showDenyButton: true,
      icon: 'question',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        user.usuarioEstatusSesion = true;
        this.dataApi.Put('/Usuarios', user.usuarioId, user);
        this.cambiarEstatusSpinner(false);
        setTimeout(() => {
          this.getListUsers();
        }, 500);
      } else if (result.isDenied) {
        Swal.fire('Carga de información cancelada', '', 'error');
        this.cambiarEstatusSpinner(false);
      }
    });
  }

  onPreUpdateEmpleado(user: Usuario) {
    if (user == null) {
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    } else {
      if (user.imagePath == null) {
        user.imageFullPath = 'assets/user.png';
      } else {
        user.imageFullPath = environment.baseUrl + '/' + user.imagePath;
      }
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    }
  }
}
