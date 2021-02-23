import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from 'src/app/models/Sua/configuracionSuaNivel';
import { ConfiguracionSuaNivelC } from 'src/app/models/Sua/configuracionSuaNivelC';
import { ConfiguracionSuaService } from 'src/app/services/configuracion-sua.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-configuracion-sua',
  templateUrl: './configuracion-sua.component.html',
  styleUrls: ['./configuracion-sua.component.css']
})

export class ConfiguracionSuaComponent implements OnInit {
  constructor( public dataApi: DataApiService, private spinner: SpinnerService) 
  {
    this.configuracionSuaNivelC = [];
  }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public configuracionSua : ConfiguracionSua;
  public configuracionSuaNivel: ConfiguracionSuaNivel;
  public configuracionSuaNivelC : ConfiguracionSuaNivelC[];

  public UsuarioForm: FormGroup;

  // get ParametroId() { return this.UsuarioForm.get('ParametroId'); }
  // get ParametroNombre() { return this.UsuarioForm.get('ParametroNombre'); }
  // get ParametroClave() { return this.UsuarioForm.get('ParametroClave'); }
  // get ParametroDescripcion() { return this.UsuarioForm.get('ParametroDescripcion'); }
  // get ParametroValorInicial() { return this.UsuarioForm.get('ParametroValorInicial'); }
  // get ParametroValorFinal() { return this.UsuarioForm.get('ParametroValorFinal'); }

  // user_validation_messages = {
  //   'ParametroNombre': [
  //     {
  //       type: 'required',
  //       message: 'El nombre del parametro es requerido'
  //     },
  //     {
  //       type: 'minlength',
  //       message: 'El nombre del parametro debe de contener mínimo 4 caracteres'
  //     }
  //   ],
  //   'ParametroClave': [
  //     {
  //       type: 'required',
  //       message: 'La clave del parametro es requerida'
  //     },
  //     {
  //       type: 'minlength',
  //       message: 'La clave del parametro debe de contener 6 caracteres'
  //     }
  //   ]
  // }

  // createForm() {
  //   return new FormGroup({
  //     ParametroNombre: new FormControl('',
  //       [Validators.required,
  //       Validators.minLength(4)
  //       ]),
  //     ParametroClave: new FormControl('',
  //       [Validators.required,
  //       Validators.minLength(6)
  //       ]),
  //     ParametroDescripcion: new FormControl('',
  //       []),
  //     ParametroValorInicial: new FormControl('',
  //       []),
  //     ParametroValorFinal: new FormControl('',
  //       []),
  //     ParametroId: new FormControl('',
  //       []),
  //   });
  // }

  ngOnInit(): void {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  agregarLinea(){
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  guardarConfiguracion(){
    // this.configuracionSuaNivel.configuracionSuaNivelC = this.configuracionSuaNivelC;
    // this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
    //   if (response.exito === 1){
    //     console.log("Entra");
    //   }
    // });
  }

  onSaveParametro(formParametro): void {
    this.cambiarEstatusSpinner(true);
    // if (this.UsuarioForm.valid) {
    //   if (this.UsuarioForm.value.ParametroId == null) {
    //     this.UsuarioForm.value.ParametroId = 0;
    //     this.UsuarioForm.value.ParametroEstatusDelete = false;
    //     this.dataApi.Post('/Parametros', this.UsuarioForm.value).subscribe(result => {
    //       this.cambiarEstatusSpinner(false);
    //       alert("Registro exitoso");
    //     }, error => {
    //       this.cambiarEstatusSpinner(false);
    //       alert("Errores en el servidor intente más tarde");
    //     });
    //   } else {
        
    //     this.parametro = this.UsuarioForm.value;
    //     this.UsuarioForm.value.ParametroEstatusDelete = false;
    //     this.dataApi.Put('/Parametros', this.UsuarioForm.value.ParametroId, this.parametro);
    //   }
    //   setTimeout(() => {
    //   this.cambiarEstatusSpinner(false);
    //   formParametro.resetForm();
    //   ParametrosComponent.updateParametros.next(true);
    //   this.btnClose.nativeElement.click();
    // }, 600)
    // } else {
    //   this.cambiarEstatusSpinner(false);
    //   alert("Errores en el formulario, revise la información ingresada");
    // }

  }

  CerrarMSua(formSUA): void {
    formSUA.resetForm();
  }

}