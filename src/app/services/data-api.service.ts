import { Injectable } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse';
import { Usuario } from '../models/usuario';
import { Parametro } from '../models/parametro';
import { Rol } from '../models/rol';
import { ConfiguracionSua } from '../models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from '../models/Sua/configuracionSuaNivel';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  public result: TokenResponse;

  //Url para recuperar el token de seguridad del sistema publicado en el IIS.(Se utiliza un proxi para evitar los Cors.)
  public urlBaseToken = 'http://cors-anywhere.herokuapp.com/http://legvit.ddns.me/Fintech_Api/Token';

  //Url para publicar el sistema Fintech.Front en donde ya no se necesita el proxi ya que estan alojada en el mismo IIS.
  //public urlBaseToken = 'http://legvit.ddns.me/Fintech_Api/Token';

  //URL base para conectar todas las API´s al IIS.
  public urlBase = 'https://localhost:44319';

  //URL base para conectar todas las API´s a Azure.
  //public urlBase = 'https://fintechapi20200807223126.azurewebsites.net';
  //public urlBaseToken = 'https://fintechapi20200807223126.azurewebsites.net/Token';

  //URL base para conectar todass las apis al sistema Fintech.API de desarrollo
  //public urlBase = 'https://localhost:44340';
  //public urlBaseToken = 'https://localhost:44340/Token';


  public servicePrefix = '/api';
  public controller: string;
  public url: string;
  // public response: Respuesta;
  public model: any;
  private tokenResponse: TokenResponse;
  private token: Observable<any>;
  // public fotoResponse: fotoResponse;

  constructor(private http: HttpClient) { }

  public HacerToken(username: string, password: string) {

  }

  // public ChangePassword(tokenType: string, accessToken: string, changePasswordRequest: ChangePasswordRequest): Observable<Response> {
  //   this.controller = '/Users/ChangePassword';
  //   this.url = this.urlBase + this.servicePrefix + this.controller;

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + accessToken
  //     })
  //   }
  //   return this.http.post<Response>(this.url, changePasswordRequest, httpOptions);
  // }

  // public SetPassword(recoverPasswordRequest: RecoverPasswordRequest): any {
  //   this.controller = '/Users/SetPassword';
  //   this.url = this.urlBase + this.servicePrefix + this.controller;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   }
  //   console.log(JSON.stringify(recoverPasswordRequest) + ' *** JSON');

  //   return this.http.post(this.url, recoverPasswordRequest, httpOptions);
  // }

  // public Get(controller: string, tokenType: string, accessToken: string, id: number) {
  //   this.url = this.urlBase + this.servicePrefix + controller;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + accessToken
  //     })
  //   }

  //   return this.http.get<any>(this.url + '/' + id.toString(), httpOptions)
  //     .pipe(map((res: any) => res)
  //     )

  // }


  public GetList(controller: string, ): Observable<any> {
    this.url = this.urlBase + this.servicePrefix + controller;
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }


    return this.http.get<any>(this.url, httpOptions);
  }

  public GetListId(controller: string, id: number): Observable<any> {
    this.url = this.urlBase + this.servicePrefix + controller;


    return this.http.get<Response>(this.url + '/' + id.toString());
  }

  public Post(controller: string, model: any): any {
    this.url = this.urlBase + this.servicePrefix + controller;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
      // console.log(JSON.stringify(model));
    return this.http.post<any>(this.url, model, httpOptions);

  }

  // postImage(id: number, imagen: File): any {
  //   this.url = this.urlBase + this.servicePrefix + '/Users/image';
  //   let file = imagen;
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   var image: any;

  //   reader.onload = () => {
  //     image = reader.result;
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   }

  //   setTimeout(() => {

  //     var buscaComa: number = image.indexOf(",") + 1;

  //     this.fotoResponse = {
  //       UserId: id,
  //       Image: image.substr(buscaComa)
  //     }



  //     this.http.post(this.url, this.fotoResponse, httpOptions)
  //       .subscribe(resp => {
  //         console.log(resp);
  //       });
  //   }, 400)

  // }

  // public GetUserByEmail(tokenType: string, accessToken: string, email: string): Observable<User> {
  //   this.controller = '/Users/GetUserByEmail';
  //   this.url = this.urlBase + this.servicePrefix + this.controller;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + accessToken
  //     })
  //   }
  //   console.log(tokenType + ' ... ' + email);
  //   let model: UserRequest;

  //   model = {
  //     Email: email
  //   }


  //   return this.http.post<User>(this.url, model, httpOptions);

  // }

  // public PutToken(controller: string, tokenType: string, accessToken: string, id: number, model: any) {
  //   this.url = this.urlBase + this.servicePrefix + controller;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + accessToken
  //     })
  //   }
  //   console.log('Entra API ******');


  //   this.http.put<Response>(this.url + '/' + id.toString(), model, httpOptions)
  //     .subscribe(result => {

  //       return result;
  //     }, error => console.error(JSON.stringify(error)));
  // }

  public Put(controller: string, id: number, model: any) {
    this.url = this.urlBase + this.servicePrefix + controller;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }



    this.http.put<any>(this.url + '/' + id.toString(), model, httpOptions)
      .subscribe(result => {
        console.log(result);
      }, error => console.error(JSON.stringify(error)));
  }

  public SetPassword(controller: string, id: number, model: any): any {
    this.url = this.urlBase + this.servicePrefix + controller;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }



    this.http.put<any>(this.url + '/' + id.toString(), model, httpOptions);
      // .subscribe(result => {
      //   console.log(result);
      // }, error => console.error(JSON.stringify(error)));
  }

  // public DeleteToken(controller: string, tokenType: string, accessToken: string, id: number): Observable<Response> {
  //   this.url = this.urlBase + this.servicePrefix + controller;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + accessToken
  //     })
  //   }



  //   return this.http.delete<Response>(this.url + '/' + id.toString(), httpOptions);

  // }

  public Delete(controller: string, id: number) {
    this.url = this.urlBase + this.servicePrefix + controller;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }



    this.http.delete<Response>(this.url + '/' + id.toString(), httpOptions)
      .subscribe(result => {
        console.log(result);
      }, error => console.error(error + "Error Api"));
  }

  public EnviarEmail(email: string): Observable<any> {
    this.controller = '/User/EnviarEmail';
    this.url = this.urlBase + this.servicePrefix + this.controller;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let model: any;

    model = {
      Email: email
    }
    return this.http.post<any>(this.url, model, httpOptions);
  }

  public SelectedUsuario: Usuario = {
    usuarioId: null
  };

  public SelectedParametro: Parametro = {
    parametroId: null
  };

  public SelectedRol: Rol = {
    rolId: null
  };

  private cargarModalConfSubject = new Subject<ConfiguracionSuaNivel[]>();
  cargarModalConfObservable = this.cargarModalConfSubject.asObservable();

  validarEspera(modal : ConfiguracionSuaNivel[]){
    // this.IsWait = estatus;
    this.cargarModalConfSubject.next(modal);
  }

  public SelectedconfiguracionSua: ConfiguracionSua = {
    configuracionSuaId: null
  };
}
