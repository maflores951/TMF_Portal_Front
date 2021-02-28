import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelColumna } from 'src/app/models/Excel/ExcelColumna';
import { ExcelTipo } from 'src/app/models/Excel/ExcelTipo';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from 'src/app/models/Sua/configuracionSuaNivel';
import { SuaExcel } from 'src/app/models/Sua/SuaExcel';
import { ConfiguracionSuaService } from 'src/app/services/configuracion-sua.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfigSuaComponent } from '../../cruds/config-sua/config-sua.component';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';

@Component({
  selector: 'app-configuracion-sua',
  templateUrl: './configuracion-sua.component.html',
  styleUrls: ['./configuracion-sua.component.css']
})

export class ConfiguracionSuaComponent implements OnInit {
  constructor(public dataApi: DataApiService, private spinner: SpinnerService, public configuracionSuaService: ConfiguracionSuaService, private toastr: ToastrService) {
    this.configSuaForm = this.createFormSua();
    this.configSuaNivelForm = this.createFormNivel();
    this.suaExcelForm = this.createFormExcel();
    // console.log(this.dataApi.SelectedconfiguracionSua);
    // if (this.dataApi.SelectedconfiguracionSua){
    //   this.configuracionSuaNivel = this.dataApi.SelectedconfiguracionSua.configuracionSuaNivel;
    // } else{
    //   this.configuracionSuaNivel = [];
    // }
    this.suaExcel = [];

    this.getListExcelColumna()
  }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

  public configuracionSua: ConfiguracionSua;
  public configuracionSuaNivel: ConfiguracionSuaNivel[];
  public suaExcel: SuaExcel[];

  public periodoTipos: ExcelTipo[];

  public configSuaForm: FormGroup;

  public configSuaNivelForm: FormGroup;

  public suaExcelForm: FormGroup;

  public contadorExcel: number;

  public modelSuaExcel: SuaExcel;
  public modelSuaNivel: ConfiguracionSuaNivel;

  public excelList: ExcelColumna[];

  public excelListFiltro: ExcelColumna[];



  get configuracionSuaId() { return this.configSuaForm.get('configuracionSuaId'); }
  get confSuaNombre() { return this.configSuaForm.get('confSuaNombre'); }
  get confSuaNNombre() { return this.configSuaNivelForm.get('confSuaNNombre'); }
  get tipoPeriodoId() { return this.suaExcelForm.get('tipoPeriodoId'); }
  get excelColumnaId() { return this.suaExcelForm.get('excelColumnaId'); }

  public keyword = 'excelColumnaNombre';

  public excelTipos: ExcelTipo[] = [{ "excelTipoId": 1, "excelTipoNombre": "Sua" },
  { "excelTipoId": 2, "excelTipoNombre": "EMA" },
  { "excelTipoId": 3, "excelTipoNombre": "EBA" }];
  // cocheSelected: Coche;

  public data = [];

  // public  nrSelect = '{excelTipoId : 0, excelTipoNombre : "Selecciona un tipo de archivo"}';

  getListExcelColumna() {
    this.dataApi.GetList('/ExcelColumnas').subscribe(excelList => {
      console.log(" ***** " + JSON.stringify(excelList));
      this.excelListFiltro = excelList;
      this.excelList = excelList;
      this.capturar();

      // console.log("Entra parametros " + this.parametros[0].parametroClave);
    }, error => console.error(error));
  }

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
        message: 'El nombre del nivel es requerido'
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

