import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExcelColumna } from 'src/app/models/Excel/ExcelColumna';
import { ExcelTipo } from 'src/app/models/Excel/ExcelTipo';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { ConfiguracionSuaNivel } from 'src/app/models/Sua/configuracionSuaNivel';
import { SuaExcel } from 'src/app/models/Sua/SuaExcel';
import { TipoPeriodo } from 'src/app/models/TipoPeriodo';
import { ConfiguracionSuaService } from 'src/app/services/configuracion-sua.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { ConfigSuaComponent } from '../../cruds/config-sua/config-sua.component';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';


@Component({
  selector: 'app-configuracion-sua',
  templateUrl: './configuracion-sua.component.html',
  styleUrls: ['./configuracion-sua.component.css']
})

export class ConfiguracionSuaComponent implements OnInit {

  //Se crean la variables iniciales para validar los formulario y se recuperan las columnas de los excel
  constructor(public dataApi: DataApiService, private spinner: SpinnerService, public configuracionSuaService: ConfiguracionSuaService, private toastr: ToastrService) {
    this.configSuaForm = this.createFormSua();
    this.configSuaNivelForm = this.createFormNivel();
    this.suaExcelForm = this.createFormExcel();
    this.suaExcel = [];

    this.getListExcelColumna()
  }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;

 
  //Variables necesarias para cargar información
  public configuracionSua: ConfiguracionSua;
  public configuracionSuaNivel: ConfiguracionSuaNivel[];
  public suaExcel: SuaExcel[];

  // public periodoTipos: ExcelTipo[];

  public configSuaForm: FormGroup;

  public configSuaNivelForm: FormGroup;

  public suaExcelForm: FormGroup;

  public contadorExcel: number;

  public modelSuaExcel: SuaExcel;
  public modelSuaNivel: ConfiguracionSuaNivel;

  public excelList: ExcelColumna[];

  public excelListFiltro: ExcelColumna[];

  //Lista de los tipos de periodos
  public periodoTipos : TipoPeriodo[] = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
  { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }];

  //Inicio del filtro
  public selectPeriodo = this.periodoTipos[0];

  //Función para lansar el mensaje con las instrucciones para utilizar el sistema
public Ayuda(){
  Swal.fire({
    title: "Combinar columnas",
    html: "Para poder comparar un conjunto de columnas del mismo archivo, se deben agregar dentro del mismo nivel:<p>-Las columnas numéricas se suman y el resultado es el que se compara.</p>  <p>-Las columnas con caracteres se concatenan agregando un espacio entre cada palabra.</p> <p>-Para realizar una comparación especial se debe de seleccionar el tipo de archivo “Comparativo Especial” y seleccionar la columna que contenga el comparativo que necesitemos.</p>",
    confirmButtonText: `Salir`,
    icon: 'info'
  })
}

