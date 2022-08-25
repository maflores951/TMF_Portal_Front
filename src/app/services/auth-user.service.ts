import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public urlBase = environment.baseUrl;
  public servicePrefix = environment.servicePrefix;
  public controller = '/User/login';
  // url: string = "https://localhost:44319/api/User/login";

  public url = this.urlBase + this.servicePrefix + this.controller;
  private usuarioSubject: BehaviorSubject<Usuario>;

  public get usuarioData(): Usuario {
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(
      JSON.parse(sessionStorage.getItem('Usuario'))
    );
  }

  login(email: string, password: string): Observable<Response> {
    // console.log(this.url + " *****");
    return this.http
      .post<Response>(this.url, { email, password }, httpOption)
      .pipe(
        map((res) => {
          // console.log("Entra");
          if (res.exito === 1) {
            const usuario: Usuario = res.data;
            sessionStorage.setItem('Usuario', JSON.stringify(usuario));
            //  console.log(JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
          }
          return res;
        })
      );
  }

  loginSaml(usuario: Usuario) {
    // console.log(this.url + " *****");
    // return this.http
    //   .post<Response>(this.url, { email, password }, httpOption)
    //   .pipe(
    //     map((res) => {
    //       // console.log("Entra");
    //       if (res.exito === 1) {
    //         const usuario: Usuario = res.data;
            sessionStorage.setItem('Usuario', JSON.stringify(usuario));
            //  console.log(JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
      //     }
      //     return res;
      //   })
      // );
  }

  logout() {
    sessionStorage.removeItem('Usuario');
    this.usuarioSubject.next(null);
    NavbarComponent.updateUserStatus.next(true);
    // this.router.navigate(['']);
    this.router.navigate(['/user/login']);
  }

  actualizarLogin(usuario) {
    // console.log(JSON.stringify(usuario) + " AUTH *****");
    sessionStorage.setItem('Usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
    NavbarComponent.updateUserStatus.next(true);
  }
}
