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
        // console.log('Entra nav ');
      });
  }, 100)
  }

  public usuario: Usuario;
  public app_name: string = "Fintech";
  public isLogged: boolean = false;
   public isAdmin: boolean = false;
  private UserTypeId: number;
  // public tokenResponse: TokenResponse;
  public email: string;
  public foto: string;

  ngOnInit() {
    // this.isAdmin = true;
    this.getCurrentUser();
  }

  // RecuperaUsuario(TokenType: string, AccessToken: string, email: string) {
  //   // this.dataApi.GetUserByEmail(TokenType, AccessToken, email).subscribe(result => {
  //     //this.user = result;
  //     //this.dataApi.SelectedUser = Object.assign({}, result);
  //     this.UserTypeId = this.usuario.rolId;

  //     this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
  //     // console.log('Entrar imagen 99 ' + this.usuario.ImagePath.substr(1));
  //     if (this.UserTypeId == 1) {
  //       this.isAdmin = true;
  //     }
  //     this.isAdmin = true;
  //     // sessionStorage.setItem('UserTypeId', result.UserTypeId.toString());
  //     // sessionStorage.setItem('UserId', result.UserId.toString());
  //     // sessionStorage.setItem('Token', JSON.stringify(this.tokenResponse));
  //     //   sessionStorage.setItem('email', this.email);

  //   // }, error => console.error(error.error.error_description));
  // }


  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    //  console.log(JSON.stringify(this.usuario));
    // console.log(this.usuario.usuarioId + ' ####');
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    //console.log(this.tokenResponse);
    if (!this.usuario) {
      // console.log('NOT user loggd');
      this.isLogged = false;
    } else {
      //console.log('user loggd');
      this.UserTypeId = this.usuario.rolId;

      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
      //  console.log('Entrar imagen 99 ' + this.usuario.imagePath.substr(1));
      if (this.UserTypeId == 1) {
        this.isAdmin = true;
      }
      this.isAdmin = true;
      this.isLogged = true;
      //this.userUid = sessionStorage.getItem('email');
      // this.email = sessionStorage.getItem('email');
      this.email = this.usuario.email;

      if (this.foto == null){
        this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
      } else{
        // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath;
        this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"

      }
      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
      // this.foto = 'file:///C:/Users/Fintech/source/repos/Login/uploads/b290892e-1560-44cd-8793-06afdbc135a8.jpg';//'file:///C:/Users/Fintech/source/repos/Login/' + this.usuario.imagePath;
      // this.foto = './' + this.usuario.imagePath;
      // this.RecuperaUsuario(this.tokenResponse.TokenType, this.tokenResponse.AccessToken, this.email)
        
    }
 }

  onLogout() {
    // sessionStorage.clear();
    this.apiAuthService.logout();
  }

}