//Propiedades para validar los formularios reactivos 
  get configuracionSuaId() { return this.configSuaForm.get('configuracionSuaId'); }
  get periodoTipoId() { return this.configSuaForm.get('periodoTipoId'); }
  get confSuaNombre() { return this.configSuaForm.get('confSuaNombre'); }
  get confSuaNNombre() { return this.configSuaNivelForm.get('confSuaNNombre'); }
  get excelTipoId() { return this.suaExcelForm.get('excelTipoId'); }
  get excelColumnaId() { return this.suaExcelForm.get('excelColumnaId'); }

  //Arreglo con los tipos de excel mensual
  public excelTiposMensual: ExcelTipo[] = [{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
  { "excelTipoId": 2, "excelNombre": "Template", "excelTipoPeriodo" : 1 },
  { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
  { "excelTipoId": 5, "excelNombre": "EMA" , "excelTipoPeriodo" : 1}];

   //Arreglo con los tipos de excel bimestral
   public excelTiposBimestral: ExcelTipo[] = [{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
   { "excelTipoId": 3, "excelNombre": "Template bimestral" , "excelTipoPeriodo" : 2},
   { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
   { "excelTipoId": 6, "excelNombre": "EBA" , "excelTipoPeriodo" : 2}];

   public excelTipos : ExcelTipo[] = [{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
   { "excelTipoId": 2, "excelNombre": "Template", "excelTipoPeriodo" : 1 },
   { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
   { "excelTipoId": 5, "excelNombre": "EMA" , "excelTipoPeriodo" : 1}];

  public keyword = 'excelColumnaNombre';
  //Funcion que recupera  las columnas de los excel de forma ordenada
  getListExcelColumna() {
    this.dataApi.GetList('/ExcelColumnas').subscribe(excelList => {
      this.excelListFiltro = excelList.sort((a, b) => { if (a.excelColumnaNombre < b.excelColumnaNombre) {
        return -1;
      }
      if (a.excelColumnaNombre > b.excelColumnaNombre) {
        return 1;
      }
      // a debe ser igual b
      return 0;});
      this.excelList = excelList.sort((a, b) => { if (a.excelColumnaNombre < b.excelColumnaNombre) {
        return -1;
      }
      if (a.excelColumnaNombre > b.excelColumnaNombre) {
        return 1;
      }
      // a debe ser igual b
      return 0;});
      this.capturar();
    }, error => {
      console.error(error);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
  }

  //Mensaje de las validaciones del formulario reactivo
  user_validation_messages = {
    'confSuaNombre': [
      {
        type: 'required',
        message: 'El nombre del de la configuración es requerido'
      },
      {
        type: 'minlength',
        message: 'El nombre de la configuración debe de contener mínimo 3 caracteres'
      }
    ],
    'periodoTipoId': [
      {
        type: 'required',
        message: 'El tipo de periodo es requerido'
      }
    ],
    'confSuaNNombre': [
      {
        type: 'required',
        message: 'El nombre del nivel es requerido'
      },
      {
        type: 'minlength',
        message: 'La nombre de la columna debe de contener mínimo 3 caracteres'
      }
    ],
    'excelTipoId': [
      {
        type: 'required',
        message: 'El tipo de archivo es requerido'
      }
    ],
    'excelColumnaId': [
      {
        type: 'required',
        message: 'La columna es requerida'
      }
    ]
  }

  //Validaciones del formulario reactivo
  createFormSua() {
    return new FormGroup({
      confSuaNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(3)
        ]),
        periodoTipoId: new FormControl('',
        [Validators.required
        ]),
      configuracionSuaId: new FormControl('',)
    });
  }

  createFormNivel() {
    return new FormGroup({
      confSuaNNombre: new FormControl('',
        [Validators.required,
        Validators.minLength(3)
        ])
    });
  }

  createFormExcel() {
    return new FormGroup({
      excelTipoId: new FormControl('',
        [Validators.required]),
      excelColumnaId: new FormControl('',
        [Validators.required]),
      configuracionSuaId: new FormControl(''),
    });
  }

//Inicio de los filtros de busqueda y en caso de ser una actualización se recuperan los niveles
  ngOnInit(): void {
    this.dataApi.cargarModalConfObservable.subscribe(response => {
      //  console.log(JSON.stringify(response) + " *****");
      this.configuracionSuaNivel = response;
    });

    this.dataApi.cargarTipoExcelConfObservable.subscribe(response => {
      //  console.log(JSON.stringify(response) + " *****");
      this.excelTipos = response;
    });

    this.dataApi.cargarTipoPeriodoConfObservable.subscribe(response => {
      //  console.log(JSON.stringify(response) + " *****");
      this.periodoTipos = response;

      console.log("Entra **** " + this.dataApi.SelectedconfiguracionSua.configuracionSuaTipo);
      
      if(this.dataApi.SelectedconfiguracionSua.configuracionSuaTipo == 1){
        this.selectPeriodo =  this.periodoTipos[0];
      }else if(this.dataApi.SelectedconfiguracionSua.configuracionSuaTipo == 2){
        this.selectPeriodo =  this.periodoTipos[1];
      }else{
        this.selectPeriodo =  this.periodoTipos[0];
      }
    });

   
    // if (this.dataApi.SelectedconfiguracionSua.confSuaNombre)
    // this.selectPeriodo =  this.periodoTipos[0];
    this.opcionSeleccionado = this.excelTipos[0];
  }

  //Variables para asignar los filtros
  public opcionSeleccionado: ExcelTipo;
  public ngExcelColumna: string;
  public ngSuaNNombre: string;

//Función para filtrar las columnas segun el tipo de archivo seleccionado
  capturar() {
    this.excelList = this.excelListFiltro.filter(excelTipo => {
      if (excelTipo.excelTipoId === this.opcionSeleccionado.excelTipoId) {
        return excelTipo;
      }
    });

    this.ngExcelColumna = "";
  }

  //Función para determinar el tipo de comparativo
  tipoPeriodo() {
    if (this.selectPeriodo.tipoPeriodoId == 1){
      this.excelTipos = this.excelTiposMensual;
    }else{
      this.excelTipos = this.excelTiposBimestral;
    }

    this.suaExcelForm.reset();
    // this.configSuaForm.reset();
    this.configSuaNivelForm.reset();
    this.suaExcel = [];
    this.configuracionSuaNivel = [];
    this.ngSuaNNombre = "";
    this.confSuaNEstatus = false;
    this.confSuaNPosicion = 0;
    // this.ngExcelColumna = "";
  }

  //Función para utilizar el spinner de carga 
  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  //Función para agreger las lineas de cada nivel
  agregarLinea(formSua) {
    if (this.suaExcelForm.valid) {
      if (formSua.value.excelColumnaId.excelColumnaId >= 1) {
        this.modelSuaExcel = {
          ExcelTipoId: parseInt(formSua.value.excelTipoId.excelTipoId),
          excelColumnaId: parseInt(formSua.value.excelColumnaId.excelColumnaId),
          excelTipo: formSua.value.excelTipoId,
          excelColumna: formSua.value.excelColumnaId
        }
        var bandera = false;
        if (this.suaExcel.length === 0) {
          this.suaExcel.push(this.modelSuaExcel);
          this.ngExcelColumna = "";
        } else {
          for (var i = 0; i < this.suaExcel.length; i++) {
            // if (this.suaExcel[i].excelTipoId == parseInt(formSua.value.excelTipoId.excelTipoId) &&
              // this.suaExcel[i].excelColumnaId == parseInt(formSua.value.excelColumnaId.excelColumnaId)) {
                  if (this.suaExcel[i].excelColumnaId == parseInt(formSua.value.excelColumnaId.excelColumnaId)) {
              this.toastr.error('Esta columna ya fue registrada.', 'Error', {
                timeOut: 3000
              });
              bandera = true;
              break;
            }
          }
          if (bandera == false) {
            this.suaExcel.push(this.modelSuaExcel);
            this.ngExcelColumna = "";
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

  //Funcion para  eliminar filas de cada nivel
 public quitarLinea(id) {
    this.suaExcel.splice(id, 1); // 1 es la cantidad de elemento a eliminar
  }

//Variables para determinar si es un update o un insert
public confSuaNEstatus : boolean = false;
public confSuaNPosicion : number = 0; 

//Función para actualizar niveles
  actualzarNivel(nivelSua: ConfiguracionSuaNivel, id) {
    this.suaExcel = [];
    console.log("Entra "  + id);
    for (var i = 0; i < nivelSua.suaExcel.length; i++) {
        this.suaExcel.push( nivelSua.suaExcel[i]);
      }
      this.ngSuaNNombre = nivelSua.confSuaNNombre;
      this.confSuaNEstatus = true;
      this.confSuaNPosicion = id;
  }

  //Limpia un nivel y se prepara para un insert
  limpiar() {
    this.suaExcel = [];
    this.ngSuaNNombre = "";
    this.confSuaNEstatus = false;
    this.confSuaNPosicion = 0;
  }

  //Se agrega un nivel a la configuración
  agregarNivel(formSua) {
    var bandera = false;
    var suaExcelNivel = this.suaExcel;
    this.modelSuaNivel = {
      confSuaNNombre: formSua.value.confSuaNNombre,
      suaExcel: suaExcelNivel
    }

   
    if (this.configSuaNivelForm.valid) {
      if (this.configuracionSuaNivel.length <= 0) {
        if (this.suaExcel.length > 0) {

          this.configuracionSuaNivel.push(this.modelSuaNivel);
          this.suaExcel = [];
          this.ngSuaNNombre = "";
          bandera = true;
        } else {
          this.toastr.error('Debe de agregar filas antes', 'Error', {
            timeOut: 3000
          });
          bandera = true;
        }
      } else {
        if(this.confSuaNEstatus == true){
          this.configuracionSuaNivel.splice(this.confSuaNPosicion, 1);
          this.configuracionSuaNivel.splice(this.confSuaNPosicion, 0, this.modelSuaNivel);
          bandera = true;
          this.suaExcel = [];
          this.ngSuaNNombre = "";
          this.confSuaNEstatus = false;
          this.confSuaNPosicion = 0;
        }else{
        for (var i = 0; i < this.configuracionSuaNivel.length; i++) {
            if (this.configuracionSuaNivel[i].confSuaNNombre == formSua.value.confSuaNNombre) {
              this.toastr.error('El nombre de este nivel ya existe.', 'Error', {
                timeOut: 3000
              });
              bandera = true;
              break;
          }
        }
      }
        if (bandera == false) {
          this.configuracionSuaNivel.push(this.modelSuaNivel);
          this.suaExcel = [];
          this.ngSuaNNombre = "";
          this.confSuaNEstatus = false;
          this.confSuaNPosicion = 0;
        }
      }
    } else {
      this.toastr.error('El nombre del nivel no debe de estar vacio y debe de tener minimo 4 caracteres', 'Error', {
        timeOut: 3000
      });
      bandera = true;
    }
  }

  //Se elimina un nivel con todo y sus filas asignadas
  public quitarNivel(id) {
    this.configuracionSuaNivel.splice(id, 1); // 1 es la cantidad de elemento a eliminar
  }

//Se valida y guarda toda la configuración
  guardarConfiguracion(formSua, formSuaNivel, formSuaExcel) {
    console.log(JSON.stringify(this.configSuaForm.value));
    console.log(this.configSuaForm.valid);
    this.cambiarEstatusSpinner(true);
    if (this.configSuaForm.valid) {
      if (this.configuracionSuaNivel.length > 0) {
        if (this.dataApi.SelectedconfiguracionSua.configuracionSuaId >= 0) {
          this.configuracionSua = {
            configuracionSuaId: this.dataApi.SelectedconfiguracionSua.configuracionSuaId,
            confSuaNombre: formSua.value.confSuaNombre,
            confSuaEstatus: false,
            configuracionSuaNivel: this.configuracionSuaNivel,
            configuracionSuaTipo: this.selectPeriodo.tipoPeriodoId
          }
          this.dataApi.Post('/ConfiguracionSuas', this.configuracionSua).subscribe(response => {
            this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
              if (response.exito === 1) {
                this.Cerrar(formSua, formSuaNivel, formSuaExcel);
                this.cambiarEstatusSpinner(false);
              } else {
                this.cambiarEstatusSpinner(false); 
                this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
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
          this.configuracionSuaService.add(this.configuracionSua).subscribe(response => {
            if (response.exito === 1) {
              this.Cerrar(formSua, formSuaNivel, formSuaExcel);
              this.cambiarEstatusSpinner(false);
            } else {
              this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
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

  //Se cierra la ventana y se reinician las variables
  CerrarMSua(formSua, formSuaNivel, formSuaExcel): void {
    this.configuracionSuaNivel = [];
    formSua.resetForm();
    formSuaNivel.resetForm();
    formSuaExcel.resetForm();
    this.suaExcel = [];
    this.configuracionSuaNivel = [];
    this.ngSuaNNombre = "";
    this.confSuaNEstatus = false;
    this.confSuaNPosicion = 0;
    // this.excelTipos = this.excelTiposMensual;
  }

  //Se cierra la ventana y se actualiza el CRUD
  Cerrar(formSua, formSuaNivel, formSuaExcel) {
    setTimeout(() => {
      this.cambiarEstatusSpinner(false);
      formSua.resetForm();
      formSuaNivel.resetForm();
      formSuaExcel.resetForm();
      this.suaExcelForm.reset();
      this.configSuaForm.reset();
      this.configSuaNivelForm.reset();
      this.suaExcel = [];
      this.configuracionSuaNivel = [];
      this.ngSuaNNombre = "";
      this.confSuaNEstatus = false;
      this.confSuaNPosicion = 0;
      // this.excelTipos = this.excelTiposMensual;
      ConfigSuaComponent.updateConfigSua.next(true);
      NavbarComponent.updateUserStatus.next(true);
      this.btnClose.nativeElement.click();
    }, 600)
  }
}