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
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public inicioTiempo: number;

  public repeticiones: number;

  public inicio: number;

  public repe: number;

  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(
    private dataApi: DataApiService,
    private apiAuthService: AuthUserService,
    private timer: TimerService
  ) {
    setTimeout(() => {
      NavbarComponent.updateUserStatus.subscribe((res) => {
        this.getCurrentUser();
      });
    }, 100);
  }

  public usuario: Usuario;
  public app_name: string = 'Fintech';
  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;
  public email: string;
  public foto: string;
  public tiempo = 0;
  public inscribir: any;

  public fechaPass: any;
  public fechaMensaje: string;
  public fechaBandera: boolean;

  //Variables para configurar la empresa
  public fotoEmpresa: string;
  public color: string;

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

  public clock: any;

  ngOnInit() {
    this.getCurrentUser();

    ////Se comenta, pero es el timer que ve el usuario
    // this.timer.timerObservable.subscribe(timer => {
    //   if (timer == true) {
    //     // console.log("ENtra nav " + this.inicio);
    //     // if (this.inicio > 0) {

    //     this.clock.unsubscribe();
    //     this.iniciarTimer();
    //     // }

    //   } else {
    //     this.clock.unsubscribe();
    //     // this.terminar();
    //   }
    // });
  }

  iniciarTimer() {
    this.repeticiones = parseInt(sessionStorage.getItem('tiempoSesion')) * 60;
    if (this.repeticiones < 1) {
      this.repeticiones = 10 * 60;
    }
    this.inicioTiempo =
      parseInt(sessionStorage.getItem('tiempoSesion')) * 60000;
    if (this.repeticiones < 1) {
      this.repeticiones = 10 * 60000;
    }

    const numbers = interval(1000);

    const source = numbers.pipe(take(this.repeticiones));

    this.clock = source.subscribe((t) => {
      this.showDate(t);
    });
  }

  showDate(t) {
    let distance = this.inicioTiempo - t * 1000; //this.end - this.now;
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

  recuperaDias(f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    if (!this.usuario) {
      this.fotoEmpresa = 'assets/TMF_Logo.png';
      this.isLogged = false;
    } else {
      //  console.log( JSON.stringify(this.usuario) + ' ******')
      //Se utiliza para iniciar el timer
      // this.iniciarTimer();
      var today = new Date().toLocaleDateString();

      //  var day = new Date().getDay();
      //  var month = today.getMonth();
      //  var year = today.getFullYear();
      // console.log(day +"/"+month+"/"+year + " ***");
      var usuarioFecha = new Date(
        this.usuario.usuarioFechaLimite
      ).toLocaleDateString();
      //  console.log(usuarioFecha);

      this.fechaPass = this.recuperaDias(today, usuarioFecha);

      // console.log(this.fechaPass + " Dias****");
      if (this.fechaPass <= 10 && this.fechaPass >= 1) {
        if (this.fechaPass > 1) {
          this.fechaBandera = true;
          this.fechaMensaje =
            'Su contraseña expira en ' +
            this.fechaPass +
            ' días, solicite una nueva desde el Login de la aplicación.';
        } else {
          this.fechaBandera = true;
          this.fechaMensaje =
            'Su contraseña expira en ' +
            this.fechaPass +
            ' día, solicite una nueva desde el Login de la aplicación.';
        }
      } else {
        this.fechaBandera = false;
      }
      // this.fechaPass = this.usuario.usuarioFechaLimite - new Date()
      this.UserTypeId = this.usuario.rolId;

      // this.foto = 'http://legvit.ddns.me/Fintech_Api/' + this.usuario.imagePath.substr(1);
      //  console.log('Entrar imagen 99 ' + this.usuario.imagePath.substr(1));
      if (this.UserTypeId == 1) {
        this.isAdmin = true;
      } else if (this.UserTypeId == 2) {
        this.isLocal = true;
      } else if (this.UserTypeId == 3) {
        this.isIT = true;
      } else if (this.UserTypeId == 4) {
        this.isSuper = true;
      }

      this.isLogged = true;
      this.email = this.usuario.email;

      // console.log(this.usuario.imagePath + " ***** NAVBAR" );
      if (this.usuario.imagePath == null) {
        this.foto = 'assets/user.png'; //"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
      } else {
        this.foto = environment.baseUrl + '/' + this.usuario.imagePath;
        // this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
      }

      if (this.usuario.empresaId != null){
        if (this.usuario.empresa.empresaLogo == null ) {
          this.fotoEmpresa = 'assets/TMF_Logo.png'; //"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
        } else {
          this.fotoEmpresa =
            environment.baseUrl + '/' + this.usuario.empresa.empresaLogo;
          // this.foto = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
        }
  
        if (this.usuario.empresa.empresaColor !== null) {
          this.color = this.usuario.empresa.empresaColor;
          // console.log(this.color + ' *****');
        }
      }else{
        // console.log("first")
        this.fotoEmpresa = 'assets/TMF_Logo.png';
      }
      
    }
  }

  onLogout() {
    // this.clock.unsubscribe();
    this.fechaBandera = false;
    this.timer.validarTimer(false);
    this.apiAuthService.logout();
  }
}
