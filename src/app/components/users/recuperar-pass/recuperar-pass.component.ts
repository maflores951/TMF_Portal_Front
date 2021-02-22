import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CifradoDatosService } from '../../../services/cifrado-datos.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})

@Injectable()

export class RecuperarPassComponent implements OnInit {

  public UsuarioForm: FormGroup;
  private emailPattern: any = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

  constructor(private router: Router, private dataApi: DataApiService, private cifrado: CifradoDatosService, private toastr: ToastrService, private spinner: SpinnerService ) {
    this.UsuarioForm = this.createForm();
  }



  get EmailLogin() { return this.UsuarioForm.get('EmailLogin'); }

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
    ]
  }

  createForm() {
    return new FormGroup({
      EmailLogin: new FormControl('',
        [Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.emailPattern)
        ]),
    });
  }

  ngOnInit() {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  RecuperaPass(): void {
    this.cambiarEstatusSpinner(true);
    if (this.UsuarioForm.valid) {
      
      this.dataApi.EnviarEmail(this.UsuarioForm.value.EmailLogin).subscribe(result => {
        if (result.exito === 1){
        this.cambiarEstatusSpinner(false);
        this.toastr.success('Se envio un link a su email para asignar un nuevo password.', 'Exito', {
          timeOut: 3000
        });
        this.onLoginRedirect();
      }else{
        this.cambiarEstatusSpinner(false);
        this.toastr.error('Problemas con el servidor por favor intente más tarde.', 'Error', {
          timeOut: 3000
        });
      }
      }, error => {
        // console.log(JSON.stringify(error));
        this.cambiarEstatusSpinner(false);
        this.toastr.error(error.error.error_description, 'Error', {
          timeOut: 3000
        });
        //alert(error.error.error_description);
        //console.error(error.error.error_description)
      });
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Error en el email, favor de verificar', 'Error');
      //alert("Ingrese los datos solicitados");
    }
  }

  onLoginRedirect(): void {
    this.router.navigate(['/user/login']);
  }

}
