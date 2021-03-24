import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService ) {
    setTimeout(() => {
      NavbarComponent.updateUserStatus.subscribe(res => {
        
        this.getCurrentUser();
      });
  }, 100)
  }

  public usuario: Usuario;
  public app_name: string = "Fintech";
  public isLogged: boolean = false;
   public isAdmin: boolean = false;
  private UserTypeId: number;
  public email: string;
  public foto: string;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    if (!this.usuario) {
      this.isLogged = false;
    } else {
      this.UserTypeId = this.usuario.rolId;

      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
      //  console.log('Entrar imagen 99 ' + this.usuario.imagePath.substr(1));
      if (this.UserTypeId == 1) {
        this.isAdmin = true;
      }
      this.isLogged = true;
      this.email = this.usuario.email;

      if (this.foto == null){
        this.foto = "assets/user.png"//"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
      } else{
        // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath;
        this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"

      }
    }
}

  onLogout() {
    this.apiAuthService.logout();
  }

}