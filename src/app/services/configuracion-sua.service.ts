import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { ConfiguracionSua } from '../models/Sua/configuracionSua';

const httpOption ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionSuaService {

  public urlBase = environment.baseUrl;
  public servicePrefix = environment.servicePrefix;
  public controller = "/api/Sua";
  
  public url = this.urlBase + this.servicePrefix + this.controller;

  constructor(private _http:
    HttpClient) { }

    add(configuracionSua: ConfiguracionSua): Observable<Response>{
      return this._http.post<Response>(this.url, configuracionSua, httpOption)
    }

}
