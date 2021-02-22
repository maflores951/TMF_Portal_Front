import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  public IsWait : boolean;
  private validarEsperaSubject = new Subject<boolean>();
  validarEsperaObservable = this.validarEsperaSubject.asObservable();

  validarEspera(estatus : boolean){
    this.IsWait = estatus;
    this.validarEsperaSubject.next(estatus);
  }
}
