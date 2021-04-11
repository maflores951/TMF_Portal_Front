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

  validarTimer(estatus : boolean){
    this.IsWait = estatus;
    this.timerSubject.next(estatus);

    //  // sets an idle timeout of 5 seconds, for testing purposes.
    //  this.idle.setIdle(5);
    //  // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    //  this.idle.setTimeout(10);
    //  // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //  this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
    // //  idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    // this.idle.onTimeout.subscribe(() => {
    //    this.idleState = 'Timed out!';
    //    this.timedOut = true;
    //  });
    // //  idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    //  this.idle.onTimeoutWarning.subscribe((countdown) => {
    //    this.idleState = 'You will time out in ' + countdown + ' seconds!';
    //    this.apiAuthService.logout();
    //   });
 
    //  // sets the ping interval to 15 seconds
    //  this.keepalive.interval(15);
 
    //  this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
    //  setTimeout(() => {
    //   this.reset();
    //  }, 5000);
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