  createFormSua() {
    return new FormGroup({
      confSuaNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(4)
        ]),
      configuracionSuaId: new FormControl('',)
    });
  }

  createFormNivel() {
    return new FormGroup({
      confSuaNNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ])
    });
  }

  createFormExcel() {
    return new FormGroup({
      tipoPeriodoId: new FormControl('',
        [Validators.required]),
      excelColumnaId: new FormControl('',
        [Validators.required]),
      configuracionSuaId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.dataApi.cargarModalConfObservable.subscribe(response => {
      // console.log(JSON.stringify(response));
      this.configuracionSuaNivel = response;
    });

    this.opcionSeleccionado = this.excelTipos[0];
    // this.opcionSeleccionado = new ExcelTipo;
    // this.periodoTipos.push({excelTipoId:1,excelTipoNombre:"Sua",excelTipoPeriodo:1});
    // this.periodoTipos.push({excelTipoId:2,excelTipoNombre:"EMA",excelTipoPeriodo:2});
    // this.periodoTipos.push({excelTipoId:3,excelTipoNombre:"EBA",excelTipoPeriodo:1});
  }

  public opcionSeleccionado: ExcelTipo;
  public ngExcelColumna: string;


  capturar() {
    // console.log(JSON.stringify(this.ngExcelColumna) + ' *****');
    // console.log(JSON.stringify(this.opcionSeleccionado.excelTipoId) + "++++++");
    // console.log(JSON.stringify(this.excelList)+ " ****"); 
    // let colombianos = personas.filter(persona => persona.pais === 'Colombia');
    this.excelList = this.excelListFiltro.filter(excelColumna => {
      // console.log(JSON.stringify(excelColumna));
      if (excelColumna.excelTipoId === this.opcionSeleccionado.excelTipoId) {
        // filtroExcel.push(excelColumna);
        return excelColumna;
      }

    });

    this.ngExcelColumna = "";
    //  console.log(JSON.stringify(this.opcionSeleccionado));
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  // selectEvent(event) {
  //   console.log(event.excelColumnaId);
  //    this.suaExcelForm.value.excelColumnaId = event.excelColumnaId;
  // }

  //Se agrega el primer renglon del excel
  agregarLinea(formSua) {
    console.log(JSON.stringify(formSua.value.excelColumnaId.excelColumnaId));
    if (this.suaExcelForm.valid) {

      if (formSua.value.excelColumnaId.excelColumnaId >= 1) {


        this.modelSuaExcel = {
          tipoPeriodoId: parseInt(formSua.value.tipoPeriodoId.excelTipoId),
          excelColumnaId: parseInt(formSua.value.excelColumnaId.excelColumnaId),
          excelTipo: formSua.value.tipoPeriodoId,
          excelColumna: formSua.value.excelColumnaId
        }
        var bandera = false;
        if (this.suaExcel.length === 0) {
          this.suaExcel.push(this.modelSuaExcel);
        } else {
          for (var i = 0; i < this.suaExcel.length; i++) {
            if (this.suaExcel[i].tipoPeriodoId == parseInt(formSua.value.tipoPeriodoId.excelTipoId) &&
              this.suaExcel[i].excelColumnaId == parseInt(formSua.value.excelColumnaId.excelColumnaId)) {
              this.toastr.error('Error en los datos solicitados', 'Error', {
                timeOut: 3000
              });
              bandera = true;
              break;
            }
          }
          if (bandera == false) {
            this.suaExcel.push(this.modelSuaExcel);
          }
        }
      } else {
        this.toastr.error('La columna ingresada no esta registrada', 'Error', {
          timeOut: 3000
        });
        bandera = true;
      }
    } else {
      this.toastr.error('Ingrese "Tipo de archivo" y "Nombre de la columna"', 'Error', {
        timeOut: 3000
      });
      bandera = true;
    }
  }

  quitarLinea(id) {
    this.suaExcel.splice(id, 1); // 1 es la cantidad de elemento a eliminar
    //  console.log(id);
    // this.suaExcel
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  limpiar() {
    this.suaExcel = [];
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  agregarNivel(formSua) {
    var bandera = false;
    var suaExcelNivel = this.suaExcel;
    // console.log(this.configSuaNivelForm.valid);
    // console.log(JSON.stringify(this.configSuaNivelForm.value));
    this.modelSuaNivel = {
      confSuaNNombre: formSua.value.confSuaNNombre,
      suaExcel: suaExcelNivel
    }
    if (this.configSuaNivelForm.valid) {
      if (this.configuracionSuaNivel.length <= 0) {
        if (this.suaExcel.length > 0) {

          this.configuracionSuaNivel.push(this.modelSuaNivel);
          this.suaExcel = [];
          bandera = true;
        } else {
          this.toastr.error('Debe de agregar filas antes', 'Error', {
            timeOut: 3000
          });
          bandera = true;
        }
      } else {
        for (var i = 0; i < this.configuracionSuaNivel.length; i++) {
          if (this.configuracionSuaNivel[i].confSuaNNombre == formSua.value.confSuaNNombre) {
            this.toastr.error('Error en los datos solicitados', 'Error', {
              timeOut: 3000
            });
            bandera = true;
            break;
          }
        }
        if (bandera == false) {
          this.configuracionSuaNivel.push(this.modelSuaNivel);
          this.suaExcel = [];
        }
      }
    } else {
      this.toastr.error('El nombre del nivel no debe de estar vacio y debe de tener minimo 4 caracteres', 'Error', {
        timeOut: 3000
      });
      bandera = true;
    }


    // this.configuracionSuaNivel.push(this.modelSuaNivel);
    // this.suaExcel = [];

    // var suaExcelNivel = this.suaExcel;
    // console.log(JSON.stringify(this.suaExcel));

    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }

  quitarNivel(id) {
    this.configuracionSuaNivel.splice(id, 1); // 1 es la cantidad de elemento a eliminar
    //  console.log(id);
    // this.suaExcel
    // this.configuracionSuaNivelC.push(this.configuracionForm.value);
  }


  guardarConfiguracion(formSua, formSuaNivel, formSuaExcel) {
    console.log(JSON.stringify(this.configSuaForm.value));
    console.log(this.configSuaForm.valid);
    this.cambiarEstatusSpinner(true);
    // var confSuaNombre = formSua.value.confSuaNombre;
    if (this.configSuaForm.valid) {
      if (this.configuracionSuaNivel.length > 0) {
        if (this.dataApi.SelectedconfiguracionSua.configuracionSuaId >= 0) {
          this.configuracionSua = {
            configuracionSuaId: this.dataApi.SelectedconfiguracionSua.configuracionSuaId,
            confSuaNombre: formSua.value.confSuaNombre,
            confSuaEstatus: false,
            configuracionSuaNivel: this.configuracionSuaNivel
          }
          //  console.log(JSON.stringify(this.configuracionSua));
          // this.dataApi.Put('/ConfiguracionSuas', this.configuracionSua.configuracionSuaId, this.configuracionSua);
          this.dataApi.Post('/ConfiguracionSuas', this.configuracionSua).subscribe(response => {
            console.log(JSON.stringify(response) + '*********');

            // this.configuracionSuaNivel = response;
            this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
              if (response.exito === 1) {
                this.Cerrar(formSua, formSuaNivel, formSuaExcel);
                this.cambiarEstatusSpinner(false);
              } else {
                this.toastr.error('Error en el servidor intentelo más tarde', 'Error', {
                  timeOut: 3000
                });
              }
            });
          });
        } else {
          this.configuracionSua = {
            confSuaNombre: formSua.value.confSuaNombre,
            confSuaEstatus: false,
            configuracionSuaNivel: this.configuracionSuaNivel
          }
          //  console.log(JSON.stringify(this.configuracionSua));
          this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
            if (response.exito === 1) {
              this.Cerrar(formSua, formSuaNivel, formSuaExcel);
              this.cambiarEstatusSpinner(false);
            } else {
              this.toastr.error('Error en el servidor intentelo más tarde', 'Error', {
                timeOut: 3000
              });
            }
          });
        }
      } else {
        this.cambiarEstatusSpinner(false);
        this.toastr.error('Debe de agregar un nivel para poder continuar', 'Error', {
          timeOut: 3000
        });
      }

    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('El nombre de configuración es incorrecto', 'Error', {
        timeOut: 3000
      });
    }
  }

  // onSaveSUA(formParametro): void {
  //   this.cambiarEstatusSpinner(true);
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

  // }

  CerrarMSua(formSua, formSuaNivel, formSuaExcel): void {
    this.configuracionSuaNivel = [];
    formSua.resetForm();
    formSuaNivel.resetForm();
    formSuaExcel.resetForm();
  }

  Cerrar(formSua, formSuaNivel, formSuaExcel) {
    setTimeout(() => {
      this.cambiarEstatusSpinner(false);
      formSua.resetForm();
      formSuaNivel.resetForm();
      formSuaExcel.resetForm();
      this.suaExcelForm.reset();
      this.configSuaForm.reset();
      this.configSuaNivelForm.reset();
      ConfigSuaComponent.updateConfigSua.next(true);
      NavbarComponent.updateUserStatus.next(true);
      this.btnClose.nativeElement.click();
    }, 600)
  }
}