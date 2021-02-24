import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from 'src/app/models/Sua/configuracionSuaNivel';
import { SuaExcel } from 'src/app/models/Sua/SuaExcel';
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
    this.configuracionSuaNivel = [];
    this.suaExcel = [];
  }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public configuracionSua : ConfiguracionSua;
  public configuracionSuaNivel: ConfiguracionSuaNivel[];
  public suaExcel: SuaExcel[];

  public UsuarioForm: FormGroup;

  get confSuaNombre() { return this.UsuarioForm.get('confSuaNombre'); }
  get confSuaNNombre() { return this.UsuarioForm.get('confSuaNNombre'); }
  get tipoPeriodoId() { return this.UsuarioForm.get('tipoPeriodoId'); }
  get excelColumnaId() { return this.UsuarioForm.get('excelColumnaId'); }

  user_validation_messages = {
    'confSuaNombre': [
      {
        type: 'required',
        message: 'El nombre del de la configuración es requerido'
      },
      {
        type: 'minlength',
        message: 'El nombre de la configuración debe de contener mínimo 4 caracteres'
      }
    ],
    'confSuaNNombre': [
      {
        type: 'required',
        message: 'El nombre de la columna es requerido'
      },
      {
        type: 'minlength',
        message: 'La nombre de la columna debe de contener mínimo 4 caracteres'
      }
    ],
    'tipoPeriodoId': [
      {
        type: 'required',
        message: 'El tipo de periodo es requerido'
      }
    ],
    'excelColumnaId': [
      {
        type: 'required',
        message: 'La columna es requerida'
      }
    ]
  }

  createForm() {
    return new FormGroup({
      confSuaNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(4)
        ]),
      confSuaNNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ]),
      tipoPeriodoId: new FormControl('',
        [Validators.required]),
      excelColumnaId: new FormControl('',
        [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  agregarLinea(formSua){
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  quitarLinea(formSua){
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  limpiar(formSua){
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  agregarNivel(formSua){
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }


  guardarConfiguracion(formSua){
    // this.configuracionSuaNivel.configuracionSuaNivelC = this.configuracionSuaNivelC;
    // this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
    //   if (response.exito === 1){
    //     console.log("Entra");
    //   }
    // });
  }

  onSaveSUA(formParametro): void {
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