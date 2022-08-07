import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  public usuario: Usuario;
  public userTypeId: number;
  public isLogged = false;

  constructor(private apiAuthService: AuthUserService) {}
  public respuesta: Response;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    
      // this.fechaPass = this.usuario.usuarioFechaLimite - new Date()
      if(this.usuario){
        this.userTypeId = this.usuario.rolId;
        this.isLogged = true;
      }
       
  }
}



