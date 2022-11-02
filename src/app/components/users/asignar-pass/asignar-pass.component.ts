import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CifradoDatosService } from '../../../services/cifrado-datos.service';
import { Usuario } from 'src/app/models/usuario';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-asignar-pass',
  templateUrl: './asignar-pass.component.html',
  styleUrls: ['./asignar-pass.component.css'],
})
export class AsignarPassComponent implements OnInit {
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
    private spinner: SpinnerService
  ) {
    this.cambiarEstatusSpinner(true);
    this.usuarioJson = JSON.parse(
      this.cifrado.desEncrypt(
        this.activatedRoute.snapshot.paramMap
          .get('token')
          .replace(/[$]/g, '/')
          .replace(/[&]/g, '+')
      )
    );
    this.usuario = {
      usuarioId: this.usuarioJson['UsuarioId'],
      email: this.usuarioJson['Email'],
      usuarioFechaLimite: this.usuarioJson['UsuarioFechaLimite'],
    };
    this.email = this.usuario.email;
    this.UsuarioForm = this.createForm();

    //Se valida el tiempo de valides del token
    if (
      new Date(this.usuario.usuarioFechaLimite) < new Date() ||
      this.usuario.usuarioFechaLimite === null ||
      this.usuario.usuarioFechaLimite == ''
    ) {
      this.toastr.error(
        'El token de seguridad ha expirado, por favor solicite uno nuevo',
        'Error',
        {
          timeOut: 3000,
        }
      );
      this.cambiarEstatusSpinner(false);
      this.onLoginRedirect();
    } else {
      this.cambiarEstatusSpinner(false);
    }
  }

  get PasswordLogin() {
    return this.UsuarioForm.get('PasswordLogin');
  }
  get ConfirmLogin() {
    return this.UsuarioForm.get('ConfirmLogin');
  }

  user_validation_messages = {
    PasswordLogin: [
      {
        type: 'required',
        message: 'La contraseña es requerida',
      },
      {
        type: 'pattern',
        message:
          'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.',
      },
    ],
    ConfirmLogin: [
      {
        type: 'required',
        message: 'La confirmación es requerida',
      },
      {
        type: 'pattern',
        message:
          'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.',
      },
    ],
  };

  createForm() {
    return new FormGroup({
      PasswordLogin: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      ConfirmLogin: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
    });
  }

  ngOnInit() {}

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  AsignarPass(): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (
        this.UsuarioForm.value.PasswordLogin ==
        this.UsuarioForm.value.ConfirmLogin
      ) {
        this.usuario.password = this.cifrado.encrypt(
          this.UsuarioForm.value.PasswordLogin
        );

        this.dataApi
          .Post('/Usuarios/SetPassword', this.usuario)
          .subscribe((result) => {
            this.toastr.success(
              'La contraseña se ha registrado correctamente, ahora puede iniciar sesión',
              'Exito',
              {
                timeOut: 3000,
              }
            );
            this.cambiarEstatusSpinner(false);
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
        this.toastr.error(
          'La contraseña no coincide con la confirmación',
          'Error',
          {
            timeOut: 3000,
          }
        );
      }
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error(
        'Error en los datos solicitados, favor de verificar',
        'Error',
        {
          timeOut: 3000,
        }
      );
    }
  }

  public onLoginRedirect(): void {
    this.router.navigate(['/user/login']);
  }
}
