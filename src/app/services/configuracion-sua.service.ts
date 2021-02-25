import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  url: string = "https://localhost:44319/api/Sua";

  constructor(private _http:
    HttpClient) { }

    add(configuracionSua: ConfiguracionSua): Observable<Response>{
      return this._http.post<Response>(this.url, configuracionSua, httpOption)
    }

}
