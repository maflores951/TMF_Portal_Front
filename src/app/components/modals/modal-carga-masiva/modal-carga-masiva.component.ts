import { Usuario } from 'src/app/models/usuario';
import { EmpleadosComponent } from './../../cruds/empleados/empleados.component';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Parametro } from 'src/app/models/parametro';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ParametrosComponent } from '../../cruds/parametros/parametros.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: ['./modal-carga-masiva.component.css']
})
export class ModalCargaMasivaComponent implements OnInit {

  constructor(public dataApi: DataApiService, private spinner: SpinnerService, private toastr: ToastrService) {
    this.UsuarioForm = this.createForm();
  }
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;
  //Variables para limpiar los archivos
  @ViewChild('myInput')
  myInput: ElementRef;



  ngOnInit() : void {
  }

  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  public UsuarioForm: FormGroup;


  private archivoNombre: string;
  public temporalJson = [];

  private excelEmpleado: Usuario;
  private excelEmpleados: Usuario[] = [];


  get ArchivoEmpleados() { return this.UsuarioForm.get('ArchivoEmpleados'); }

  user_validation_messages = {
    'ArchivoEmpleados': [
      {
      }
    ]
  }

  readURL(ev: any): void {

    // if (event.target.files && event.target.files[0]) {
    //   const file = event.target.files[0];

    //   const reader = new FileReader();
    //   reader.onload = e => this.imageSrc = reader.result.toString();

    //   reader.readAsDataURL(file);

    //   const id = Math.random().toString(36).substring(2);
    //   this.file = event.target.files[0];
    //   const filePath = 'uploads/profile_${id}';
    // }

    let workBook = null;
    let jsonData = null;
    let jsonDataV = null;
    const reader = new FileReader();
    // console.log(ev.target.files[0].name + " **** cargarExcel");
    this.archivoNombre = ev.target.files[0].name;
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      // workBook
      var first_sheet_name = workBook.SheetNames[0];
      var worksheet = workBook.Sheets[first_sheet_name];

      jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.temporalJson = jsonData;
      //  console.log(JSON.stringify(jsonData) + " ***** Cargar excel");
      //Se determina si es mensual o bimestral

        this.ValidarArregloColumnas(jsonData);
      

    }
    reader.readAsBinaryString(file);
  }

//Se valida que las columnas en los excel sean correctas 
public ValidarArregloColumnas(jsonExcel) {
  for (let index = 0; index < jsonExcel.length; index++) {
    var encabezado  = jsonExcel[0];
    const element = jsonExcel[index];
  //  console.log(element)
      if (element.length == 8) {
        if (encabezado[0] == "Nombre") {
          // this.indexSua = index;
          // this.columnaNombresSua = element;
          if(index > 0){
            var empleado = {
                usuarioId : 0,
                usuarioNombre: element[0],
                usuarioApellidoP: element[1],
                usuarioApellidoM: element[2],
                email: element[3],
                usuarioClave: element[4],
                empleadoRFC: element[5],
                empleadoNoEmp: element[6],
                empresaId: element[7],
                rolId: 2,
                usuarioEstatusSesion: false,
            }
            // console.log(empleado)
            // setTimeout(() => {
              this.excelEmpleados.push(empleado)
            // }, 500);
           
          }
          // break;
        } else {
          this.toastr.error('El archivo es diferente a la plantilla de ejemplo', 'Error', {
            timeOut: 3000
          });
          this.myInput.nativeElement.value = '';
          this.archivoNombre = "";
          this.temporalJson = [];
          // this.suaJson = [];
          break;
        }
      }else{
        this.toastr.error('El archivo es diferente a la plantilla de ejemplo', 'Error', {
          timeOut: 3000
        });
        this.myInput.nativeElement.value = '';
        this.archivoNombre = "";
        this.temporalJson = [];
        break;
      }
  }
}

  createForm() {
    return new FormGroup({
      ArchivoEmpleados: new FormControl('',
        [
        ]),
    });
  }

  onSaveEmpelados(formCarga): void {
    this.cambiarEstatusSpinner(true);
    if (this.temporalJson.length > 0) {
     
      // console.log(JSON.stringify(this.excelEmpleados) + ' empleados ***')

      this.dataApi.Post('/Usuarios/EmpledosMasivo', this.excelEmpleados).subscribe(result => {
        if(result.exito == 1){
          this.toastr.success('Datos registrados con éxito.', 'Exito', {
            timeOut: 10000
          });
        }else{
          this.toastr.error(result.mensaje, 'Error', {
            timeOut: 10000
          });
        }
      }, error => {
        this.toastr.error('Error al realizar la carga, contacte al administrador.', 'Error', {
          timeOut: 10001
        });
      });


      setTimeout(() => {
      this.cambiarEstatusSpinner(false);
      formCarga.resetForm();
    this.excelEmpleados = []
      EmpleadosComponent.updateEmpleados.next(true);
      this.btnClose.nativeElement.click();
    }, 2000)
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Errores en el documento, agregue un documento con empleados validos.', 'Error', {
        timeOut: 3000
      });
    }

  }

  CerrarMCM(formCarga): void {
    formCarga.resetForm();
  }
}
