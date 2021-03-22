import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoColumna } from 'src/app/models/Empleado/EmpleadoColumna';
import { ExcelColumna } from 'src/app/models/Excel/ExcelColumna';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-excel',
  templateUrl: './cargar-excel.component.html',
  styleUrls: ['./cargar-excel.component.css']
})



export class CargarExcelComponent implements OnInit {

  //Variables para limpiar los archivos
  @ViewChild('myInputTem')
  myInputTem: ElementRef;
  @ViewChild('myInputSua')
  myInputSua: ElementRef;
  @ViewChild('myInputEma')
  myInputEma: ElementRef;

  public usuario: Usuario;

  constructor(public dataApi: DataApiService, private toastr: ToastrService, private spinner: SpinnerService, private apiAuthService: AuthUserService) {
    this.empleadoColumnas = [];
    this.usuario = this.apiAuthService.usuarioData;
  }

  ngOnInit(): void {
  }

  public configuracionSuas: ConfiguracionSua[];

  public configuracionSua: ConfiguracionSua;

  public willDownload = false;

  //Variables para almacenar las columnas 
  public excelColumnas: ExcelColumna[];

  //Lista de los tipos de periodos
  public tipoPeriodos = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
  { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Inicio del filtro
  public selectPeriodo = this.tipoPeriodos[0];

  //Lista de meses
  public meses = [{ "mesId": 1, "mesNombre": "Enero" },
  { "mesId": 2, "mesNombre": "Febrero" },
  { "mesId": 3, "mesNombre": "Marzo" },
  { "mesId": 4, "mesNombre": "Abril" },
  { "mesId": 5, "mesNombre": "Mayo" },
  { "mesId": 6, "mesNombre": "Junio" },
  { "mesId": 7, "mesNombre": "Julio" },
  { "mesId": 8, "mesNombre": "Agosto" },
  { "mesId": 9, "mesNombre": "Septiembre" },
  { "mesId": 10, "mesNombre": "Octubre" },
  { "mesId": 11, "mesNombre": "Noviembre" },
  { "mesId": 12, "mesNombre": "Diciembre" },
  ];

  //Inicio del filtro del mes
  public selectMes = this.meses[0];

  //Se recuperan los años con respecto al año actual
  public anios = this.recuperaAnios();

  public selectAnio = this.anios[0];

  public recuperaAnios() {
    var selectAnio = [];
    var anio = new Date().getFullYear();
    for (let index = 1; index < 5; index++) {
      var itemAnio = {
        anioId: anio,
        anioValor: anio
      }
      anio++
      selectAnio.push(itemAnio);
    }
    return selectAnio;
  };

  //Variables para indicar en donde comienzan los registros
  public indexTemplate: number;
  public indexSua: number;
  public indexEma: number;

  //Al cambiar el tipo de periodo se reinicia todo ya que por esta variable se determina lo que se ha cargado
  public tipoPeriodo() {
    this.myInputTem.nativeElement.value = '';
    this.myInputSua.nativeElement.value = '';
    this.myInputEma.nativeElement.value = '';
    this.temporalJson = [];
    this.suaJson = [];
    this.emaJson = [];
    this.empleadoColumnas = [];
    this.excelTipoIdSua = 0;
    this.excelTipoIdTemplate = 0;
    this.excelTipoIdEma = 0;
  };

  //Variables donde se almacenan los registros de los excel como JSONs
  public data: Object;
  public temporalJson = [];
  public suaJson = [];
  public emaJson = [];

  public excelTipoIdTemplate: number;
  public excelTipoIdSua: number;
  public excelTipoIdEma: number;

  //Cuando son más de una pestaña se tiene que modificar el nombre para poder leer el JSON
  public modificaEncabezado(dataString) {
    var encabezadoInicio = dataString.indexOf('"', 2);
    var encabezadoFin = encabezadoInicio - 2;
    var r = dataString.substr(2, encabezadoFin);
    var p = JSON.parse(dataString.replace(r, 'Sua'));
    return p;
  }

  //Se carga el archivo temporal
  public CargarTem(ev) {
    let workBook = null;
    let jsonData = null;
    let jsonDataV = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      var first_sheet_name = workBook.SheetNames[0];
      var worksheet = workBook.Sheets[first_sheet_name];

      jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.temporalJson = jsonData;

      //Se determina si es mensual o bimestral
      if (this.selectPeriodo.tipoPeriodoId === 1) {
        this.excelTipoIdTemplate = 2;
        this.ValidarArregloColumnas(jsonData, 2);
      } else {
        this.excelTipoIdTemplate = 3;
        this.ValidarArregloColumnas(jsonData, 3);
      }
    }
    reader.readAsBinaryString(file);
  }

