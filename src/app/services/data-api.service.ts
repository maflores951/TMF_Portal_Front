import { Injectable } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Parametro } from '../models/parametro';
import { Rol } from '../models/rol';
import { ConfiguracionSua } from '../models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from '../models/Sua/configuracionSuaNivel';
import { ToastrService } from 'ngx-toastr';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
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
  public model: any;
  private token: Observable<any>;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public HacerToken(username: string, password: string) {

  }




  public GetList(controller: string,): Observable<any> {
    this.url = this.urlBase + this.servicePrefix + controller;
    return this.http.get<any>(this.url, httpOption);
  }

  public GetListId(controller: string, id: number): Observable<any> {
    this.url = this.urlBase + this.servicePrefix + controller;


    return this.http.get<Response>(this.url + '/' + id.toString());
  }

  public Post(controller: string, model: any): any {
    this.url = this.urlBase + this.servicePrefix + controller;

    return this.http.post<any>(this.url, model, httpOption);

  }

 
  public Put(controller: string, id: number, model: any) {
    this.url = this.urlBase + this.servicePrefix + controller;

    this.http.put<any>(this.url + '/' + id.toString(), model, httpOption)
      .subscribe(result => {
      }, error => {
        console.error(JSON.stringify(error));
        this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
          timeOut: 3000
        });
      });
  }

  public SetPassword(controller: string, id: number, model: any): any {
    this.url = this.urlBase + this.servicePrefix + controller;
    this.http.put<any>(this.url + '/' + id.toString(), model, httpOption);
  }

  public Delete(controller: string, id: number) {
    this.url = this.urlBase + this.servicePrefix + controller;
    this.http.delete<Response>(this.url + '/' + id.toString(), httpOption)
      .subscribe(result => {
        console.log(result);
      }, error => {
        this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
          timeOut: 3000
        });
      });
  }

  public EnviarEmail(email: string): Observable<any> {
    this.controller = '/User/EnviarEmail';
    this.url = this.urlBase + this.servicePrefix + this.controller;

    let model: any;

    model = {
      Email: email
    }
    return this.http.post<any>(this.url, model, httpOption);
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

  validarEspera(modal: ConfiguracionSuaNivel[]) {
    this.cargarModalConfSubject.next(modal);
  }

  public SelectedconfiguracionSua: ConfiguracionSua = {
    configuracionSuaId: null
  };
}
