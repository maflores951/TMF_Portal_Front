import { Component, OnInit } from '@angular/core';
// import { SpinnerService } from 'angular-spinners';
import { Subject, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public static updateUsers: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService) {
    UsuariosComponent.updateUsers.subscribe(res => {
      setTimeout(() => {
        this.getListUsers();
      }, 100)
    })
  }

  public usuarioId = '';
  public email = '';
  public usuarioApellidoP = '';
  public usuarioApellidoM = '';
  // public filterUsuario = {age: this.filterUsuarioId, sex: this.filterEmail};
  public usuario: Usuario;
  public users: Observable<Usuario[]>;
  public isAdmin: any = null;
  public userUid: number = null;
  // public tokenResponse: TokenResponse;

  ngOnInit() {
    // this.spinnerService.showAll();
    this.cambiarEstatusSpinner(true);
    this.getListUsers();
    this.getCurrentUser();
    this.cambiarEstatusSpinner(false);
    // this.spinnerService.hideAll();
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }
  
  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    // //console.log(this.tokenResponse);
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
    this.dataApi.GetList('/Usuarios').subscribe(users => {
      this.users = users;
      // console.log(JSON.stringify(users));
    }, error => console.error(error));
  }

  onDeleteUser(user: Usuario): void {
    const confirmacion = confirm('¿Quiere eliminar el registro?');
    if (confirmacion) {
      user.usuarioEstatusSesion = true;
      console.log(JSON.stringify(user));
      this.dataApi.Put('/Usuarios', user.usuarioId, user)

      setTimeout(() => {
        this.getListUsers();
      }, 500);

    }
  }

  onPreUpdateUser(user: Usuario) {
    //  console.log(user.imageFullPath + ' ***');
    if (user.imageFullPath == null){
      user.imageFullPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
    } else{
      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath;
      user.imageFullPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
    }
    this.dataApi.SelectedUsuario = Object.assign({}, user);
  }

}

