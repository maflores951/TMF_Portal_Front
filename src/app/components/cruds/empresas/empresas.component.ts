import { Empresa } from './../../../models/empresa';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  public static updateEmpresas: Subject<boolean> = new Subject();

  constructor(
    private dataApi: DataApiService,
    private apiAuthService: AuthUserService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    EmpresasComponent.updateEmpresas.subscribe((res) => {
      setTimeout(() => {
        this.getListEmpresas();
      }, 100);
    });
  }

  public empresaId = '';
  public empresaNombre = '';
  public usuario: Usuario;
  public empresas: Observable<Empresa[]>;
  public isAdmin: any = null;
  public userUid: number = null;

  ngOnInit() {
    this.getListEmpresas();
    this.getCurrentUser();
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

  getListEmpresas() {
    this.dataApi.GetList('/Empresas').subscribe(
      (empresas) => {
        this.cambiarEstatusSpinner(false);
        this.empresas = empresas;
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
  }

  onDeleteEmpresa(empresa: Empresa): void {
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
        empresa.empresaEstatus = true;
        this.dataApi.PutSub('/Empresas', empresa.empresaId, empresa).subscribe(
          (emp) => {
            this.cambiarEstatusSpinner(false);
            if (emp.empresaEstatus == true){
              this.toastr.success(
                'La eliminación se realizó con éxito.',
                'Error',
                {
                  timeOut: 3000,
                }
              );
              setTimeout(() => {
                this.getListEmpresas();
              }, 500);
            }else{
              this.toastr.error(
                'No se puede eliminar la empresa porque cuenta con usuarios activos registrados.',
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
      } else if (result.isDenied) {
        Swal.fire('Eliminación cancelada', '', 'error');
        this.cambiarEstatusSpinner(false);
      }
    });
  }

  onPreUpdateEmpresa(empresa: Empresa) {
    // console.log(JSON.stringify(empresa));
    if (empresa == null) {
      this.dataApi.SelectedEmpresa = Object.assign({}, empresa);
    } else {
      if (empresa.empresaLogo == null) {
        empresa.empresaLogoFullPath = 'assets/user.png';
      } else {
        empresa.empresaLogoFullPath =
          environment.baseUrl + '/' + empresa.empresaLogo;
      }
      this.dataApi.SelectedEmpresa = Object.assign({}, empresa);
    }
  }
}
