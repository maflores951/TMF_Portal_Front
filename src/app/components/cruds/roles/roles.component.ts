import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
// import { SpinnerService } from 'angular-spinners';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public static updateUserType: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService) {
    RolesComponent.updateUserType.subscribe(res => {
      setTimeout(() => {
        this.getListUserType();
      }, 300)
    })
  }

  public rolNombre = '';
  public usuario: Usuario;
  public userTypes: Observable<Rol[]>;
  public isAdmin: any = null;
  public userUid: number = null;
  // public tokenResponse: TokenResponse;

  ngOnInit() {
    // this.spinnerService.showAll();
    this.cambiarEstatusSpinner(true);
    this.getListUserType();
    this.getCurrentUser();
    // this.spinnerService.hideAll();
    
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    // console.log(this.tokenResponse);
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
    this.dataApi.GetList('/Roles').subscribe(userTypes => {
      this.userTypes = userTypes;
      this.cambiarEstatusSpinner(false);
    }, error => console.error(error));
  }

  onDeleteUserType(userType: Rol): void {
    const confirmacion = confirm('¿Quiere eliminar el registro?');
    if (confirmacion) {
      userType.rolEstatus = true;
      this.dataApi.Put('/Roles', userType.rolId, userType)

      setTimeout(() => {
        this.getListUserType();
      }, 500);

    }
  }

  onPreUpdateUserType(userType: Rol) {
    this.dataApi.SelectedRol = Object.assign({}, userType);
    //  this.dataApiBanco.selectedBanco = Object.assign({}, banco);
    //  //console.log('BOOK update', book)
  }

 }