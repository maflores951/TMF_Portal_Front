import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { RolesComponent } from '../../cruds/roles/roles.component';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.css']
})
export class ModalRolComponent implements OnInit {

    constructor(public dataApi: DataApiService, private spinner: SpinnerService, private toastr: ToastrService)
    {
      this.UsuarioForm = this.createForm();
    }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;
   private rol: Rol;

  ngOnInit() {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  public UsuarioForm: FormGroup;

  get RolId() { return this.UsuarioForm.get('RolId'); }
  get RolNombre() { return this.UsuarioForm.get('RolNombre'); }

  user_validation_messages = {
    'RolNombre': [
      {
        type: 'required',
        message: 'El nombre del tipo de usuario es requerido'
      },
      {
        type: 'minlength',
        message: 'El nombre del tipo de usuario debe de contener mínimo 4 caracteres'
      }
    ]
  }

  createForm() {
    return new FormGroup({
      RolNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(4)
        ]),
      RolId: new FormControl('',
        []),
    });
  }

  onSaveUserType(formUserType): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (this.UsuarioForm.value.RolId == null) {
        this.UsuarioForm.value.RolId = 0;
        this.UsuarioForm.value.RolEstatus = false;
        this.dataApi.Post('/Roles', this.UsuarioForm.value).subscribe(result => {
          this.toastr.error('Registro exitoso', 'Exito', {
            timeOut: 3000
          });
        }, error => {
          this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
            timeOut: 3000
          });
        });
      } else {
        
        this.rol = this.UsuarioForm.value;
        this.UsuarioForm.value.RolEstatus = false;
        this.dataApi.Put('/Roles', this.UsuarioForm.value.RolId, this.rol);
      }
      setTimeout(() => {
      this.cambiarEstatusSpinner(false);
      formUserType.resetForm();
      RolesComponent.updateUserType.next(true);
      this.btnClose.nativeElement.click();
    }, 600)
    }else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Errores en el formulario, revise la información ingresada.', 'Error', {
        timeOut: 3000
      });
      }
  }

  CerrarMUT(formUserType): void {
    formUserType.resetForm();
  }
}
