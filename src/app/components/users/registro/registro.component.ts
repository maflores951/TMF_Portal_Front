import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
// import { SpinnerService } from 'angular-spinners';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private emailPattern: any = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  private nombrePattern: any = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
  private telephonePattern: any = /^\d{10}$/g;
  private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,15}$/;
  private file: File;

  constructor(private router: Router, public dataApi: DataApiService,private cifrado: CifradoDatosService, private spinner: SpinnerService, private toastr: ToastrService)
  {
    this.UsuarioForm = this.createForm();
  }
  
@ViewChild('imageUser', {static: false}) inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  public UsuarioForm: FormGroup;

  get UsuarioNombre() { return this.UsuarioForm.get('UsuarioNombre'); }
  get UsuarioApellidoP() { return this.UsuarioForm.get('UsuarioApellidoP'); }
  get UsuarioApellidoM() { return this.UsuarioForm.get('UsuarioApellidoM'); }
  // get Telephone() { return this.UsuarioForm.get('Telephone'); }
  get Email() { return this.UsuarioForm.get('Email'); }
  get RolId() { return this.UsuarioForm.get('RolId'); }
  get UsuarioId() { return this.UsuarioForm.get('UsuarioId'); }
  get Password() { return this.UsuarioForm.get('Password'); }

  user_validation_messages = {
    'UsuarioId': [],
    'Password': [
      {
      type: 'required',
      message: 'El password es requerido'
    },
    {
      type: 'pattern',
      message: 'El password debe de tener mínimo 8 caracteres y máximo 15, contar con un digito, una letra mayúscula, una minúscula y no contar con espacios.'
    }
    ],
    'UsuarioNombre': [
      {
        type: 'required',
        message: 'El nombre es requerido'
      },
      {
        type: 'minlength',
        message: 'El nombre debe de contener mínimo 3 caracteres'
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
        message: 'El apellido paterno  debe de contener mínimo 3 caracteres'
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
        message: 'El apellido materno  debe de contener mínimo 3 caracteres'
      },
      {
        type: 'pattern',
        message: 'El apellido materno  debe de comenzar con mayúscula y contener solamente letras'
      }
    ],
    // 'Telephone': [
    //   {
    //     type: 'required',
    //     message: 'El teléfono es requerido'
    //   },
    //   {
    //     type: 'minlength',
    //     message: 'El teléfono debe de contener 10 numeros'
    //   },
    //   {
    //     type: 'pattern',
    //     message: 'El teléfono solamente debe contener números'
    //   }
    // ],
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
          Validators.pattern(this.regex)]),
      UsuarioNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.nombrePattern)
        ]),
      UsuarioApellidoP: new FormControl('',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.nombrePattern)
        ]),
      UsuarioApellidoM: new FormControl('',
        [Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.nombrePattern)
        ]),
      // Telephone: new FormControl('',
      //   [Validators.required,
      //   Validators.minLength(10),
      //   Validators.pattern(this.telephonePattern)
      //   ]),
      Email: new FormControl('',
        [Validators.required,
        Validators.pattern(this.emailPattern)
        ]),
      RolId: new FormControl('',
        []),
      Foto: new FormControl('',
        []),
    });
  }

  // private user: User;
  public imageSrc: string;

  ngOnInit() {

  }
  
  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  async readURL(event: any): Promise<void> {
   

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = e => this.imageSrc = reader.result.toString();

      reader.readAsDataURL(file);

      const id = Math.random().toString(36).substring(2);
      this.file = event.target.files[0];
      const filePath = 'uploads/profile_${id}';
    }
    // console.log(this.file);
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    this.file = e.target.files[0];
   
  }

  async onSaveUsuario(formUsuario): Promise<void> {
    // this.spinnerService.spinnerShow();
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      this.UsuarioForm.value.Password = this.cifrado.encrypt(this.UsuarioForm.value.Password);
      this.UsuarioForm.value.UsuarioId = 0;
      this.UsuarioForm.value.RolId = 2;
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
      } else {
        let response = await fetch('assets/user.png');
        let data = await response.blob();
        let metadata = {
          type: 'image/jpeg'
        };

        let fileDemo = new File([data], "test.jpg", metadata);

        let reader = new FileReader();
        reader.readAsDataURL(fileDemo);
        var image: any;

        reader.onload = () => {
          image = reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      setTimeout(() => {
          var buscaComa: number = image.indexOf(",") + 1;
          this.UsuarioForm.value.ImageBase64 = image.substr(buscaComa)
          this.UsuarioForm.value.UsuarioEstatusSesion = false;
        this.dataApi.Post('/Usuarios', this.UsuarioForm.value).subscribe(result => {
          this.toastr.success('Registro Exitoso.', 'Exito', {
            timeOut: 3000
          });
          // this.spinnerService.hideAll();
          this.cambiarEstatusSpinner(false);
          this.UsuarioForm.reset();
          this.router.navigate(['/user/login']);
        }, error => {
          this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
            timeOut: 3000
          });
            // this.spinnerService.hideAll();
            this.cambiarEstatusSpinner(false);
        });
      }, 400)
    } else {
      // this.spinnerService.hideAll();
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Errores en el formulario, revise la información ingresada.', 'Error', {
        timeOut: 3000
      });
    }
  }


  onLoginRedirect():void{
    this.router.navigate(['']);
  }
}
