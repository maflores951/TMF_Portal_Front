import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CifradoDatosService } from '../../../services/cifrado-datos.service';
import { Usuario } from 'src/app/models/usuario';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
// import { SpinnerService } from 'angular-spinners';

@Component({
  selector: 'app-asignar-pass',
  templateUrl: './asignar-pass.component.html',
  styleUrls: ['./asignar-pass.component.css']
})
export class AsignarPassComponent implements OnInit {

  public UsuarioForm: FormGroup;
  // private recoverPasswordRequest: RecoverPasswordRequest;
  private email: string;
  private usuarioJson: string;
  private usuario: Usuario;

  constructor(private router: Router, private dataApi: DataApiService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private cifrado: CifradoDatosService, private spinner: SpinnerService) {
    // this.spinnerService.showAll();
    this.cambiarEstatusSpinner(true);
    this.usuarioJson = JSON.parse(this.cifrado.desEncrypt(this.activatedRoute.snapshot.paramMap.get('token').replace(/[$]/g, '/').replace(/[&]/g, '+')));
    this.usuario = {
      usuarioId: this.usuarioJson['UsuarioId'],
      email: this.usuarioJson['Email'],
      usuarioFechaLimite: this.usuarioJson['UsuarioFechaLimite']      
    }
    this.email = this.usuario.email;
    this.UsuarioForm = this.createForm();

    //console.log(JSON.stringify(this.usuario) + ' ******');
    //console.log(new Date(this.usuario.UserFechaLimite) + ' ******' + new Date());
    if (new Date(this.usuario.usuarioFechaLimite) < new Date() || this.usuario.usuarioFechaLimite === null || this.usuario.usuarioFechaLimite =='') {
      this.toastr.error('El token de seguridad ha expirado, por favor solicite uno nuevo', 'Error', {
        timeOut: 3000
      });
      // this.spinnerService.hideAll();
      this.cambiarEstatusSpinner(false);
      this.onLoginRedirect();
    } else {
      this.cambiarEstatusSpinner(false);
      // this.spinnerService.hideAll();
    }
    
  }

  get PasswordLogin() { return this.UsuarioForm.get('PasswordLogin'); }
  get ConfirmLogin() { return this.UsuarioForm.get('ConfirmLogin'); }

  user_validation_messages = {
    'PasswordLogin': [
      {
        type: 'required',
        message: 'La contraseña es requerida'
      },
      {
        type: 'minlength',
        message: 'La contraseña debe de contener mínimo 6 caracteres'
      }
    //  {
    //    type: 'pattern',
    //    message: 'El email no es valido'
    //  }
    ],
    'ConfirmLogin': [
      {
        type: 'required',
        message: 'La confirmación es requerida'
      },
      {
        type: 'minlength',
        message: 'La confirmación debe de contener mínimo 6 caracteres'
      }
      //  {
      //    type: 'pattern',
      //    message: 'El email no es valido'
      //  }
    ]
  }


  createForm() {
    return new FormGroup({
      PasswordLogin: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        //Validators.pattern(this.emailPattern)
        ]),
      ConfirmLogin: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        //Validators.pattern(this.emailPattern)
        ])
    });
  }

  ngOnInit() {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  AsignarPass(): void {
    // this.spinnerService.spinnerShow();
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      // console.log(this.usuario.usuarioId + ' ' + this.usuario.email);

      this.usuario.password = this.cifrado.encrypt(this.UsuarioForm.value.PasswordLogin);
      // this.dataApi.Post('/Usuarios', this.usuario).subscribe(result => {
        // this.dataApi.Post('/Usuarios/SetPassword', this.usuario);
        this.dataApi.Post('/Usuarios/SetPassword', this.usuario).subscribe(result => {

       this.toastr.success('La contraseña se ha registrado correctamente, ahora puede iniciar sesión', 'Exito', {
          timeOut: 3000
        });
        // this.spinnerService.spinnerHide();
        this.cambiarEstatusSpinner(false);
        this.onLoginRedirect();
      }), error => {
        // this.spinnerService.spinnerHide();
        this.cambiarEstatusSpinner(false);
        this.toastr.error(error.error.error_description, 'Error', {
          timeOut: 3000
        });
    }
  } else {
      // this.spinnerService.spinnerHide();
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Error en los datos solicitados, favor de verificar', 'Error', {
        timeOut: 3000
      });
    }

}
    //   this.recoverPasswordRequest = {
    //     Email: this.email,
    //     NewPassword: this.UsuarioForm.value.PasswordLogin
    //   }
    //   this.dataApi.SetPassword(this.recoverPasswordRequest).subscribe(result => {
    //     this.toastr.success('La contraseña se ha registrado correctamente, ahora puede iniciar sesión', 'Exito', {
    //       timeOut: 3000
    //     });
    //     this.spinnerService.spinnerHide();
    //     this.onLoginRedirect();
    //   }, error => {
    //       this.spinnerService.spinnerHide();
    //     this.toastr.error(error.error.error_description, 'Error', {
    //       timeOut: 3000
    //     });
    //     //alert(error.error.error_description);
    //     //console.error(error.error.error_description)
    //   });
    // } else {
    //   this.spinnerService.spinnerHide();
    //   this.toastr.error('Error en los datos solicitados, favor de verificar', 'Error', {
    //     timeOut: 3000
    //   });
      //alert("Ingrese los datos solicitados");
 

  onLoginRedirect(): void {
    this.router.navigate(['/user/login']);
  }
}
