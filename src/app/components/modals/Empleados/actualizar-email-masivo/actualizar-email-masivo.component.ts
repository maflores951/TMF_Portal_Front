import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx';
import { EmpleadosComponent } from 'src/app/components/cruds/empleados/empleados.component';

@Component({
  selector: 'app-actualizar-email-masivo',
  templateUrl: './actualizar-email-masivo.component.html',
  styleUrls: ['./actualizar-email-masivo.component.css']
})
export class ActualizarEmailMasivoComponent implements OnInit {
  constructor(
    public dataApi: DataApiService,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) {
    this.UsuarioForm = this.createForm();
  }
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;
  //Variables para limpiar los archivos
  @ViewChild('myInput')
  myInput: ElementRef;

  ngOnInit(): void {}

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  public UsuarioForm: FormGroup;

  private archivoNombre: string;
  public temporalJson = [];

  private excelEmpleado: Usuario;
  private excelEmpleados: Usuario[] = [];

  get ArchivoEmpleados() {
    return this.UsuarioForm.get('ArchivoEmpleados');
  }

  user_validation_messages = {
    ArchivoEmpleados: [{}],
  };

  readURL(ev: any): void {

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
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

      this.ValidarArregloColumnas(jsonData);
    };
    reader.readAsBinaryString(file);
  }

  //Se valida que las columnas en los excel sean correctas
  public ValidarArregloColumnas(jsonExcel) {
     console.log(jsonExcel)
    for (let index = 0; index < jsonExcel.length; index++) {
      var encabezado = jsonExcel[0];
      const element = jsonExcel[index];
      if (encabezado.length == 3) {
        if (encabezado[0] == 'EmpleadoNo') {
          if (index > 0) {
            if (element.length == 3){
              var empleado = {
                usuarioId: 0,
                usuarioNombre: '',
                usuarioApellidoP: '',
                usuarioApellidoM: '',
                email: element[2],
                usuarioClave: '',
                // empleadoRFC: element[5],
                empleadoNoEmp: element[0],
                empresaId: element[1],
                rolId: 2,
                usuarioEstatusSesion: false,
              };
              this.excelEmpleados.push(empleado);
            }
          }
        } else {
          this.toastr.error(
            'El archivo es diferente a la plantilla de ejemplo',
            'Error',
            {
              timeOut: 3000,
            }
          );
          this.myInput.nativeElement.value = '';
          this.archivoNombre = '';
          this.temporalJson = [];
          break;
        }
      } else {
        this.toastr.error(
          'El archivo es diferente a la plantilla de ejemplo',
          'Error',
          {
            timeOut: 3000,
          }
        );
        this.myInput.nativeElement.value = '';
        this.archivoNombre = '';
        this.temporalJson = [];
        break;
      }
    }
  }

  createForm() {
    return new FormGroup({
      ArchivoEmpleados: new FormControl('', []),
    });
  }

  onSaveEmpelados(formCarga): void {
    this.cambiarEstatusSpinner(true);
    if (this.temporalJson.length > 0) {
      this.dataApi
        .Post('/Usuarios/ActualizarEmpEmailMasivo', this.excelEmpleados)
        .subscribe(
          (result) => {
            if (result.exito == 1) {
              this.toastr.success('Datos registrados con éxito.', 'Exito', {
                timeOut: 10000,
              });
            } else {
              this.toastr.error(result.mensaje, 'Error', {
                timeOut: 10000,
              });
            }
            setTimeout(() => {
              this.cambiarEstatusSpinner(false);
              formCarga.resetForm();
              this.excelEmpleados = [];
              EmpleadosComponent.updateEmpleados.next(true);
              this.btnClose.nativeElement.click();
            }, 2000);
          },
          (error) => {
            this.cambiarEstatusSpinner(false);
            this.toastr.error(
              'Error al realizar la carga, contacte al administrador.',
              'Error',
              {
                timeOut: 10001,
              }
            );
          }
        );

      
    } else {
      this.cambiarEstatusSpinner(false);
      this.toastr.error(
        'Errores en el documento, agregue un documento con empleados validos.',
        'Error',
        {
          timeOut: 3000,
        }
      );
    }
  }

  CerrarMCM(formCarga): void {
    formCarga.resetForm();
  }
}
