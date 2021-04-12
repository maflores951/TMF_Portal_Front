import { Injectable } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Parametro } from '../models/parametro';
import { Rol } from '../models/rol';
import { ConfiguracionSua } from '../models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from '../models/Sua/configuracionSuaNivel';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TipoPeriodo } from '../models/TipoPeriodo';
import { ExcelTipo } from '../models/Excel/ExcelTipo';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  public urlBase = environment.baseUrl;
  public servicePrefix = environment.servicePrefix;
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


    return this.http.get<Response>(this.url + '/' + id.toString(), httpOption);
  }

  public Post(controller: string, model: any): any {
    this.url = this.urlBase + this.servicePrefix + controller;
    return this.http.post<any>(this.url, model, httpOption);
  }

  public RecuperaParametro(controller: string): any {
    this.url = this.urlBase + this.servicePrefix + controller;
    return this.http.post<any>(this.url, httpOption);
  }

 
  public Put(controller: string, id: number, model: any) {
    this.url = this.urlBase + this.servicePrefix + controller;

    this.http.put<any>(this.url + '/' + id.toString(), model, httpOption)
      .subscribe(result => {
        this.toastr.success('Actualización exitosa.', 'Exito', {
          timeOut: 3000
        });
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
        // console.log(result);
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

  private cargarTipoExcelConfSubject = new Subject<ExcelTipo[]>();
  cargarTipoExcelConfObservable = this.cargarTipoExcelConfSubject.asObservable();

  cargarTipoExcel(modal: ExcelTipo[]) {
    this.cargarTipoExcelConfSubject.next(modal);
  }

  private cargarTipoPeriodoConfSubject = new Subject<TipoPeriodo[]>();
  cargarTipoPeriodoConfObservable = this.cargarTipoPeriodoConfSubject.asObservable();

  cargarTipoPeriodo(modal: TipoPeriodo[]) {
    this.cargarTipoPeriodoConfSubject.next(modal);
  }

  public SelectedconfiguracionSua: ConfiguracionSua = {
    configuracionSuaId: null
  };
}
