import { Empresa } from './../../../models/empresa';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CifradoDatosService } from '../../../services/cifrado-datos.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TimerService } from 'src/app/services/timer.service';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-inicio-saml',
  templateUrl: './inicio-saml.component.html',
  styleUrls: ['./inicio-saml.component.css'],
})
export class InicioSamlComponent implements OnInit {
  public UsuarioForm: FormGroup;
  private email: string;
  private usuarioJson: string;
  private usuario: Usuario;
  private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/;

  //Se recibe el token de seguridad y se descifra para obtener la información relacionada
  constructor(
    private router: Router,
    private dataApi: DataApiService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private cifrado: CifradoDatosService,
    private spinner: SpinnerService,
    private timer: TimerService,
    private apiAuth: AuthUserService
  ) {
    this.cambiarEstatusSpinner(true);
    this.usuarioJson = JSON.parse(
      this.cifrado.desEncrypt(
        this.activatedRoute.snapshot.paramMap
          .get('tokenUser')
          .replace(/[$]/g, '/')
          .replace(/[&]/g, '+')
      )
    );

    var empresaJson = this.usuarioJson['Empresa'];

    let empresaParceada: Empresa = {
      empresaId: empresaJson['EmpresaId'],
      empresaNombre: empresaJson['EmpresaNombre'],
      empresaLogo: empresaJson['EmpresaLogo'],
      empresaImageBase64: empresaJson['EmpresaImageBase64'],
      empresaColor: empresaJson['EmpresaColor'],
      empresaEstatus: empresaJson['EmpresaEstatus'],
    };

    this.usuario = {
      usuarioId: this.usuarioJson['UsuarioId'],
      email: this.usuarioJson['Email'],
      usuarioNombre: this.usuarioJson['UsuarioNombre'],
      usuarioApellidoP: this.usuarioJson['UsuarioApellidoP'],
      usuarioApellidoM: this.usuarioJson['usuarioApellidoM'],
      usuarioFechaLimite: this.usuarioJson['UsuarioFechaLimite'],
      usuarioEstatusSesion: this.usuarioJson['UsuarioEstatusSesion'],
      usuarioClave: this.usuarioJson['UsuarioClave'],
      usuarioToken: this.usuarioJson['UsuarioToken'],
      imagePath: this.usuarioJson['ImagePath'],
      rolId: this.usuarioJson['RolId'],
      empleadoNoEmp: this.usuarioJson['EmpleadoNoEmp'],
      empresaId: this.usuarioJson['EmpleadoNoEmp'],
      empresa: empresaParceada,
      imageBase64: this.usuarioJson['ImageBase64'],
      imageFullPath: this.usuarioJson['ImageFullPath'],
      usuarioFullName: this.usuarioJson['UsuarioFullName'],
    };

    //     console.log(JSON.stringify(this.usuario) + " inicio SAML");

    // // let usuarioParse : Usuario =
    // console.log(JSON.stringify(this.usuarioJson) + ' ***')
    this.apiAuth.loginSaml(this.usuario);

    setTimeout(() => {
      this.dataApi
        .RecuperaParametro('/Parametros/RecuperaParametro/SETSES')
        .subscribe((parametro) => {
          // var usuario = this.apiAuth.usuarioData;
          this.cambiarEstatusSpinner(false);
          sessionStorage.setItem(
            'tiempoSesion',
            parametro.parametroValorInicial
          );
          this.timer.asignarTiempo(parseInt(parametro.parametroValorInicial));
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
          this.timer.validarTimer(false);
          this.apiAuth.logout();
        };

      this.cambiarEstatusSpinner(false);
    }, 2000);
  }

  public onLoginRedirect(): void {
    NavbarComponent.updateUserStatus.next(true);
    this.router.navigate(['']);
  }

  // get PasswordLogin() {
  //   return this.UsuarioForm.get('PasswordLogin');
  // }
  // get ConfirmLogin() {
  //   return this.UsuarioForm.get('ConfirmLogin');
  // }

  // user_validation_messages = {
  //   PasswordLogin: [
  //     {
  //       type: 'required',
  //       message: 'La contraseña es requerida',
  //     },
  //     {
  //       type: 'pattern',
  //       message:
  //         'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.',
  //     },
  //   ],
  //   ConfirmLogin: [
  //     {
  //       type: 'required',
  //       message: 'La confirmación es requerida',
  //     },
  //     {
  //       type: 'pattern',
  //       message:
  //         'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.',
  //     },
  //   ],
  // };

  // createForm() {
  //   return new FormGroup({
  //     PasswordLogin: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(this.regex),
  //     ]),
  //     ConfirmLogin: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(this.regex),
  //     ]),
  //   });
  // }

  ngOnInit() {}

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  // AsignarPass(): void {
  //   this.cambiarEstatusSpinner(true);
  //   if (this.UsuarioForm.valid) {
  //     if (
  //       this.UsuarioForm.value.PasswordLogin ==
  //       this.UsuarioForm.value.ConfirmLogin
  //     ) {
  //       this.usuario.password = this.cifrado.encrypt(
  //         this.UsuarioForm.value.PasswordLogin
  //       );

  //       this.dataApi
  //         .Post('/Usuarios/SetPassword', this.usuario)
  //         .subscribe((result) => {
  //           this.toastr.success(
  //             'La contraseña se ha registrado correctamente, ahora puede iniciar sesión',
  //             'Exito',
  //             {
  //               timeOut: 3000,
  //             }
  //           );
  //           this.cambiarEstatusSpinner(false);
  //           this.onLoginRedirect();
  //         }),
  //         (error) => {
  //           this.cambiarEstatusSpinner(false);
  //           this.toastr.error(error.error.error_description, 'Error', {
  //             timeOut: 3000,
  //           });
  //         };
  //     } else {
  //       this.cambiarEstatusSpinner(false);
  //       this.toastr.error(
  //         'La contraseña no coincide con la confirmación',
  //         'Error',
  //         {
  //           timeOut: 3000,
  //         }
  //       );
  //     }
  //   } else {
  //     this.cambiarEstatusSpinner(false);
  //     this.toastr.error(
  //       'Error en los datos solicitados, favor de verificar',
  //       'Error',
  //       {
  //         timeOut: 3000,
  //       }
  //     );
  //   }
  // }
}
