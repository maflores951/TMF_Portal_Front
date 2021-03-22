import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';

const httpOption ={
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
    })
};

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

    url: string = "https://localhost:44319/api/User/login";

    private usuarioSubject: BehaviorSubject<Usuario>;

    public get usuarioData(): Usuario{

        return this.usuarioSubject.value;

    }

    constructor(private http: HttpClient){
      this.usuarioSubject =
      new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('Usuario')));
    }

    login(email: string, password: string): Observable<Response>{
        return this.http.post<Response>(this.url, {email, password}, httpOption).pipe(
          map(res =>{
              console.log("Entra");
              if (res.exito === 1){
                const usuario: Usuario = res.data;
                sessionStorage.setItem("Usuario", JSON.stringify(usuario));
                this.usuarioSubject.next(usuario);
              }
              return res;
          })
        );
    }

    logout(){
      sessionStorage.removeItem('Usuario');
      this.usuarioSubject.next(null);
      NavbarComponent.updateUserStatus.next(true);
    }
}

