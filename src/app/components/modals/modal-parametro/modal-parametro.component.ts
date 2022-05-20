import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from 'src/app/models/parametro';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ParametrosComponent } from '../../cruds/parametros/parametros.component';

@Component({
  selector: 'app-modal-parametro',
  templateUrl: './modal-parametro.component.html',
  styleUrls: ['./modal-parametro.component.css'],
})
export class ModalParametroComponent implements OnInit {
  constructor(
    public dataApi: DataApiService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    this.UsuarioForm = this.createForm();
  }
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;
  private parametro: Parametro;

  ngOnInit(): void {}

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  public UsuarioForm: FormGroup;

  get ParametroId() {
    return this.UsuarioForm.get('ParametroId');
  }
  get ParametroNombre() {
    return this.UsuarioForm.get('ParametroNombre');
  }
  get ParametroClave() {
    return this.UsuarioForm.get('ParametroClave');
  }
  get ParametroDescripcion() {
    return this.UsuarioForm.get('ParametroDescripcion');
  }
  get ParametroValorInicial() {
    return this.UsuarioForm.get('ParametroValorInicial');
  }
  get ParametroValorFinal() {
    return this.UsuarioForm.get('ParametroValorFinal');
  }

  user_validation_messages = {
    ParametroNombre: [
      {
        type: 'required',
        message: 'El nombre del parametro es requerido',
      },
      {
        type: 'minlength',
        message: 'El nombre del parametro debe de contener mínimo 4 caracteres',
      },
    ],
    ParametroClave: [
      {
        type: 'required',
        message: 'La clave del parametro es requerida',
      },
      {
        type: 'minlength',
        message: 'La clave del parametro debe de contener 6 caracteres',
      },
    ],
  };

  createForm() {
    return new FormGroup({
      ParametroNombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      ParametroClave: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      ParametroDescripcion: new FormControl('', []),
      ParametroValorInicial: new FormControl('', []),
      ParametroValorFinal: new FormControl('', []),
      ParametroId: new FormControl('', []),
    });
  }

  onSaveParametro(formParametro): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (this.UsuarioForm.value.ParametroId == null) {
        this.UsuarioForm.value.ParametroId = 0;
        this.UsuarioForm.value.ParametroEstatusDelete = false;
        this.dataApi.Post('/Parametros', this.UsuarioForm.value).subscribe(
          (result) => {
            this.cambiarEstatusSpinner(false);
            this.toastr.error('Registro exitoso.', 'Exito', {
              timeOut: 3000,
            });
          },
          (error) => {
            this.cambiarEstatusSpinner(false);
            this.toastr.error(
              'Error en el servidor, contacte al administrador del sistema.',
              'Error',
              {
                timeOut: 3000,
              }
            );
          }
        );
      } else {
        this.parametro = this.UsuarioForm.value;
        this.UsuarioForm.value.ParametroEstatusDelete = false;
        this.dataApi.Put(
          '/Parametros',
          this.UsuarioForm.value.ParametroId,
          this.parametro
        );
      }
      setTimeout(() => {
        this.cambiarEstatusSpinner(false);
        formParametro.resetForm();
        ParametrosComponent.updateParametros.next(true);
        this.btnClose.nativeElement.click();
      }, 600);
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error(
        'Errores en el formulario, revise la información ingresada.',
        'Error',
        {
          timeOut: 3000,
        }
      );
    }
  }

  CerrarMP(formParametro): void {
    formParametro.resetForm();
  }
}
