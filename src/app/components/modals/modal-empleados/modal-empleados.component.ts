import { EmpleadosComponent } from './../../cruds/empleados/empleados.component';
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
import { Usuario } from 'src/app/models/usuario';
import { Rol } from 'src/app/models/rol';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-modal-empleados',
  templateUrl: './modal-empleados.component.html',
  styleUrls: ['./modal-empleados.component.css'],
})
export class ModalEmpleadosComponent implements OnInit {
  private emailPattern: any =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  private nombrePattern: any = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
  private telephonePattern: any = /^([0-9])*$/;
  private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/;
  public usuario: Usuario;

  constructor(
    public dataApi: DataApiService,
    private cifrado: CifradoDatosService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private authUserService: AuthUserService
  ) {
    this.UsuarioForm = this.createForm();
    this.usuario = this.authUserService.usuarioData;
  }

  @ViewChild('imageUser', { static: false }) inputImageUser;
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public UsuarioForm: FormGroup;

  get UsuarioNombre() {
    return this.UsuarioForm.get('UsuarioNombre');
  }
  get UsuarioApellidoP() {
    return this.UsuarioForm.get('UsuarioApellidoP');
  }
  get UsuarioApellidoM() {
    return this.UsuarioForm.get('UsuarioApellidoM');
  }
  get Email() {
    return this.UsuarioForm.get('Email');
  }
  get EmailSSO() {
    return this.UsuarioForm.get('EmailSSO');
  }
  get RolId() {
    return this.UsuarioForm.get('RolId');
  }
  get UsuarioId() {
    return this.UsuarioForm.get('UsuarioId');
  }
  get Password() {
    return this.UsuarioForm.get('Password');
  }
  get Foto() {
    return this.UsuarioForm.get('Foto');
  }
  get UsuarioClave() {
    return this.UsuarioForm.get('UsuarioClave');
  }
  get EmpleadoNoEmp() {
    return this.UsuarioForm.get('EmpleadoNoEmp');
  }
  get EmpresaId() {
    return this.UsuarioForm.get('EmpresaId');
  }
  // get EmpleadoRFC() {
  //   return this.UsuarioForm.get('EmpleadoRFC');
  // }

  user_validation_messages = {
    UsuarioId: [],
    Password: [
      {
        type: 'required',
        message: 'El password es requerido',
      },
      // {
      //   type: 'minlength',
      //   message: 'El password debe de contener mínimo 8 caracteres'
      // },
      {
        type: 'pattern',
        message:
          'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.',
      },
    ],
    UsuarioNombre: [
      {
        type: 'required',
        message: 'El nombre es requerido',
      },
      {
        type: 'minlength',
        message: 'El nombre debe de contener mínimo 3 caracteres',
      },
      {
        type: 'pattern',
        message:
          'El nombre debe de comenzar con mayúscula y contener solamente letras',
      },
    ],
    UsuarioApellidoP: [
      {
        type: 'required',
        message: 'El apellido paterno es requerido',
      },
      {
        type: 'minlength',
        message: 'El apellido paterno  debe de contener mínimo 3 caracteres',
      },
      {
        type: 'pattern',
        message:
          'El apellido paterno  debe de comenzar con mayúscula y contener solamente letras',
      },
    ],
    UsuarioApellidoM: [
      // {
      //   type: 'required',
      //   message: 'El apellido paterno es requerido'
      // },
      // {
      //   type: 'minlength',
      //   message: 'El apellido paterno  debe de contener mínimo 3 caracteres'
      // },
      // {
      //   type: 'pattern',
      //   message: 'El apellido paterno  debe de comenzar con mayúscula y contener solamente letras'
      // }
    ],
    UsuarioClave: [
      {
        type: 'required',
        message: 'El usuario es requerido',
      },
      {
        type: 'minlength',
        message: 'El usuario  debe de contener mínimo 3 caracteres',
      },
      // {
      //   type: 'pattern',
      //   message: 'El apellido materno  debe de comenzar con mayúscula y contener solamente letras'
      // }
    ],
    Email: [
      {
        type: 'required',
        message: 'El email es requerido',
      },
      {
        type: 'pattern',
        message: 'El email no es valido',
      },
    ],
    EmailSSO: [
      // {
      //   type: 'required',
      //   message: 'El email institucional es requerido',
      // },
      {
        type: 'pattern',
        message: 'El email institucional no es valido',
      },
    ],
    // 'RolId': [
    //   {
    //     type: 'required',
    //     message: 'El tipo de usuario es requerido'
    //   }
    // ],
    EmpleadoNoEmp: [
      {
        type: 'required',
        message: 'El número de empleado es requerido',
      },
    ],
    EmpresaId: [
      {
        type: 'required',
        message: 'La empresa es requerida',
      },
    ],
    // EmpleadoRFC: [
    //   {
    //     type: 'required',
    //     message: 'La empresa es requerida',
    //   },
    // ],
  };

