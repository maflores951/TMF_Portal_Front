import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { Response } from 'src/app/models/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-comparar-sua',
  templateUrl: './reporte-comparar-sua.component.html',
  styleUrls: ['./reporte-comparar-sua.component.css']
})
export class ReporteCompararSuaComponent implements OnInit {


  public usuario: Usuario;

  //Se recupera la información del usuario
  constructor(public dataApi: DataApiService, private toastr: ToastrService, private spinner: SpinnerService, private apiAuthService: AuthUserService) {
    this.cambiarEstatusSpinner(true);
    this.usuario = this.apiAuthService.usuarioData;
    this.getListConfiguracionSua()

  }

  ngOnInit(): void {
  }

  public configuracionSuas: ConfiguracionSua[];

  public configuracionSua: ConfiguracionSua;

  //Se recuperan las configuraciones registradas
  public getListConfiguracionSua() {
    this.dataApi.GetList('/ConfiguracionSuas').subscribe(confSuaList => {
      this.configuracionSuas = confSuaList;
      this.configuracionSua = confSuaList[0];
      this.tipoConfig()
      this.cambiarEstatusSpinner(false);
    }, error => {
      console.error(error);
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
  }

  //Se asigna la lista de tipos de periodos
  public tipoPeriodos = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
  { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  public selectPeriodo = this.tipoPeriodos[0];

  //Se asigna la lista de los meses
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

  //Lista de bimestres
  public bimestres = [{ "bimestreId": 13, "bimestreNombre": "Enero-febrero" },
  { "bimestreId": 14, "bimestreNombre": "Marzo-Abril" },
  { "bimestreId": 15, "bimestreNombre": "Mayo-Junio" },
  { "bimestreId": 16, "bimestreNombre": "Julio-Agosto" },
  { "bimestreId": 17, "bimestreNombre": "Septiembre-Octubre" },
  { "bimestreId": 18, "bimestreNombre": "Noviembre-Diciembre" },
  ];

  //Inicio del filtro del mes
  public selectBimestre = this.bimestres[0];

  //Se asignan los años
  public anios = this.recuperaAnios();

  public selectAnio = this.anios[0];

  public recuperaAnios() {
    var selectAnio = [];


    var anio = new Date().getFullYear() - 1;

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

  //     //Función para determinar el tipo de comparativo
  //     tipoPeriodo() {
  //       if (this.selectPeriodo.tipoPeriodoId == 1) {
  //         this.excelTipos = this.excelTiposMensual;
  //       } else {
  //         this.excelTipos = this.excelTiposBimestral;
  //       }

  //       this.selectBimestre = this.bimestres[0];
  //       this.selectMes = this.meses[0];


  // }
  tipoConfig() {
    // console.log("Entra reporte " + this.configuracionSua.configuracionSuaTipo)
    if (this.configuracionSua.configuracionSuaTipo == 1) {
      this.selectPeriodo = this.tipoPeriodos[0];
    } else {
      this.selectPeriodo = this.tipoPeriodos[1];
    }
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  //Se ejecuta una API que solicita el reporte que se genera en el BackEnd
  public GenerarReporte() {
    if (this.selectPeriodo.tipoPeriodoId == 2) {
      this.selectMes.mesId = this.selectBimestre.bimestreId;
    }
    this.cambiarEstatusSpinner(true);
    const reader = new FileReader();

    var parametros = {
      ConfiguracionSuaId: this.configuracionSua.configuracionSuaId,
      EmpleadoColumnaMes: this.selectMes.mesId,
      EmpleadoColumnaAnio: this.selectAnio.anioId,
      UsuarioId: this.usuario.usuarioId
    }

    // console.log(JSON.stringify(parametros));
    this.dataApi.Post('/ExcelComparativos/RecuperaExcelCom', parametros).subscribe(resultCom => {
      this.cambiarEstatusSpinner(false);
      var variable: Response = resultCom;
      if (variable.exito == 1) {
        Swal.fire({
          title: variable.mensaje + `¿Quiere continuar?`,
          confirmButtonText: `Continuar`,
          denyButtonText: `Cancelar`,
          showDenyButton: true,
          icon: 'question',
          reverseButtons: true
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            this.cambiarEstatusSpinner(true);
            //APi para ejecutar reporte sin hilos
            this.dataApi.Post('/Sua/Excel', parametros).subscribe(result => {
              //Api para ejecutar reporte con hilos
              // this.dataApi.Post('/SuaHilos/Excel', parametros).subscribe(result => {
              //Se recupera un string en base64 y se restaura a un archivo xlsx
              var variable: Response = result;
              if (variable.exito == 1) {

                //Se convierte a bytes
                const byteCharacters = atob(variable.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);

                //Se convierte a un archivo
                const data: Blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                FileSaver.saveAs(data, "Comparativo.xlsx");
                this.toastr.success('El comparativo se generó con éxito.', 'Exito', {
                  timeOut: 3000
                });
                this.cambiarEstatusSpinner(false);
              } else {
                this.cambiarEstatusSpinner(false);
                this.toastr.error('No existen datos para comparar.', 'Error', {
                  timeOut: 3000
                });
              }
            }, error => {
              this.cambiarEstatusSpinner(false);
              this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
                timeOut: 3000
              });
            });
          } else if (resultado.isDenied) {
            Swal.fire('Comparativo cancelado', '', 'error')
            this.cambiarEstatusSpinner(false);
          }
        })
      } else {
        this.cambiarEstatusSpinner(false);
        this.toastr.error(variable.mensaje, 'Error', {
          timeOut: 3000
        });
      }
    }, error => {
      this.cambiarEstatusSpinner(false);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
  }
}