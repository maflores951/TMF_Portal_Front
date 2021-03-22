import { Component, OnInit, ViewChild, ElementRef, Input, NgModule } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { DataApiService } from 'src/app/services/data-api.service';
import { Usuario } from 'src/app/models/usuario';
import { Rol } from 'src/app/models/rol';
import { UsuariosComponent } from '../../cruds/usuarios/usuarios.component';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { PerfilComponent } from '../../users/perfil/perfil.component';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  private emailPattern: any = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  private nombrePattern: any = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
  private telephonePattern: any = /^([0-9])*$/;


  constructor(private router: Router, public dataApi: DataApiService,private cifrado: CifradoDatosService, private toastr: ToastrService, private spinner: SpinnerService ) {
    this.UsuarioForm = this.createForm();
  }

  @ViewChild('imageUser', { static: false }) inputImageUser;
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public UsuarioForm: FormGroup;


  get UsuarioNombre() { return this.UsuarioForm.get('UsuarioNombre'); }
  get UsuarioApellidoP() { return this.UsuarioForm.get('UsuarioApellidoP'); }
  get UsuarioApellidoM() { return this.UsuarioForm.get('UsuarioApellidoM'); }
  get Email() { return this.UsuarioForm.get('Email'); }
  get RolId() { return this.UsuarioForm.get('RolId'); }
  get UsuarioId() { return this.UsuarioForm.get('UsuarioId'); }
  get Password() { return this.UsuarioForm.get('Password'); }
  get Foto() { return this.UsuarioForm.get('Foto'); }

  user_validation_messages = {
    'UsuarioId': [],
    'Password': [
      {
      type: 'required',
      message: 'El password es requerido'
    },
    {
      type: 'minlength',
      message: 'El password debe de contener mínimo 8 caracteres'
    }
  ],
    'UsuarioNombre': [
      {
        type: 'required',
        message: 'El nombre es requerido'
      },
      {
        type: 'minlength',
        message: 'El nombre debe de contener mínimo 6 caracteres'
      },
      {
        type: 'pattern',
        message: 'El nombre debe de comenzar con mayúscula y contener solamente letras'
      }
    ],
    'UsuarioApellidoP': [
      {
        type: 'required',
        message: 'El apellido paterno es requerido'
      },
      {
        type: 'minlength',
        message: 'El apellido paterno  debe de contener mínimo 6 caracteres'
      },
      {
        type: 'pattern',
        message: 'El apellido paterno  debe de comenzar con mayúscula y contener solamente letras'
      }
    ],
    'UsuarioApellidoM': [
      {
        type: 'required',
        message: 'El apellido materno es requerido'
      },
      {
        type: 'minlength',
        message: 'El apellido materno  debe de contener mínimo 6 caracteres'
      },
      {
        type: 'pattern',
        message: 'El apellido materno  debe de comenzar con mayúscula y contener solamente letras'
      }
    ],
    'Email': [
      {
        type: 'required',
        message: 'El email es requerido'
      },
      {
        type: 'pattern',
        message: 'El email no es valido'
      }
    ],
    'RolId': [
      {
        type: 'required',
        message: 'El tipo de usuario es requerido'
      }
    ],
  }

  createForm() {
    return new FormGroup({
      UsuarioId: new FormControl('',
        []),
      Password: new FormControl('',
        [Validators.required,
          Validators.minLength(8)]),
      UsuarioNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.nombrePattern)
        ]),
      UsuarioApellidoP: new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.nombrePattern)
        ]),
      UsuarioApellidoM: new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.nombrePattern)
        ]),
      Email: new FormControl('',
        [Validators.required,
        Validators.pattern(this.emailPattern)
        ]),
      RolId: new FormControl('',
        [Validators.required
        ]),
      Foto: new FormControl('',
        []),
    });
  }

  private user: Usuario;
  public userTypes: Rol;
  public imageSrc: string;
 
  public isAdmin: any = null;
  public file: File;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.RecuperaUserTypes();
    this.imageSrc = ""
    this.cambiarEstatusSpinner(false);
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  RecuperaUserTypes() {
    this.dataApi.GetList('/Roles').subscribe(userTypes => {
      this.userTypes = userTypes;
    }, error => {
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
  }


  readURL(event: any): void {
    
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result.toString();

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


  onSaveUsuario(formUsuario): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (this.UsuarioForm.value.UsuarioId == null) {
        this.UsuarioForm.value.Password = this.cifrado.encrypt(this.UsuarioForm.value.Password);
        this.UsuarioForm.value.UsuarioId = 0;
        this.UsuarioForm.value.UsuarioEstatusSesion = false;
        if (this.file != null) {
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

          if (this.file != null) {
            var buscaComa: number = image.indexOf(",") + 1;

            this.UsuarioForm.value.ImageBase64 = image.substr(buscaComa)
          }
          this.UsuarioForm.value.RolId = parseInt(this.UsuarioForm.value.RolId);
          this.dataApi.Post('/Usuarios', this.UsuarioForm.value).subscribe(result => {
            this.toastr.success('Registro exitoso.', 'Exito', {
              timeOut: 3000
            });
          }, error => {
            this.toastr.error('Errores en el servidor intente más tarde.', 'Error', {
              timeOut: 3000
            });
          });
        }, 400)
      } else {
        this.user = this.UsuarioForm.value;
        if (this.file != null) {
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

          if (this.file != null) {
            var buscaComa: number = image.indexOf(",") + 1;

            this.user.imageBase64 = image.substr(buscaComa)
          }
          this.UsuarioForm.value.RolId = parseInt(this.UsuarioForm.value.RolId);
          this.UsuarioForm.value.UsuarioEstatusSesion = false;
           this.dataApi.Put('/Usuarios', this.UsuarioForm.value.UsuarioId , this.UsuarioForm.value);
        }, 300)
        
      }
      setTimeout(() => {
        this.cambiarEstatusSpinner(false);
      formUsuario.resetForm();
      this.UsuarioForm.reset();
      UsuariosComponent.updateUsers.next(true);
      NavbarComponent.updateUserStatus.next(true);
      PerfilComponent.updateUsers.next(true);
        this.btnClose.nativeElement.click();
      }, 600)
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Errores en el formulario, revise la información ingresada".', 'Error', {
        timeOut: 3000
      });
    }

  }

  CerrarMU(formUsuario): void {
    this.imageSrc = ""
    formUsuario.resetForm();
    this.UsuarioForm.reset();
  }
}