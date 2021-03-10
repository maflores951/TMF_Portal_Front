import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoColumna } from 'src/app/models/Empleado/EmpleadoColumna';
import { ExcelColumna } from 'src/app/models/Excel/ExcelColumna';
import { JsonToExel } from 'src/app/models/Excel/JsonToExcel';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-excel',
  templateUrl: './cargar-excel.component.html',
  styleUrls: ['./cargar-excel.component.css']
})



export class CargarExcelComponent implements OnInit {

  @ViewChild('myInputTem')
  myInputTem: ElementRef;
  @ViewChild('myInputSua')
  myInputSua: ElementRef;
  @ViewChild('myInputEma')
  myInputEma: ElementRef;



  constructor(public dataApi: DataApiService, private toastr: ToastrService, private spinner: SpinnerService) {
    this.empleadoColumnas = [];
    this.getListConfiguracionSua()
  }

  ngOnInit(): void {
  }

  public configuracionSuas: ConfiguracionSua[];

  public configuracionSua: ConfiguracionSua;

  public getListConfiguracionSua() {
    this.dataApi.GetList('/ConfiguracionSuas').subscribe(confSuaList => {
      // console.log(" ***** " + JSON.stringify(excelList));
      this.configuracionSuas = confSuaList;
      this.configuracionSua = confSuaList[0];
      // this.excelList = confSuaList;
      // this.capturar();

      // console.log("Entra parametros " + this.parametros[0].parametroClave);
    }, error => console.error(error));
  }

  public name = 'This is XLSX TO JSON CONVERTER';
  public willDownload = false;

  //Variables para almacenar las columnas 
  public excelColumnas: ExcelColumna[];

  public tipoPeriodos = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
  { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  public selectPeriodo = this.tipoPeriodos[0];

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

  public selectMes = this.meses[0];

  public anios = this.recuperaAnios();

  public selectAnio = this.anios[0];

  public recuperaAnios() {
    var selectAnio = [];


    var anio = new Date().getFullYear();

    // var anioMenos = anio - 2;

    for (let index = 1; index < 5; index++) {
      var itemAnio = {
        anioId: index,
        anioValor: anio++
      }

      selectAnio.push(itemAnio);
    }

    return selectAnio;
  };

  public indexTemplate: number;
  public indexSua: number;
  public indexEma: number;
  // public mes() {

  // };

  // public anio() {

  // };

  // public tipoPeriodo() {

  // };
  // CargarExcelSua(event){
  //   let filesData = event.target.files;
  //   console.log(filesData[0]);
  // }

  public data: Object;
  public temporalJson = [];
  public suaJson = [];
  public emaJson = [];

  public excelTipoIdTemplate: number;
  public excelTipoIdSua: number;
  public excelTipoIdEma: number;

  public modificaEncabezado(dataString) {
    console.log(dataString.indexOf('"', 2));
    var encabezadoInicio = dataString.indexOf('"', 2);
    var encabezadoFin = encabezadoInicio - 2;
    console.log("++++++ " + dataString.substr(2, encabezadoFin));
    var r = dataString.substr(2, encabezadoFin);
    var p = JSON.parse(dataString.replace(r, 'Sua'));
    return p;
  }

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

      // var address_of_cell = 'A5';


      console.log(first_sheet_name);

      /* Get worksheet */
      var worksheet = workBook.Sheets[first_sheet_name];

      // console.log(worksheet);
      /* Find desired cell */
      // var desired_cell = worksheet[address_of_cell];
      // console.log(desired_cell);
      /* Get the value */
      // var desired_value = (desired_cell ? desired_cell.v : undefined);
      // console.log(desired_value);



      // jsonData = workBook.SheetNames.reduce((initial, name) => {


      //   const sheet = workBook.Sheets[name];
      //   initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



      //   return initial;
      // }, {});
      //Los nombres de las columnas se recuperan bien
      jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // const dataString = JSON.stringify(jsonData);
      this.temporalJson = jsonData;

      if (this.selectPeriodo.tipoPeriodoId === 1) {
        this.excelTipoIdTemplate = 2;
        this.ValidarArregloColumnas(jsonData, 2);
      } else {
        this.excelTipoIdTemplate = 3;
        this.ValidarArregloColumnas(jsonData, 3);
      }
      // var jsonTemplate = this.modificaEncabezado(dataString);
      // console.log(jsonTemplate);


      // // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
      // console.log(jsonTemplate.Sua[0]);
      // const b = jsonTemplate.Sua[0];
      // console.log(b[0] + " ******");
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }

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

