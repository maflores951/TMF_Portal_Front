import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public static updateUsers: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService, private toastr: ToastrService) {
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
  public usuario: Usuario;
  public users: Observable<Usuario[]>;
  public isAdmin: any = null;
  public userUid: number = null;

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.getListUsers();
    this.getCurrentUser();
  }

  cambiarEstatusSpinner(estatus : boolean){
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
    this.cambiarEstatusSpinner(false);
  }

  getListUsers() {
    this.dataApi.GetList('/Usuarios').subscribe(users => {
      this.users = users;
    }, error => {
      console.error(error);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
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
    if (user == null){
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    }else{
     
      if (user.imagePath == null){
        user.imageFullPath = "assets/user.png"
      } else{
        // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath;
        //  user.imageFullPath = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
       
        user.imageFullPath = environment.baseUrl + "/" + user.imagePath;
        // console.log(user.imageFullPath + " ***** Crud usuario");
      }
      this.dataApi.SelectedUsuario = Object.assign({}, user);
    }
  }
}

