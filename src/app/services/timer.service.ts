import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

private  idle : Idle;
private  keepalive : Keepalive;

  constructor(private idleC: Idle, private keepaliveC: Keepalive, private apiAuthService: AuthUserService) { }

  public IsWait : boolean;
  private timerSubject = new Subject<boolean>();
  timerObservable = this.timerSubject.asObservable();

  private tiempoSubject = new Subject<number>();
  tiempoObservable = this.tiempoSubject.asObservable();

  validarTimer(estatus : boolean){
    this.IsWait = estatus;
    this.timerSubject.next(estatus);
  }

  asignarTiempo(tiempo : number){
    // console.log("Services " + tiempo);
    this.tiempoSubject.next(tiempo);
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
