import { Component, OnInit } from '@angular/core';
import { interval, Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { TimerService } from 'src/app/services/timer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService, private apiAuthService: AuthUserService, private timer: TimerService) {
    setTimeout(() => {
      NavbarComponent.updateUserStatus.subscribe(res => {

        this.getCurrentUser();
      });
    }, 100)
  }

  public usuario: Usuario;
  public app_name: string = "Fintech";
  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;
  public email: string;
  public foto: string;
  public tiempo = 0;
  public   inscribir: any;

  _second = 1000;
  _minute = this._second * 60;
   _hour = this._minute * 60;
  // _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  public inicioTiempo = 600000;

  public repeticiones = 600;
  
  public clock: any;

  ngOnInit() {
    this.getCurrentUser();

   

    this.timer.timerObservable.subscribe(timer => {
      if (timer == true) {
        // if (this.clock.subscribe){
          this.clock.unsubscribe();
        // }
       
    this.iniciarTimer()
      }else{
        this.clock.unsubscribe();
        // this.terminar();
      }
    });
  }

  iniciarTimer(){
    // console.log("Entra");

    const numbers = interval(1000);
 
const source = numbers.pipe(take(this.repeticiones));

    // const source = interval(10000);
    // this.end = new Date();
    this.clock = source.subscribe(t => {
      // this.now = new Date().setMinutes(50);
    
      //  console.log("Entra " + t + " *****");
     
      this.showDate(t);
    });

  }

  showDate(t){
    let distance = this.inicioTiempo - t*1000//this.end - this.now;
      // console.log(distance + " &&&&&");
    // this.day = Math.floor(distance / this._day);
    // this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }

  // onComenzar() {
  //   this.clock.unsubscribe();
  //   // this.repeticiones = 0;
  //    this.iniciarTimer();
  //   //  this.repeticiones = 600;
  //   // const source = timer(0, 1000);
  //   // this.inscribir = source.subscribe(val => this.tiempo = val);
  // }

  // onDetener() {
  //   this.clock.unsubscribe();
  // }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    if (!this.usuario) {
      this.isLogged = false;
    } else {
      this.iniciarTimer();
      this.UserTypeId = this.usuario.rolId;

      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
      //  console.log('Entrar imagen 99 ' + this.usuario.imagePath.substr(1));
      if (this.UserTypeId == 1) {
        this.isAdmin = true;
      } else if (this.UserTypeId == 2) {
        this.isLocal = true
      } else if (this.UserTypeId == 3) {
        this.isIT = true
      } else if (this.UserTypeId == 4) {
        this.isSuper = true
      }

      this.isLogged = true;
      this.email = this.usuario.email;

      // console.log(this.usuario.imagePath + " ***** NAVBAR" );
      if (this.usuario.imagePath == null) {
        this.foto = "assets/user.png"//"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
      } else {
        this.foto = environment.baseUrl + "/" + this.usuario.imagePath;
        // this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"

      }
    }
  }

  onLogout() {
     this.clock.unsubscribe();
     this.timer.validarTimer(false);
    this.apiAuthService.logout();
    
  }

}