  //Se carga el archivo SUA
  public CargarExcelSua(ev) {
    let workBook = null;
    let jsonData = null;
    let jsonDataV = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      var first_sheet_name = workBook.SheetNames[3];

      //Se valida si el archivo es correcto
      if (first_sheet_name === undefined) {
        this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
          timeOut: 3000
        });
        this.myInputSua.nativeElement.value = '';
        this.suaJson = [];
      } else {
        var worksheet = workBook.Sheets[first_sheet_name];
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.suaJson = jsonData;
        this.excelTipoIdSua = 4;
        this.ValidarArregloColumnas(jsonData, 4);
      }
    }
    reader.readAsBinaryString(file);
  }

  //Se carga el archivo EMA
  public CargarEMA(ev) {
    let workBook = null;
    let jsonData = null;
    let jsonDataV = null;
    const reader = new FileReader();
    const file = ev.target.files[0];

    if (this.selectPeriodo.tipoPeriodoId === 1) {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });

        var first_sheet_name = workBook.SheetNames[1];

        var worksheet = workBook.Sheets[first_sheet_name];
        if (first_sheet_name === undefined) {
          this.toastr.error('El archivo "EMA" debe de comensar con la columna "NSS"', 'Error', {
            timeOut: 3000
          });
          this.myInputEma.nativeElement.value = '';
          this.emaJson = [];
        } else {
          var worksheet = workBook.Sheets[first_sheet_name];
          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.emaJson = jsonData;
          this.excelTipoIdEma = 5;
          this.ValidarArregloColumnas(jsonData, 5);
        }
      }
      reader.readAsBinaryString(file);
    } else {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });

        var first_sheet_name = workBook.SheetNames[2];

        var worksheet = workBook.Sheets[first_sheet_name];
        var worksheet = workBook.Sheets[first_sheet_name];
        if (first_sheet_name === undefined) {
          this.toastr.error('El archivo "EBA" debe de comensar con la columna "NSS"', 'Error', {
            timeOut: 3000
          });
          this.myInputEma.nativeElement.value = '';
          this.emaJson = [];
        } else {
          var worksheet = workBook.Sheets[first_sheet_name];
          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.emaJson = jsonData;
          this.excelTipoIdEma = 6;
          this.ValidarArregloColumnas(jsonData, 6);
        }
      }
      reader.readAsBinaryString(file);
    }
  }

  // //Función para descargar un archivo
  // setDownload(data) {
  //   this.willDownload = true;
  //   setTimeout(() => {
  //     const el = document.querySelector("#download");
  //     el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
  //     el.setAttribute("download", 'xlsxtojson.json');
  //   }, 1000)
  // }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  public empleadoColumnas: EmpleadoColumna[];

  //Función para completar el numero de empleado
  public PadLeft(value, length) {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) :
      value;
  }

  //Se crear el arreglo con la información de todos los empleados
  public CrearEmpleadoColumnas(indexInicio, json, columnaNombres, excelTipoId) {
    for (let index = indexInicio + 1; index < json.length; index++) {
      const element = json[index];
      if (element.length > 0) {
        for (let indexValor = 0; indexValor < columnaNombres.length; indexValor++) {
          if (element[1] != undefined) {
            if (element[1] != "") {
              if (indexValor == 0) {
                var valor = this.PadLeft(element[0].toString(), 11);
              } else {
                var valor = element[indexValor];
              }
              var empleadoColumna: EmpleadoColumna = {
                empleadoColumnaMes: this.selectMes.mesId,
                empleadoColumnaAnio: this.selectAnio.anioId,
                empleadoColumnaValor: valor,//element[indexValor],
                excelColumnaNombre: columnaNombres[indexValor],
                usuarioId: this.usuario.usuarioId,
                empleadoColumnaNo: this.PadLeft(element[0].toString(), 11),
                excelTipoId: excelTipoId
              }
              this.empleadoColumnas.push(empleadoColumna);
            }

          }
        }
      }
    }
  }

  public CargarDatos() {
    this.cambiarEstatusSpinner(true);
    if (this.temporalJson.length > 0) {
      if (this.suaJson.length > 0) {
        if (this.emaJson.length > 0) {
          this.toastr.success('Los archivos excel son correctos y contienen información', 'Exito', {
            timeOut: 3000
          });
          if (this.selectPeriodo.tipoPeriodoId == 1) {
            var validaEmpleadoColumna: EmpleadoColumna = {
              empleadoColumnaMes: this.selectMes.mesId,
              empleadoColumnaAnio: this.selectAnio.anioId,
              usuarioId: this.usuario.usuarioId,
              excelTipoId: 2
            }
          } else {
            var validaEmpleadoColumna: EmpleadoColumna = {
              empleadoColumnaMes: this.selectMes.mesId,
              empleadoColumnaAnio: this.selectAnio.anioId,
              usuarioId: this.usuario.usuarioId,
              excelTipoId: 3
            }
          }
          //Se raliza la actualizaión en la base de datos
          this.dataApi.Post('/EmpleadoColumnas/ValidarColumnas', validaEmpleadoColumna).subscribe(result => {
            if (result.exito == 0) {
              this.CrearEmpleadoColumnas(this.indexTemplate, this.temporalJson, this.columnaNombresTemplate, this.excelTipoIdTemplate);
              this.CrearEmpleadoColumnas(this.indexSua, this.suaJson, this.columnaNombresSua, this.excelTipoIdSua);
              this.CrearEmpleadoColumnas(this.indexEma, this.emaJson, this.columnaNombresEma, this.excelTipoIdEma);
              var tiempo = 10000;
              setTimeout(() => {

                this.dataApi.Post('/EmpleadoColumnas', this.empleadoColumnas).subscribe(result => {
                  this.cambiarEstatusSpinner(false);
                  this.myInputTem.nativeElement.value = '';
                  this.myInputSua.nativeElement.value = '';
                  this.myInputEma.nativeElement.value = '';
                  this.temporalJson = [];
                  this.suaJson = [];
                  this.emaJson = [];
                  this.empleadoColumnas = [];
                  this.excelTipoIdSua = 0;
                  this.excelTipoIdTemplate = 0;
                  this.excelTipoIdEma = 0;
                  this.toastr.success('Datos registrados con exito', 'Exito', {
                    timeOut: 3000
                  });
                }, error => {
                  this.cambiarEstatusSpinner(false);
                  this.toastr.error('Error en los datos solicitados', 'Error', {
                    timeOut: 3000
                  });
                });
              }, 5000);
            } else {
              Swal.fire({
                title: 'Ya existe registro de columnas para este periodo, si continua las columnas se actualizarán, ¿Quiere continuar?',
                showDenyButton: true,
                confirmButtonText: `Continuar`,
                denyButtonText: `Cancelar`,
                icon: 'question'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.CrearEmpleadoColumnas(this.indexTemplate, this.temporalJson, this.columnaNombresTemplate, this.excelTipoIdTemplate);
                  this.CrearEmpleadoColumnas(this.indexSua, this.suaJson, this.columnaNombresSua, this.excelTipoIdSua);
                  this.CrearEmpleadoColumnas(this.indexEma, this.emaJson, this.columnaNombresEma, this.excelTipoIdEma);
                  var tiempo = 10000;
                  setTimeout(() => {

                    this.dataApi.Post('/EmpleadoColumnas', this.empleadoColumnas).subscribe(result => {
                      this.cambiarEstatusSpinner(false);
                      this.myInputTem.nativeElement.value = '';
                      this.myInputSua.nativeElement.value = '';
                      this.myInputEma.nativeElement.value = '';
                      this.temporalJson = [];
                      this.suaJson = [];
                      this.emaJson = [];
                      this.empleadoColumnas = [];
                      this.excelTipoIdSua = 0;
                      this.excelTipoIdTemplate = 0;
                      this.excelTipoIdEma = 0;
                      this.toastr.success('Datos registrados con exito', 'Exito', {
                        timeOut: 3000
                      });
                    }, error => {
                      this.cambiarEstatusSpinner(false);
                      this.toastr.error('Error en los datos solicitados', 'Error', {
                        timeOut: 3000
                      });
                    });
                  }, 5000);
                } else if (result.isDenied) {
                  Swal.fire('Carga de información cancelada', '', 'error')
                  this.cambiarEstatusSpinner(false);
                }
              })

            }
          });
        } else {
          this.cambiarEstatusSpinner(false);
          this.toastr.error('Debe de cargar el excel "EMA o EBA"', 'Error', {
            timeOut: 3000
          });
        }
      } else {
        this.cambiarEstatusSpinner(false);
        this.toastr.error('Debe de cargar el excel "SUA"', 'Error', {
          timeOut: 3000
        });
      }
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Debe de cargar el excel "Template"', 'Error', {
        timeOut: 3000
      });
    }
  }

