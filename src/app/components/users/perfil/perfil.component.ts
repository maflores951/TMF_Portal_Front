import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public static updateUsers: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService) {
    PerfilComponent.updateUsers.subscribe((res) => {
      setTimeout(() => {
        this.getCurrentUser();
      }, 300);
    });
  }

  public user: Usuario;
  public email: string;
  public isAdmin: any = null;
  public userUid: number = null;
  public imageSrc: string;

  public providerId: string = 'null';

  ngOnInit() {
    this.getCurrentUser();
  }

  RecuperaUsuario(TokenType: string, AccessToken: string, email: string) {}

  onPreUpdateUsuario() {}

  getCurrentUser() {}
}
