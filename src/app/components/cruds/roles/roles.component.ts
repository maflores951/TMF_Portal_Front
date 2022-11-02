import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  public static updateUserType: Subject<boolean> = new Subject();

  constructor(
    private dataApi: DataApiService,
    private apiAuthService: AuthUserService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    RolesComponent.updateUserType.subscribe((res) => {
      setTimeout(() => {
        this.getListUserType();
      }, 300);
    });
  }

  public rolNombre = '';
  public usuario: Usuario;
  public userTypes: Observable<Rol[]>;
  public isAdmin: any = null;
  public userUid: number = null;

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.getListUserType();
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

  getListUserType() {
    this.dataApi.GetList('/Roles').subscribe(
      (userTypes) => {
        this.userTypes = userTypes;
        this.cambiarEstatusSpinner(false);
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

  onDeleteUserType(userType: Rol): void {
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
        userType.rolEstatus = true;
        this.dataApi.Put('/Roles', userType.rolId, userType);
        this.cambiarEstatusSpinner(false);
        setTimeout(() => {
          this.getListUserType();
        }, 500);
      } else if (result.isDenied) {
        Swal.fire('Carga de información cancelada', '', 'error');
        this.cambiarEstatusSpinner(false);
      }
    });
  }

  onPreUpdateUserType(userType: Rol) {
    this.dataApi.SelectedRol = Object.assign({}, userType);
  }
}