//Función para cargar los nombres de las columnas por cada excel
  public CargarColumnas(columnas, excelTipo) {
    var excelColumna = {};
    for (let index = 0; index < columnas.length; index++) {
      const element = columnas[index];
      excelColumna = {
        excelColumnaNombre: element,
        excelTipoId: excelTipo,
        excelPosicion: index
      }
      this.dataApi.Post('/ExcelColumnas', excelColumna).subscribe(result => {
        this.toastr.success('Datos registrados con exito', 'Exito', {
          timeOut: 3000
        });
      }, error => {
        this.toastr.error('Error en los datos solicitados', 'Error', {
          timeOut: 3000
        });
      });
    }

  }

  //Variables para almacenar las columnas
  public columnaNombresTemplate = [];
  public columnaNombresSua = [];
  public columnaNombresEma = [];

//Se valida que las columnas en los excel sean correctas 
  public ValidarArregloColumnas(jsonExcel, excelTipo) {
    for (let index = 0; index < jsonExcel.length; index++) {
      const element = jsonExcel[index];
      if (excelTipo == 4) {
        if (element.length > 7) {
          if (element[0] == "Número de Afiliación") {
            this.indexSua = index;
            this.columnaNombresSua = element;
            break;
          } else {
            this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
              timeOut: 3000
            });
            this.myInputSua.nativeElement.value = '';
            this.suaJson = [];
          }
        }
      } else {
        if (element.length > 1) {
          if (excelTipo == 2 || excelTipo == 3) {
            if (element[0] == "No. S.S.") {
              this.indexTemplate = index;
              this.columnaNombresTemplate = element;
              break;
            } else {
              this.toastr.error('El archivo "Template" debe de comensar con la columna "No. S.S."', 'Error', {
                timeOut: 3000
              });
              this.myInputTem.nativeElement.value = '';
              this.temporalJson = [];
              break;
            }
          } else {
            if (element[0] == "NSS") {
              this.indexEma = index;
              this.columnaNombresEma = element;
              break;
            } else {
              this.toastr.error('El archivo "EMA" o "EBA" debe de comensar con la columna "NSS"', 'Error', {
                timeOut: 3000
              });
              this.myInputEma.nativeElement.value = '';
              this.emaJson = [];
              break;
            }
          }
        }
      }
    }
  }

  //Se agregan las columnas del Template en la base de datos
  public CargarColumnasTem() {
    if (this.temporalJson.length > 0) {
      if (this.selectPeriodo.tipoPeriodoId === 1) {
        Swal.fire({
          title: 'Cargara las columnas del template mensual, ¿Quiere continuar?',
          showDenyButton: true,
          confirmButtonText: `Continuar`,
          denyButtonText: `Cancelar`,
          icon: 'question'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CargarArregloColumnas(this.temporalJson, 2);
          } else if (result.isDenied) {
          }
        })
      } else {
        Swal.fire({
          title: 'Cargara las columnas del template bimestral, ¿Quiere continuar?',
          showDenyButton: true,
          confirmButtonText: `Continuar`,
          denyButtonText: `Cancelar`,
          icon: 'question'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CargarArregloColumnas(this.temporalJson, 3);
          } else if (result.isDenied) {
          }
        })
      }
    } else {
      this.toastr.error('Ingrese un archivo valido para poder cargar las columnas.', 'Error', {
        timeOut: 3000
      });
    }

  }

   //Se agregan las columnas del SUA en la base de datos
  public CargarColumnasSua() {
    if (this.suaJson.length > 0) {
      Swal.fire({
        title: 'Cargara las columnas del archivo SUA, ¿Quiere continuar?',
        showDenyButton: true,
        confirmButtonText: `Continuar`,
        denyButtonText: `Cancelar`,
        icon: 'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.CargarArregloColumnas(this.suaJson, 4);
        } else if (result.isDenied) {
        }
      })

    } else {
      this.toastr.error('Ingrese un archivo valido para poder cargar las columnas.', 'Error', {
        timeOut: 3000
      });
    }

  }

   //Se agregan las columnas del EMA en la base de datos
  public CargarColumnasEma() {
    if (this.emaJson.length > 0) {
      if (this.selectPeriodo.tipoPeriodoId === 1) {
        Swal.fire({
          title: 'Cargara las columnas del archivo EMA, ¿Quiere continuar?',
          showDenyButton: true,
          confirmButtonText: `Continuar`,
          denyButtonText: `Cancelar`,
          icon: 'question'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CargarArregloColumnas(this.emaJson, 5);
          } else if (result.isDenied) {
          }
        })
      } else {
        Swal.fire({
          title: 'Cargara las columnas del archivo EBA, ¿Quiere continuar?',
          showDenyButton: true,
          confirmButtonText: `Continuar`,
          denyButtonText: `Cancelar`,
          icon: 'question'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CargarArregloColumnas(this.emaJson, 6);
          } else if (result.isDenied) {
          }
        })

      }
    } else {
      this.toastr.error('Ingrese un archivo valido para poder cargar las columnas.', 'Error', {
        timeOut: 3000
      });
    }

  }

  //Se validan los nombres de las columnas del excel
  public CargarArregloColumnas(jsonExcel, excelTipo) {
    for (let index = 0; index < jsonExcel.length; index++) {
      const element = jsonExcel[index];
      if (excelTipo == 4) {
        if (element.length > 7) {
          if (element[0] == "Número de Afiliación") {
            this.CargarColumnas(element, excelTipo);
            break;
          } else {
            this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
              timeOut: 3000
            });
            this.myInputSua.nativeElement.value = '';
            this.suaJson = [];
          }
        }
      } else {
        if (element.length > 1) {
          if (excelTipo == 2 || excelTipo == 3) {
            if (element[0] == "No. S.S.") {
              this.CargarColumnas(element, excelTipo);
              break;
            } else {
              this.toastr.error('El archivo "Template" debe de comensar con la columna "No. S.S."', 'Error', {
                timeOut: 3000
              });
              this.myInputTem.nativeElement.value = '';
              this.temporalJson = [];
            }
          } else {
            if (element[0] == "NSS") {
              this.CargarColumnas(element, excelTipo);
              break;
            } else {
              this.toastr.error('El archivo "EMA" o "EBA" debe de comensar con la columna "NSS"', 'Error', {
                timeOut: 3000
              });
              this.myInputEma.nativeElement.value = '';
              this.emaJson = [];
            }
          }
          break;
        }
      }
    }
  }
}
