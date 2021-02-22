import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { DataApiService } from 'src/app/services/data-api.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public static updateUsers: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService) {
    PerfilComponent.updateUsers.subscribe(res => {
      setTimeout(() => {
        this.getCurrentUser();
      }, 300)
    })
  }

  // public usuarios: UserInterface [] = [];
  public user: Usuario;
  public email: string;
  public isAdmin: any = null;
  public userUid: number = null;
  // public tokenResponse: TokenResponse;
  public imageSrc: string;

  public providerId: string = 'null';

  ngOnInit() {
    this.getCurrentUser();
  }

  RecuperaUsuario(TokenType: string, AccessToken: string, email: string) {
    // this.dataApi.GetUserByEmail(TokenType, AccessToken, email).subscribe(result => {
    //   this.user = result;
    //   this.user.ImageFullPath = 'http://legvit.ddns.me/Fintech_Api/' + result.ImagePath.substr(1);
    // }, error => console.error(error.error.error_description));
  }

  onPreUpdateUsuario() {
    // this.dataApi.SelectedUser = Object.assign({}, this.user);

  }

  getCurrentUser() {
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    // if (this.tokenResponse.AccessToken.length > 0) {
    //   this.userUid = parseInt(sessionStorage.getItem('UserId'));
    //   this.RecuperaUsuario(this.tokenResponse.TokenType, this.tokenResponse.AccessToken, this.email)
    //   if (parseInt(sessionStorage.getItem('UserTypeId')) == 1) {
    //     this.isAdmin = true;
    //   } else {
    //     this.isAdmin = false;
    //   }
    // }

  }

}