  createForm() {
    return new FormGroup({
      UsuarioId: new FormControl('', []),
      Password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        Validators.pattern(this.regex),
      ]),
      UsuarioNombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.nombrePattern),
      ]),
      UsuarioApellidoP: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.nombrePattern),
      ]),
      UsuarioApellidoM: new FormControl('', []),
      UsuarioClave: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      EmailSSO: new FormControl('', [
        // Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      // RolId: new FormControl('',
      //   [Validators.required
      //   ]),
      Foto: new FormControl('', []),
      EmpleadoNoEmp: new FormControl('', [Validators.required]),
      EmpresaId: new FormControl('', [Validators.required]),
      // EmpleadoRFC: new FormControl('', [Validators.required]),
    });
  }

  private user: Usuario;
  public userTypes: Rol;
  public empresas: Empresa;
  public imageSrc: string;

  public isAdmin: any = null;
  public file: File;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.RecuperaUserTypes();
    this.RecuperaEmpresas();
    this.imageSrc = '';
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  RecuperaUserTypes() {
    this.dataApi.GetList('/Roles').subscribe(
      (userTypes) => {
        this.userTypes = userTypes.sort((a, b) => {
          if (a.rolNombre > b.rolNombre) {
            return 1;
          }
          if (a.rolNombre < b.rolNombre) {
            return -1;
          }
          return 0;
        });
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
  }

  RecuperaEmpresas() {
    this.dataApi.GetList('/Empresas').subscribe(
      (empresas) => {
        this.empresas = empresas.sort((a, b) => {
          if (a.empresaNombre > b.empresaNombre) {
            return 1;
          }
          if (a.empresaNombre < b.empresaNombre) {
            return -1;
          }
          return 0;
        });
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

  onSaveEmpleado(formUsuario): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      if (this.UsuarioForm.value.UsuarioId == null) {
        this.UsuarioForm.value.Password = this.cifrado.encrypt(
          this.UsuarioForm.value.Password
        );
        this.UsuarioForm.value.UsuarioId = 0;
        this.UsuarioForm.value.UsuarioEstatusSesion = false;
        this.UsuarioForm.value.RolId = 2; //TODO actualizar al id correcto
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
            var buscaComa: number = image.indexOf(',') + 1;

            this.UsuarioForm.value.ImageBase64 = image.substr(buscaComa);
          }
          this.UsuarioForm.value.RolId = parseInt(this.UsuarioForm.value.RolId);
          this.dataApi.Post('/Usuarios', this.UsuarioForm.value).subscribe(
            (result) => {
              if (result.exito == 1) {
                this.toastr.success(result.mensaje, 'Exito', {
                  timeOut: 3000,
                });
                this.cambiarEstatusSpinner(false);
                formUsuario.resetForm();
                this.UsuarioForm.reset();
                EmpleadosComponent.updateEmpleados.next(true);
                NavbarComponent.updateUserStatus.next(true);
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
            var buscaComa: number = image.indexOf(',') + 1;

            this.UsuarioForm.value.ImageBase64 = image.substr(buscaComa);
          } else {
            this.UsuarioForm.value.ImagePath =
              this.dataApi.SelectedUsuario.imagePath;
          }
          this.UsuarioForm.value.Password = this.cifrado.encrypt(
            this.UsuarioForm.value.Password
          );
          this.UsuarioForm.value.RolId = parseInt(this.UsuarioForm.value.RolId);
          this.UsuarioForm.value.UsuarioEstatusSesion = false;
          this.UsuarioForm.value.RolId = 2; //TODO actualizar al id correcto
          this.dataApi.PutSub(
            '/Usuarios',
            this.UsuarioForm.value.UsuarioId,
            this.UsuarioForm.value
          ).subscribe(
            (result) => {
              if (result.exito == 1) {
                this.toastr.success(result.mensaje, 'Exito', {
                  timeOut: 3000,
                });
                setTimeout(() => {
                  // if (this.usuario.usuarioId == this.UsuarioForm.value.UsuarioId) {
                  //   this.dataApi.GetListId('/Usuarios', this.usuario.usuarioId).subscribe(result => {
        
                  //     const usuario: Usuario = result;
                  //     usuario.usuarioToken = this.usuario.usuarioToken;
                  //     setTimeout(() => {
                  //       this.authUserService.actualizarLogin(usuario);
                  //     }, 500)
                  //     setTimeout(() => {
                  //       this.cambiarEstatusSpinner(false);
                  //       formUsuario.resetForm();
                  //       this.UsuarioForm.reset();
                  //       UsuariosComponent.updateUsers.next(true);
                  //       NavbarComponent.updateUserStatus.next(true);
                  //       PerfilComponent.updateUsers.next(true);
                  //       this.btnClose.nativeElement.click();
                  //     }, 1000)
                  //       , error => {
                  //         this.toastr.error('Errores en el servidor intente más tarde.', 'Error', {
                  //           timeOut: 3000
                  //         });
                  //       };
                  //   });
                  // } else {
                  this.cambiarEstatusSpinner(false);
                  formUsuario.resetForm();
                  this.UsuarioForm.reset();
                  EmpleadosComponent.updateEmpleados.next(true);
                  NavbarComponent.updateUserStatus.next(true);
                  // PerfilComponent.updateUsers.next(true);
                  this.btnClose.nativeElement.click();
                  // }
                }, 500);
                // this.cambiarEstatusSpinner(false);
                // formUsuario.resetForm();
                // this.UsuarioForm.reset();
                // EmpleadosComponent.updateEmpleados.next(true);
                // NavbarComponent.updateUserStatus.next(true);
                // this.btnClose.nativeElement.click();
              } else {
                this.cambiarEstatusSpinner(false);
                this.toastr.error(result.mensaje, 'Error', {
                  timeOut: 3000,
                });
              }
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
        }, 300);
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

  CerrarME(formUsuario): void {
    this.imageSrc = '';
    formUsuario.resetForm();
    this.UsuarioForm.reset();
  }
}
