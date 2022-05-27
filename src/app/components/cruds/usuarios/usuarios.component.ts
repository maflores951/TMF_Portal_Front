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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public static updateUsers: Subject<boolean> = new Subject();

  public p: number = 1;
  
  constructor(
    private dataApi: DataApiService,
    private apiAuthService: AuthUserService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    UsuariosComponent.updateUsers.subscribe((res) => {
      setTimeout(() => {
        this.getListUsers();
      }, 100);
    });
  }

  public usuarioId = '';
  public email = '';
  public usuarioApellidoP = '';
  public usuarioApellidoM = '';
  public usuario: Usuario;
  public users: Observable<Usuario[]>;
  public isAdmin: any = null;
  public userUid: number = null;

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.getListUsers();
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

  getListUsers() {
    this.dataApi.GetList('/Usuarios').subscribe(
      (users) => {
        this.cambiarEstatusSpinner(false);
        this.users = users;
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

  onDeleteUser(user: Usuario): void {
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

  onPreUpdateUser(user: Usuario) {
    console.log(JSON.stringify(user));
    if (user == null) {
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    } else {
      if (user.imagePath == null) {
        user.imageFullPath = 'assets/user.png';
      } else { user.imageFullPath = environment.baseUrl + '/' + user.imagePath;
      }
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    }
  }
}
