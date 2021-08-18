import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Usuario } from './models/usuario';
import { AuthUserService } from './services/auth-user.service';
import { SpinnerService } from './services/spinner.service';
import { TimerService } from './services/timer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'TMF Group';
  public usuario: Usuario;
  public idleState = 'Not started.';
  public timedOut = false;
  public lastPing?: Date = null;
  public isLogged: boolean = false;

  public tiempo = 600;

  constructor(private spinner: SpinnerService, private router: Router, private idle: Idle, private keepalive: Keepalive, private timer: TimerService, private apiAuthService: AuthUserService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(this.tiempo);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onInterrupt.subscribe(() =>{
      if (this.isLogged == true){
        // console.log("login ");
        this.timer.validarTimer(true);
      }else{
        this.timer.validarTimer(false);
        // console.log("No login ");
      }
     
    });

    //  idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.apiAuthService.logout();
    });
    //  idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
     
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
     
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
      
    });

    

    //  setTimeout(() => {
    //   this.reset();
    //  }, 5000);

  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  terminar() {
    this.idle.stop();
    this.idleState = 'Stop.';
    this.timedOut = true;
  }

  public IsWait: boolean;
  ngOnInit() {
    this.spinner.validarEsperaObservable.subscribe(response => {
      this.IsWait = response;
    });

    this.timer.timerObservable.subscribe(timer => {
      if (timer == true) {
        this.isLogged = true;
        this.reset();
      }else{
        this.terminar();
        this.isLogged = false;
      }
    });

    this.timer.tiempoObservable.subscribe(tiempo => {
      // this.tiempo = 1;
      // console.log("Entra app " + tiempo);
      this.tiempo = tiempo*60;
      // console.log("Entra app v " + this.tiempo);
      this.idle.setTimeout(tiempo*60);
     
    });
  
  }

}