      console.log(first_sheet_name + " *****");
      if (first_sheet_name === undefined) {
        this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
          timeOut: 3000
        });
        this.myInputSua.nativeElement.value = '';
      } else {
        var worksheet = workBook.Sheets[first_sheet_name];
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.suaJson = jsonData;
        this.excelTipoIdSua = 4;
        this.ValidarArregloColumnas(jsonData, 4);
      }
    }
    reader.readAsBinaryString(file);

    // console.log(first_sheet_name + ' ++++++++');
    // var address_of_cell = 'A5';

    /* Get worksheet */


    /* Find desired cell */
    // var desired_cell = worksheet[address_of_cell];
    // console.log(desired_cell);
    /* Get the value */
    // var desired_value = (desired_cell ? desired_cell.v : undefined);
    // console.log(desired_value);



    //       jsonData = workBook.SheetNames.reduce((initial, name) => {

    // console.log(JSON.stringify(initial) + " *****");
    //         const sheet = workBook.Sheets[3];
    //         initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



    //         return initial;
    //       }, {});

    //al recuperar la celda directamente no es necesario quitar el nombre de la pestaña
    //Los encabezados se recuperan sin problema

    // const dataString = JSON.stringify(jsonData);
    // console.log(dataString);
    // const p = JSON.parse(dataString.replace('Template Revision SUA Bimestral', 'Sua'));

    // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
    // console.log(jsonData[0]);
    // const b = jsonData[0];
    // console.log(b[0] + " ******");
    // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    // this.setDownload(dataString);

  }

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

        // var address_of_cell = 'A5';

        /* Get worksheet */
        var worksheet = workBook.Sheets[first_sheet_name];
        if (first_sheet_name === undefined) {
          this.toastr.error('El archivo "EMA" debe de comensar con la columna "NSS"', 'Error', {
            timeOut: 3000
          });
          this.myInputEma.nativeElement.value = '';
        } else {
          var worksheet = workBook.Sheets[first_sheet_name];
          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.emaJson = jsonData;
          this.excelTipoIdEma = 5;
          this.ValidarArregloColumnas(jsonData, 5);
        }
        /* Find desired cell */
        // var desired_cell = worksheet[address_of_cell];
        // console.log(desired_cell);
        /* Get the value */
        // var desired_value = (desired_cell ? desired_cell.v : undefined);
        // console.log(desired_value);



        // jsonData = workBook.SheetNames.reduce((initial, name) => {


        //   const sheet = workBook.Sheets[name];
        //   initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



        //   return initial;
        // }, {});


        //Los encabezados son correctos.

        // const dataString = JSON.stringify(jsonData);
        // this.ValidarArregloColumnas(jsonData, 5);
        // this.emaJson = jsonData;
        //Template mensual solo es una pestaña y los cabezales salen correctos.
        // console.log(dataString);
        // console.log(dataString.indexOf(""));
        // const p = JSON.parse(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
        // this.CargarArregloColumnas(p, 5);
        // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
        // console.log(p[0]);
        // const b = p[0];
        // console.log(b[0] + " ******");
        // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
        // this.setDownload(dataString);
      }
      reader.readAsBinaryString(file);
    } else {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });

        var first_sheet_name = workBook.SheetNames[2];

        // var address_of_cell = 'A5';

        /* Get worksheet */
        var worksheet = workBook.Sheets[first_sheet_name];
        var worksheet = workBook.Sheets[first_sheet_name];
        if (first_sheet_name === undefined) {
          this.toastr.error('El archivo "EBA" debe de comensar con la columna "NSS"', 'Error', {
            timeOut: 3000
          });
          this.myInputEma.nativeElement.value = '';
        } else {
          var worksheet = workBook.Sheets[first_sheet_name];
          jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.emaJson = jsonData;
          this.excelTipoIdEma = 6;
          this.ValidarArregloColumnas(jsonData, 6);
        }
        /* Find desired cell */
        // var desired_cell = worksheet[address_of_cell];
        // console.log(desired_cell);
        /* Get the value */
        // var desired_value = (desired_cell ? desired_cell.v : undefined);
        // console.log(desired_value);



        // jsonData = workBook.SheetNames.reduce((initial, name) => {


        //   const sheet = workBook.Sheets[name];
        //   initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



        //   return initial;
        // }, {});


        //Los encabezados son correctos.
        // jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // const dataString = JSON.stringify(jsonData);
        // this.ValidarArregloColumnas(jsonData, 6);
        // this.emaJson = jsonData;
        //Template mensual solo es una pestaña y los cabezales salen correctos.
        // console.log(dataString);
        // console.log(dataString.indexOf(""));
        // const p = JSON.parse(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
        // this.CargarArregloColumnas(p, 5);
        // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
        // console.log(p[0]);
        // const b = p[0];
        // console.log(b[0] + " ******");
        // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
        // this.setDownload(dataString);
      }
      reader.readAsBinaryString(file);
    }
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  public empleadoColumnas: EmpleadoColumna[];

  public PadLeft(value, length) {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) :
      value;
  }

  public CrearEmpleadoColumnas(indexInicio, json, columnaNombres, excelTipoId) {
    // console.log(indexInicio + " &&&&&&&&");
    // console.log(JSON.stringify(json) + "========");
    // console.log(json.length + " +++++++++");
    // console.log(JSON.stringify(columnaNombres) + " #######");
    // console.log(columnaNombres.length);
    for (let index = indexInicio + 1; index < json.length; index++) {
      const element = json[index];
      // console.log(element.length+ " *******");
      // console.log(JSON.stringify(element) + " %%%%%%%");

      if (element.length > 0) {
        for (let indexValor = 0; indexValor < columnaNombres.length; indexValor++) {

          // console.log(JSON.stringify(element) + " *******");

          if (element[1] != undefined) {
            if (element[1] != "") {
              // console.log("Entra if");
              // console.log(columnaNombres.length + " *******");
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
                configuracionSuaId: this.configuracionSua.configuracionSuaId,
                empleadoColumnaNo: this.PadLeft(element[0].toString(), 11),
                excelTipoId: excelTipoId
              }

              // console.log(JSON.stringify(empleadoColumna) + " $$$$$$$$$$$");

              this.empleadoColumnas.push(empleadoColumna);

            }

          }
        }
      }
      // break;

    }

  }


  public tiempoTemplate = 0;
  public tiempoSua = 0;
  public tiempoEma = 0;

  public CargarDatos() {
    this.cambiarEstatusSpinner(true);
    // this.CargarColumnas();
    if (this.temporalJson.length > 0) {
      if (this.suaJson.length > 0) {
        if (this.emaJson.length > 0) {
          this.toastr.success('Valida bien', 'Exito', {
            timeOut: 3000
          });
          var tiempoTotal = this.tiempoTemplate + this.tiempoSua + this.tiempoEma;
          // setTimeout(() => {
          this.CrearEmpleadoColumnas(this.indexTemplate, this.temporalJson, this.columnaNombresTemplate, this.excelTipoIdTemplate);
          // }, this.tiempoTemplate);

          // setTimeout(() => {
          this.CrearEmpleadoColumnas(this.indexSua, this.suaJson, this.columnaNombresSua, this.excelTipoIdSua);
          // },1000);

          // setTimeout(() => {
          this.CrearEmpleadoColumnas(this.indexEma, this.emaJson, this.columnaNombresEma, this.excelTipoIdEma);
          // }, 2000);

          var tiempo = 10000;
          setTimeout(() => {

            console.log(JSON.stringify(this.empleadoColumnas));
            this.dataApi.Post('/EmpleadoColumnas', this.empleadoColumnas).subscribe(result => {
              this.cambiarEstatusSpinner(false);
              this.myInputTem.nativeElement.value = '';
              this.myInputSua.nativeElement.value = '';
              this.myInputEma.nativeElement.value = '';
              this.temporalJson = [];
              this.suaJson = [];
              this.emaJson = [];
              this.empleadoColumnas = [];
              this.toastr.success('Datos registrados con exito', 'Exito', {
                timeOut: 3000
              });
            }, error => {
              this.toastr.error('Error en los datos solicitados', 'Error', {
                timeOut: 3000
              });
            });
          }, 5000);


        } else {
          this.toastr.error('Debe de cargar el excel "EMA o EBA"', 'Error', {
            timeOut: 3000
          });
        }
      } else {
        this.toastr.error('Debe de cargar el excel "SUA"', 'Error', {
          timeOut: 3000
        });
      }
    } else {
      this.toastr.error('Debe de cargar el excel "Template"', 'Error', {
        timeOut: 3000
      });
    }
  }

  public CargarColumnas(columnas, excelTipo) {
    var excelColumna = {};
    for (let index = 0; index < columnas.length; index++) {
      const element = columnas[index];
      excelColumna = {
        excelColumnaNombre: element,
        excelTipoId: excelTipo,
        excelPosicion: index
      }
      console.log(JSON.stringify(excelColumna));
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

  public columnaNombresTemplate = [];
  public columnaNombresSua = [];
  public columnaNombresEma = [];

  public ValidarArregloColumnas(jsonExcel, excelTipo) {

    for (let index = 0; index < jsonExcel.length; index++) {
      const element = jsonExcel[index];
      if (excelTipo == 4) {
        console.log(element.length);
        if (element.length > 7) {
          console.log(element[0]);
          if (element[0] == "Número de Afiliación") {
            // this.CargarColumnas(element, excelTipo);
            this.indexSua = index;
            this.columnaNombresSua = element;
            // console.log(this.indexSua + ' SUA');
            this.tiempoSua = jsonExcel.length * 900;
            break;
          } else {
            this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
              timeOut: 3000
            });
            this.myInputSua.nativeElement.value = '';
          }
          // console.log(element[0] + " 99999");
        }
        // }else{
        //   this.toastr.error('El archivo "SUA2" debe de comensar con la columna "Número de Afiliación"', 'Error', {
        //     timeOut: 3000
        //   });
        //   this.myInputSua.nativeElement.value = '';
        // }
      } else {
        console.log(element.length + ' ' + excelTipo);
        if (element.length > 1) {
          if (excelTipo == 2 || excelTipo == 3) {
            console.log(element[0]);
            if (element[0] == "No. S.S.") {
              // this.CargarColumnas(element, excelTipo);
              this.indexTemplate = index;
              this.columnaNombresTemplate = element;
              // console.log(this.indexTemplate + ' template');
              this.tiempoTemplate = jsonExcel.length * 900;
              break;
            } else {
              this.toastr.error('El archivo "Template" debe de comensar con la columna "No. S.S."', 'Error', {
                timeOut: 3000
              });
              this.myInputTem.nativeElement.value = '';
              break;
            }
          } else {
            if (element[0] == "NSS") {
              // this.CargarColumnas(element, excelTipo);
              this.indexEma = index;
              // console.log(this.indexEma + ' EMA');
              this.columnaNombresEma = element;
              this.tiempoEma = jsonExcel.length * 900;
              break;
            } else {
              this.toastr.error('El archivo "EMA" o "EBA" debe de comensar con la columna "NSS"', 'Error', {
                timeOut: 3000
              });
              this.myInputEma.nativeElement.value = '';
              break;
            }
          }
          // break;
        }
      }
    }
  }

  public CargarColumnasTem() {
    if (this.selectPeriodo.tipoPeriodoId === 1) {
      this.CargarArregloColumnas(this.temporalJson, 2);
    } else {
      this.CargarArregloColumnas(this.temporalJson, 3);
    }
  }

  public CargarColumnasSua() {
    this.CargarArregloColumnas(this.suaJson, 4);
  }

  public CargarColumnasEma() {
    if (this.selectPeriodo.tipoPeriodoId === 1) {
      this.CargarArregloColumnas(this.emaJson, 5);
    } else {
      this.CargarArregloColumnas(this.emaJson, 6);
    }
  }

  public CargarArregloColumnas(jsonExcel, excelTipo) {
    for (let index = 0; index < jsonExcel.length; index++) {
      const element = jsonExcel[index];
      if (excelTipo == 4) {
        console.log(element.length);
        if (element.length > 7) {
          if (element[0] == "Número de Afiliación") {
            this.CargarColumnas(element, excelTipo);
            break;
          } else {
            this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
              timeOut: 3000
            });
            this.myInputSua.nativeElement.value = '';
          }
          // console.log(element[0] + " 99999");
        }
        // }else{
        //   this.toastr.error('El archivo "SUA" debe de comensar con la columna "Número de Afiliación"', 'Error', {
        //     timeOut: 3000
        //   });
        //   this.myInputSua.nativeElement.value = '';
        // }
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
            }
          }
          break;
        }
      }
    }
  }
}
