import { EmpresasComponent } from './../../cruds/empresas/empresas.component';
import { Empresa } from './../../../models/empresa';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css'],
})
export class ModalEmpresaComponent implements OnInit {
  private nombrePattern: any = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
  private telephonePattern: any = /^([0-9])*$/;
  private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/;
  public empresa: Empresa;

  constructor(
    public dataApi: DataApiService,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {
    this.UsuarioForm = this.createForm();
  }

  @ViewChild('imageUser', { static: false }) inputImageUser;
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public UsuarioForm: FormGroup;

  get EmpresaId() {
    return this.UsuarioForm.get('EmpresaId');
  }
  get EmpresaNombre() {
    return this.UsuarioForm.get('EmpresaNombre');
  }
  get EmpresaColor() {
    return this.UsuarioForm.get('EmpresaColor');
  }
  // get EmpresaLogo() { return this.UsuarioForm.get('EmpresaLogo'); }
  get Foto() {
    return this.UsuarioForm.get('Foto');
  }

  user_validation_messages = {
    UsuarioId: [],
    EmpresaNombre: [
      {
        type: 'required',
        message: 'El nombre es requerido',
      },
      {
        type: 'minlength',
        message: 'El nombre debe de contener mínimo 3 caracteres',
      }
    ],
    EmpresaColor: [],
  };

  createForm() {
    return new FormGroup({
      EmpresaId: new FormControl('', []),
      EmpresaNombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      EmpresaColor: new FormControl('', []),
      Foto: new FormControl('', []),
    });
  }

  // private empresa: Empresa;
  public imageSrc: string;

  public isAdmin: any = null;
  public file: File;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.imageSrc = '';
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result.toString());

      reader.readAsDataURL(file);

      const id = Math.random().toString(36).substring(2);
      this.file = event.target.files[0];
      const filePath = 'uploads/profile_${id}';
    }
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    this.file = e.target.files[0];
    const filePath = 'uploads/profile_${id}';
  }

  onSaveEmpresa(formEmpresa): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (this.UsuarioForm.value.EmpresaColor !== undefined) {
        if (this.UsuarioForm.value.EmpresaId == null) {
          this.UsuarioForm.value.EmpresaId = 0;
          this.UsuarioForm.value.EmpresaEstatus = false;
          if (this.file != undefined) {
            let file = this.file;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            var image: any;

            reader.onload = () => {
              image = reader.result;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          }
          setTimeout(() => {
            if (this.file != undefined) {
              var buscaComa: number = image.indexOf(',') + 1;

              this.UsuarioForm.value.empresaImageBase64 =
                image.substr(buscaComa);
            }
            this.dataApi.Post('/Empresas', this.UsuarioForm.value).subscribe(
              (result) => {
                if (result.exito == 1) {
                  this.toastr.success(result.mensaje, 'Exito', {
                    timeOut: 3000,
                  });
                  this.cambiarEstatusSpinner(false);
                  formEmpresa.resetForm();
                  this.UsuarioForm.reset();
                  EmpresasComponent.updateEmpresas.next(true);
                  this.btnClose.nativeElement.click();
                } else {
                  this.toastr.error(result.mensaje, 'Error', {
                    timeOut: 3000,
                  });
                }
              },
              (error) => {
                this.toastr.error(
                  'Error en el servidor, contacte al administrador del sistema.',
                  'Error',
                  {
                    timeOut: 3000,
                  }
                );
              }
            );
          }, 400);
        } else {
          this.empresa = this.UsuarioForm.value;
          if (this.file != undefined) {
            let file = this.file;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            var image: any;

            reader.onload = () => {
              image = reader.result;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          }
          setTimeout(() => {
            if (this.file != undefined) {
              var buscaComa: number = image.indexOf(',') + 1;

              this.UsuarioForm.value.empresaImageBase64 =
                image.substr(buscaComa);
            } else {
              this.UsuarioForm.value.EmpresaLogo =
                this.dataApi.SelectedEmpresa.empresaLogo;
            }
            this.UsuarioForm.value.EmpresaEstatus = false;
            this.dataApi.Put(
              '/Empresas',
              this.UsuarioForm.value.EmpresaId,
              this.UsuarioForm.value
            );
          }, 300);
          setTimeout(() => {
            this.cambiarEstatusSpinner(false);
            formEmpresa.resetForm();
            this.UsuarioForm.reset();
            EmpresasComponent.updateEmpresas.next(true);
            NavbarComponent.updateUserStatus.next(true);
            this.btnClose.nativeElement.click();
          }, 500);
        }
      } else {
        this.cambiarEstatusSpinner(false);
        this.toastr.error('Seleccione un color antes de continuar.', 'Error', {
          timeOut: 3000,
        });
      }
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error(
        'Errores en el formulario, revise la información ingresada".',
        'Error',
        {
          timeOut: 3000,
        }
      );
    }
  }

  CerrarE(formEmpresa): void {
    this.imageSrc = '';
    formEmpresa.resetForm();
    this.UsuarioForm.reset();
  }
}
