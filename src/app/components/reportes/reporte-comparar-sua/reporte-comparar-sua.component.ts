import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-reporte-comparar-sua',
  templateUrl: './reporte-comparar-sua.component.html',
  styleUrls: ['./reporte-comparar-sua.component.css']
})
export class ReporteCompararSuaComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }

  ngOnInit(): void {
  }


  public GenerarReporte(){
    const reader = new FileReader();

    // var wb = XLSX.utils.book_new();

    // XLSX.writeFile(wb, 'out.xlsb');

    var data = [{
      "empleadoColumnaMes": 1,
      "empleadoColumnaAnio": 1,
      "empleadoColumnaValor": 647474.11,
      "excelColumnaNombre": "CUOTAS OP IMSS",
      "configuracionSuaId": 1
    },{
      "empleadoColumnaMes": 2,
      "empleadoColumnaAnio": 2,
      "empleadoColumnaValor": 647474.22,
      "excelColumnaNombre": "CUOTAS OP IMSS",
      "configuracionSuaId": 1
    },{f: 'A2+A3'}]
    // reader.readAsBinaryString(file);
    // this.setDownload(data);
    // this.exportAsExcelFile(data,"ReporteSua");
    var auth = { email : "maflores",
    password: "1234"

    }
    this.dataApi.Post('/User/excel',auth).subscribe(result => {
      // this.cambiarEstatusSpinner(false);
      alert("Registro exitoso");
      var variable = result;
      console.log(variable.data);
      const byteCharacters = atob(variable.data);

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }


      var byteArray = new Uint8Array(byteNumbers);
      //  var blob = new Blob([byteArray], { type: 'application/pdf' });
      const data: Blob = new Blob([byteArray], { type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      FileSaver.saveAs(data, "Productos.xlsx");
      // console.log(variable);
      // return variable ;
    }, error => {
      // this.cambiarEstatusSpinner(false);
      alert("Errores en el servidor intente más tarde");
    });
  }

  public setDownload(data) {
    // this.willDownload = true;
    setTimeout((data) => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)

}

 EXCEL_TYPE = 'application/vnd.openxmlformats- officedocument.spreadsheetml.sheet;charset=UTF-8';
 EXCEL_EXTENSION = '.xlsx';

public exportAsExcelFile(json: any[], excelFileName: string): void {
  // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  // const workbook: XLSX.WorkBook = { Sheets: { 'comprativo': worksheet }, SheetNames: ['comprativo'] };

  var tbl  = XLSX.utils.table_to_book(document.getElementById('data-table'));
  console.log(document.getElementById('data-table'));
  // const workbook: XLSX.WorkBook = { Sheets: { 'comprativo': worksheet }, SheetNames: ['comprativo'] };
  // const excelBuffer: any = XLSX.writeFile(tbl, "export.xlsx", {cellStyles:true});

  // var cell = {f: 'SUSTITUIR(DIRECCION(1,1,4),"1","")'};
  // var cell = {f: 'A2+A3'};



  // var cellRef = XLSX.utils.encode_cell({r:4, c:4});
  
  // var range = {s:{r: 0, c: 0},
              // e: {r: 10, c: 10}};
  
              // worksheet[cellRef].s = {
              //   fill: {
              //   type:'pattern',
              //   pattern: "solid", // none / solid
              //   fgColor: { argb: "FF1c4587" },
              //   bgColor: { argb: "FF1c4587" }
              //   }
              //   }
  
  //  worksheet[cellRef] = cell;
  // worksheet['!ref'] = XLSX.utils.encode_range(range);
  



  

  //  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'}
  const excelBuffer: any = XLSX.writeFile(tbl, "export.xlsx", {cellStyles:true});
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
}




formulaExcel(){
  var xlsx = require('xlsx');
  let workBook = null;


var exportBook = null;

var worksheet = {};

var cell = {f: 'A2+A3'};

var cellRef = xlsx.utils.encode_cell({r:0, c:0});

var range = {s:{r: 0, c: 0},
            e: {r: 10, c: 10}};



worksheet[cellRef] = cell;
worksheet['!ref'] = xlsx.utils.encode_range(range);

exportBook.SheetNames.push('test');
exportBook.Sheets.test = worksheet;

var tbl = XLSX.utils.table_to_book(document.getElementById('data-table'));
    XLSX.writeFile(tbl, "export.xlsx", {cellStyles:true});

xlsx.writeFile(exportBook, 'formula sample.xlsx', {cellStyles:true});
}


elementData = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
dataSource = this.elementData;

}