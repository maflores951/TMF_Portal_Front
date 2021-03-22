import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DataApiService } from 'src/app/services/data-api.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-reporte-comparar-sua',
  templateUrl: './reporte-comparar-sua.component.html',
  styleUrls: ['./reporte-comparar-sua.component.css']
})
export class ReporteCompararSuaComponent implements OnInit {


  public usuario: Usuario;

  //Se recupera la información del usuario
  constructor(public dataApi: DataApiService, private toastr: ToastrService, private spinner: SpinnerService,private apiAuthService: AuthUserService ) {
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

  //Se asignan los años
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

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  //Se ejecuta una API que solicita el reporte que se genera en el BackEnd
  public GenerarReporte(){
    this.cambiarEstatusSpinner(true);
    const reader = new FileReader();

    var parametros = { ConfiguracionSuaId : this.configuracionSua.configuracionSuaId,
    EmpleadoColumnaMes: this.selectMes.mesId,
    EmpleadoColumnaAnio: this.selectAnio.anioId,
    UsuarioId: this.usuario.usuarioId
    }

    console.log(JSON.stringify(parametros));
    this.dataApi.Post('/Sua/Excel', parametros).subscribe(result => {
     
     //Se recupera un string en base64 y se restaura a un archivo xlsx
      var variable = result;
      //Se convierte a bytes
      const byteCharacters = atob(variable.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);

      //Se convierte a un archivo
      const data: Blob = new Blob([byteArray], { type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      FileSaver.saveAs(data, "Comparativo.xlsx");
      this.toastr.error('El comparativo se generó con éxito.', 'Exito', {
        timeOut: 3000
      });
      this.cambiarEstatusSpinner(false);
    }, error => {
       this.cambiarEstatusSpinner(false);
       this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
    });
  }
}