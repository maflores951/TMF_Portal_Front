import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelColumna } from 'src/app/models/Excel/ExcelColumna';
import { JsonToExel } from 'src/app/models/Excel/JsonToExcel';
import { DataApiService } from 'src/app/services/data-api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargar-excel',
  templateUrl: './cargar-excel.component.html',
  styleUrls: ['./cargar-excel.component.css']
})
export class CargarExcelComponent implements OnInit {

  constructor(public dataApi: DataApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
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


  public mes() {

  };

  public anio() {

  };

  public tipoPeriodo() {

  };
  // CargarExcelSua(event){
  //   let filesData = event.target.files;
  //   console.log(filesData[0]);
  // }

  public data: Object;

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

      var address_of_cell = 'A5';

      /* Get worksheet */
      var worksheet = workBook.Sheets[first_sheet_name];
      // console.log(worksheet);
      /* Find desired cell */
      var desired_cell = worksheet[address_of_cell];
      // console.log(desired_cell);
      /* Get the value */
      var desired_value = (desired_cell ? desired_cell.v : undefined);
      // console.log(desired_value);



      jsonData = workBook.SheetNames.reduce((initial, name) => {


        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);

      var jsonTemplate = this.modificaEncabezado(dataString);
      console.log(jsonTemplate);


      // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
      console.log(jsonTemplate.Sua[0]);
      const b = jsonTemplate.Sua[0];
      console.log(b[0] + " ******");
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
      // console.log(first_sheet_name + ' ++++++++');
      var address_of_cell = 'A5';

      /* Get worksheet */
      var worksheet = workBook.Sheets[first_sheet_name];

      /* Find desired cell */
      var desired_cell = worksheet[address_of_cell];
      // console.log(desired_cell);
      /* Get the value */
      var desired_value = (desired_cell ? desired_cell.v : undefined);
      // console.log(desired_value);



      //       jsonData = workBook.SheetNames.reduce((initial, name) => {

      // console.log(JSON.stringify(initial) + " *****");
      //         const sheet = workBook.Sheets[3];
      //         initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



      //         return initial;
      //       }, {});

      //al recuperar la celda directamente no es necesario quitar el nombre de la pestaña
      //Los encabezados se recuperan sin problema
      jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
      // const p = JSON.parse(dataString.replace('Template Revision SUA Bimestral', 'Sua'));

      // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
      console.log(jsonData[0]);
      const b = jsonData[0];
      console.log(b[0] + " ******");
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }

  public CargarEMA(ev) {
    let workBook = null;
    let jsonData = null;
    let jsonDataV = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      var first_sheet_name = workBook.SheetNames[2];

      var address_of_cell = 'A5';

      /* Get worksheet */
      var worksheet = workBook.Sheets[first_sheet_name];
      // console.log(worksheet + " $$$$$");
      /* Find desired cell */
      var desired_cell = worksheet[address_of_cell];
      // console.log(desired_cell);
      /* Get the value */
      var desired_value = (desired_cell ? desired_cell.v : undefined);
      // console.log(desired_value);



      // jsonData = workBook.SheetNames.reduce((initial, name) => {


      //   const sheet = workBook.Sheets[name];
      //   initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1 });



      //   return initial;
      // }, {});


      //Los encabezados son correctos.
      jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const dataString = JSON.stringify(jsonData);

      //Template mensual solo es una pestaña y los cabezales salen correctos.
      // console.log(dataString);
      // console.log(dataString.indexOf(""));
      const p = JSON.parse(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
      this.CargarArregloColumnas(p, 5);
      // console.log(dataString.replace('Template Revision SUA Bimestral', 'Sua'));
      // console.log(p[0]);
      const b = p[0];
      // console.log(b[0] + " ******");
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      // this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }


  public CargarDatos() {
    // this.CargarColumnas();
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

  public CargarArregloColumnas(jsonExcel, excelTipo) {
    for (let index = 0; index < jsonExcel.length; index++) {
      const element = jsonExcel[index];
      if (element.length > 1) {
        // console.log(element[0] + " 99999");
        this.CargarColumnas(element, excelTipo);
        break;
      }
    }
  }
}
