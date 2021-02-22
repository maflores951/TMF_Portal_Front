import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { SpinnerService } from '../../../services/spinner.service';
// import { SpinnerService } from 'angular-spinners';
import { Usuario } from 'src/app/models/usuario';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({ providedIn: 'root' })

export class LoginComponent implements OnInit {

  public UsuarioForm: FormGroup;

   constructor(private router: Router, private apiAuth: AuthUserService,private toastr: ToastrService, private cifrado: CifradoDatosService, private spinner: SpinnerService) {
    this.UsuarioForm = this.createForm();
  }

  // constructor(private router: Router, private dataApi: DataApiService, private toastr: ToastrService, private spinnerService: SpinnerService) {
  //   this.UsuarioForm = this.createForm();
  // }

  private emailPattern: any = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  public email: string = '';
  public password: string = '';
  public user: Usuario;

  get EmailLogin() { return this.UsuarioForm.get('EmailLogin'); }
  get PasswordLogin() { return this.UsuarioForm.get('PasswordLogin'); }

  user_validation_messages = {
    'EmailLogin': [
      {
        type: 'required',
        message: 'El email es requerido'
      },
      {
        type: 'minlength',
        message: 'El email debe de contener mínimo 6 caracteres'
      },
      {
        type: 'pattern',
        message: 'El email no es valido'
      }
    ],
    'PasswordLogin': [
      {
        type: 'required',
        message: 'El password es requerido'
      },
      {
        type: 'minlength',
        message: 'El password debe de contener mínimo 6 caracteres'
      },
    ]
  }

  createForm() {
    return new FormGroup({
      EmailLogin: new FormControl('',
        [Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.emailPattern)
        ]),
      PasswordLogin: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ]),
    });
  }

  ngOnInit() {
    
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  onLogin(){
  if (this.UsuarioForm.valid) {
      // this.spinnerService.show("mySpinner");
      this.cambiarEstatusSpinner(true);
      this.UsuarioForm.value.PasswordLogin = this.cifrado.encrypt(this.UsuarioForm.value.PasswordLogin);
      this.apiAuth.login(this.UsuarioForm.value.EmailLogin,this.UsuarioForm.value.PasswordLogin).subscribe(response =>{
        if (response.exito === 1){
          // console.log('Entra 1');
            // sessionStorage.setItem('UserTypeId', result.UserTypeId.toString());
            // sessionStorage.setItem('UserId', result.UserId.toString());
            // sessionStorage.setItem('Token', JSON.stringify(this.tokenResponse));
            // sessionStorage.setItem('email', email);
            // sessionStorage.setItem('foto', result.ImagePath);
            // this.spinnerService.hideAll();
            this.cambiarEstatusSpinner(false);
            this.onLoginRedirect();
            // this.router.navigate(['/']);
        }else {
          this.cambiarEstatusSpinner(false);
          // this.spinnerService.hideAll();
          this.toastr.error('Error en los datos solicitados', 'Error', {
            timeOut: 3000});
          }
        });
  } else {
    // this.spinnerService.hideAll();
    this.cambiarEstatusSpinner(false);
    this.toastr.error('Error en los datos solicitados', 'Error', {
      timeOut: 3000
    });
    //alert("Ingrese los datos solicitados");
  }
}

  // onLogin(): void{
  //   if (this.UsuarioForm.valid) {
  //     this.spinnerService.spinnerShow();
  //     this.dataApi.GetToken(this.UsuarioForm.value.EmailLogin, this.UsuarioForm.value.PasswordLogin).subscribe(result => {
  //       // this.tokenResponse = result;
        
  //       this.tokenResponse = {
  //         AccessToken: result['access_token'],
  //         TokenType: result['token_type'],
  //         ExpiresIn: result['expires_in'],
  //         UserName: result['userName'],
  //         Issued: result['.issued'],
  //         Expires: result['.expires'],
  //         ErrorDescription: result['error_description']
  //       }
  //       console.log(this.tokenResponse.AccessToken);
  //       this.RecuperaUsuario(this.tokenResponse.TokenType, this.tokenResponse.AccessToken, this.UsuarioForm.value.EmailLogin)
  //     }, error => {
  //         this.spinnerService.spinnerHide();
  //         this.toastr.error(error.error.error_description, 'Error', {
  //           timeOut: 3000
  //         });
  //       //alert(error.error.error_description);
  //     //console.error(error.error.error_description)
  //   });
  //   } else {
  //     this.spinnerService.spinnerHide();
  //     this.toastr.error('Error en los datos solicitados', 'Error', {
  //       timeOut: 3000
  //     });
  //     //alert("Ingrese los datos solicitados");
  //   }

  // }

  // RecuperaUsuario(TokenType: string, AccessToken: string, email: string ) {
  //   this.dataApi.GetUserByEmail(TokenType, AccessToken, email).subscribe(result => {
  //     //this.user = result;
  //     //this.dataApi.SelectedUser = Object.assign({}, result);
  //     sessionStorage.setItem('UserTypeId', result.UserTypeId.toString());
  //     sessionStorage.setItem('UserId', result.UserId.toString());
  //     sessionStorage.setItem('Token', JSON.stringify(this.tokenResponse));
  //     sessionStorage.setItem('email', email);
  //     sessionStorage.setItem('foto', result.ImagePath);
  //     this.spinnerService.spinnerHide();
  //     this.onLoginRedirect();
  //   }, error => {
  //       this.spinnerService.spinnerHide();
  //     console.error(error.error.error_description)
  //   });
  // }

  onLogout() {
    sessionStorage.clear();
  }

  onLoginRedirect(): void{
    NavbarComponent.updateUserStatus.next(true);
    this.router.navigate(['']);
  }

}
