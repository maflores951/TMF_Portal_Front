// import { LoginService } from './../../../services/login-services.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { Parametro } from 'src/app/models/parametro';
import { TimerService } from 'src/app/services/timer.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {
  public UsuarioForm: FormGroup;
  public parametro: Parametro;

  constructor(
    private router: Router,
    private apiAuth: AuthUserService,
    private toastr: ToastrService,
    private cifrado: CifradoDatosService,
    private spinner: SpinnerService,
    private dataApi: DataApiService,
    private timer: TimerService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.UsuarioForm = this.createForm();
  }


  // loginWithGoogle(): void {
  //   // this.loginService.loginGoogle();
  //   //  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => console.log(this.socialAuthService.authState) );
  //   // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   //  console.log(this.loginService.isLoggedIn());
  //   // this.loginService.loginForUser();
  // }

  // logOutWithGoogle(): void {
  //   this.loginService.signOut();
  //   //  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => console.log(this.socialAuthService.authState) );
  //   // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   // console.log("ENyra")
  //   // this.loginService.loginForUser();
  // }


  private emailPattern: any =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  public email: string = '';
  public password: string = '';
  public user: Usuario;

  public urlBase = environment.baseUrl;
  public servicePrefix = environment.servicePrefix;
  public url: string;
  
  get EmailLogin() {
    return this.UsuarioForm.get('EmailLogin');
  }
  get PasswordLogin() {
    return this.UsuarioForm.get('PasswordLogin');
  }

  user_validation_messages = {
    EmailLogin: [
      {
        type: 'required',
        message: 'El usuario es requerido',
      },
      // {
      //   type: 'minlength',
      //   message: 'El email debe de contener m??nimo 6 caracteres'
      // },
      // {
      //   type: 'pattern',
      //   message: 'El email no es valido'
      // }
    ],
    PasswordLogin: [
      {
        type: 'required',
        message: 'El password es requerido',
      },
      // {
      //   type: 'minlength',
      //   message: 'El password debe de contener m??nimo 8 caracteres'
      // },
    ],
  };

  createForm() {
    return new FormGroup({
      EmailLogin: new FormControl('', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.pattern(this.emailPattern)
      ]),
      PasswordLogin: new FormControl('', [
        Validators.required,
        // Validators.minLength(8)
      ]),
    });
  }

  ngOnInit() {
    console.log('V 1.2.10 12/10/2022');
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  onLogin() {
    // var prueba = this.cifrado.encrypt('123456');

    // var prueba = this.cifrado.desEncrypt('TzXXRuCVUw+9dB2kLNNSnw==');

    if (this.UsuarioForm.valid) {
      this.cambiarEstatusSpinner(true);
      this.UsuarioForm.value.PasswordLogin = this.cifrado.encrypt(
        this.UsuarioForm.value.PasswordLogin
      );
      this.apiAuth
        .login(
          this.UsuarioForm.value.EmailLogin,
          this.UsuarioForm.value.PasswordLogin
        )
        .subscribe((response) => {
          if (response.exito === 1) {
            this.dataApi
              .RecuperaParametro('/Parametros/RecuperaParametro/SETSES')
              .subscribe((parametro) => {
                // var usuario = this.apiAuth.usuarioData;
                this.cambiarEstatusSpinner(false);
                sessionStorage.setItem(
                  'tiempoSesion',
                  parametro.parametroValorInicial
                );
                this.timer.asignarTiempo(
                  parseInt(parametro.parametroValorInicial)
                );
                this.timer.validarTimer(true);

                // setTimeout(() => {
                //   this.apiAuth.logout()
                // }, 1000 * 60 * 60 * 8);
                this.onLoginRedirect();
              }),
              (error) => {
                this.cambiarEstatusSpinner(false);
                this.toastr.error(error.error.error_description, 'Error', {
                  timeOut: 3000,
                });
              };
          } else {
            this.cambiarEstatusSpinner(false);
            this.toastr.error(response.mensaje, 'Error', {
              timeOut: 3000,
            });
          }
        });
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Error en los datos solicitados', 'Error', {
        timeOut: 3000,
      });
    }
  }

  onLogout() {
    sessionStorage.clear();
  }

  onLoginRedirect(): void {
    NavbarComponent.updateUserStatus.next(true);
    this.router.navigate(['']);
  }

   httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  


  onLoginSAML(): void {
    // NavbarComponent.updateUserStatus.next(true);
    // this.router.navigate(['']);
    this.url = this.urlBase + this.servicePrefix + "/Saml/login";
    this.http.post<any>(this.url,this.httpOption).subscribe(saml => {
      // console.log(JSON.stringify(saml) + "  ***");
      window.location.href = saml.url;
    },
    (error) => {
      console.log(error);
      // this.toastr.error(
      //   'Error en el servidor, contacte al administrador del sistema.',
      //   'Error',
      //   {
      //     timeOut: 3000,
      //   }
      // );
      // this.cambiarEstatusSpinner(false);
    });
  }
}
