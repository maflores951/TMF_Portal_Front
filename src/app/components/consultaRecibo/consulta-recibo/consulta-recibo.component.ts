import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { randomBytes } from 'crypto';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { PeriodoTipo } from 'src/app/models/periodoTipo';
import { Recibo } from 'src/app/models/recibo';
import { Response } from 'src/app/models/response';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consulta-recibo',
  templateUrl: './consulta-recibo.component.html',
  styleUrls: ['./consulta-recibo.component.css']
})
export class ConsultaReciboComponent implements OnInit {
  public usuario: Usuario;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;

  // public empleadoNoEmp = '';

  private recibo: Recibo;

  constructor(
    public dataApi: DataApiService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private apiAuthService: AuthUserService,
    private http: HttpClient,
  ) {
    this.usuario = this.apiAuthService.usuarioData;
  }

  public url = environment.baseUrl + "/";

  //Lista de los tipos de periodos
  // public periodoTipos: PeriodoTipo[]; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Inicio del filtro
  // public selectPeriodoTipo: PeriodoTipo; // = this.periodoTipos[0];

  //Lista de las empresas
  // public empresas: Empresa[]; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Lista de los recibos
  public recibos: Observable<Recibo[]>; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Inicio del filtro
  // public selectEmpresa: Empresa; // = this.periodoTipos[0];

  //Lista de meses
  public meses = [
    { mesId: 1, mesNombre: 'Enero' },
    { mesId: 2, mesNombre: 'Febrero' },
    { mesId: 3, mesNombre: 'Marzo' },
    { mesId: 4, mesNombre: 'Abril' },
    { mesId: 5, mesNombre: 'Mayo' },
    { mesId: 6, mesNombre: 'Junio' },
    { mesId: 7, mesNombre: 'Julio' },
    { mesId: 8, mesNombre: 'Agosto' },
    { mesId: 9, mesNombre: 'Septiembre' },
    { mesId: 10, mesNombre: 'Octubre' },
    { mesId: 11, mesNombre: 'Noviembre' },
    { mesId: 12, mesNombre: 'Diciembre' },
  ];

  //Inicio del filtro del mes
  public selectMes = this.meses[0];

  //Lista de bimestres
  // public bimestres = [
  //   { bimestreId: 13, bimestreNombre: 'Enero-febrero' },
  //   { bimestreId: 14, bimestreNombre: 'Marzo-Abril' },
  //   { bimestreId: 15, bimestreNombre: 'Mayo-Junio' },
  //   { bimestreId: 16, bimestreNombre: 'Julio-Agosto' },
  //   { bimestreId: 17, bimestreNombre: 'Septiembre-Octubre' },
  //   { bimestreId: 18, bimestreNombre: 'Noviembre-Diciembre' },
  // ];

  //Inicio del filtro del mes
  // public selectBimestre = this.bimestres[0];

  //Se recuperan los años con respecto al año actual
  public anios = this.recuperaAnios();

  public selectAnio = this.anios[0];

  public recuperaAnios() {
    var selectAnio = [];
    var anio = new Date().getFullYear() - 1;
    // selectAnio.push(anio--);
    for (let index = 1; index < 5; index++) {
      var itemAnio = {
        anioId: anio,
        anioValor: anio,
      };
      anio++;
      selectAnio.push(itemAnio);
    }
    return selectAnio;
  }

  // //Lista de los tipos de periodos
  // public periodoNumerosS = [
  //   { periodoNumeroId: 1, periodoNumeroNombre: '1' },
  //   { periodoNumeroId: 2, periodoNumeroNombre: '2' },
  //   { periodoNumeroId: 3, periodoNumeroNombre: '3' },
  //   { periodoNumeroId: 4, periodoNumeroNombre: '4' },
  // ];

  // //Lista de los tipos de periodos
  // public periodoNumerosQ = [
  //   { periodoNumeroId: 1, periodoNumeroNombre: '1' },
  //   { periodoNumeroId: 2, periodoNumeroNombre: '2' },
  // ];

  // //Lista de los tipos de periodos
  // public periodoNumerosM = [{ periodoNumeroId: 1, periodoNumeroNombre: '1' }];

  // //Inicio del filtro
  // public selectPeriodoNumeroS = this.periodoNumerosS[0];
  // public selectPeriodoNumeroQ = this.periodoNumerosQ[0];
  // public selectPeriodoNumeroM = this.periodoNumerosM[0];



  ngOnInit(): void {
    this.getCurrentUser();
   
    // this.RecuperaPeriodoTipo();
    // this.RecuperaEmpresas();
  }

  // RecuperaPeriodoTipo() {
  //   this.dataApi.GetList('/PeriodoTipos').subscribe(
  //     (periodoTipos) => {
  //       this.periodoTipos = periodoTipos.sort((a, b) => {
  //         if (a.periodoTipoNombre > b.periodoTipoNombre) {
  //           return 1;
  //         }
  //         if (a.periodoTipoNombre < b.periodoTipoNombre) {
  //           return -1;
  //         }
  //         // a must be equal to b
  //         return 0;
  //       });
  //       this.selectPeriodoTipo = this.periodoTipos[0];
  //       this.RecuperaRecibo();
  //     },
  //     (error) => {
  //       this.toastr.error(
  //         'Error en el servidor, contacte al administrador del sistema.',
  //         'Error',
  //         {
  //           timeOut: 3000,
  //         }
  //       );
  //     }
  //   );
  // }

  // RecuperaEmpresas() {
  //   this.dataApi.GetList('/Empresas').subscribe(
  //     (empresas) => {
  //       this.empresas = empresas.sort((a, b) => {
  //         if (a.empresaNombre > b.empresaNombre) {
  //           return 1;
  //         }
  //         if (a.empresaNombre < b.empresaNombre) {
  //           return -1;
  //         }
  //         // a must be equal to b
  //         return 0;
  //       });
  //       this.selectEmpresa = this.empresas[0];
  //     },
  //     (error) => {
  //       this.toastr.error(
  //         'Error en el servidor, contacte al administrador del sistema.',
  //         'Error',
  //         {
  //           timeOut: 3000,
  //         }
  //       );
  //     }
  //   );
  // }

  RecuperaRecibo() {
    this.dataApi.Post('/Recibos/Usuario', this.recibo ).subscribe(
      (recibos) => {
        this.recibos = recibos.sort((a, b) => {
          if (a.usuarioNoEmp > b.usuarioNoEmp) {
            return 1;
          }
          if (a.usuarioNoEmp < b.usuarioNoEmp) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        console.log("Entra " + JSON.stringify(this.recibos))
        // this.selectEmpresa = this.empresas[0];
      },
      (error) => {
        this.toastr.error(
          'Error en el servidor, contacte al administrador del sistema.',
          'Error',
          {
            timeOut: 3000,
          }
        );
      }
    );
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    this.UserTypeId = this.usuario.rolId;
    if (this.UserTypeId == 1) {
      this.isAdmin = true;
    } else if (this.UserTypeId == 2) {
      this.isLocal = true;
    } else if (this.UserTypeId == 3) {
      this.isIT = true;
    } else if (this.UserTypeId == 4) {
      this.isSuper = true;
    }

    this.recibo = {
      reciboId: 0,
      reciboPeriodoA: 0,
      reciboPeriodoM: 0,
      reciboPeriodoD: 0,
      reciboPeriodoNumero: 0,
      periodoTipoId: 0,
      usuarioNoEmp: this.usuario.empleadoNoEmp,
      reciboEstatus: true,
      empresa: null,
      empresaId: this.usuario.empresaId,
    };

    this.RecuperaRecibo();
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  // onEnvioIndividual(recibo: Recibo) {
  //   this.cambiarEstatusSpinner(true);
  //   var periodoNumero = 0;

  //   switch (this.selectPeriodoTipo.periodoTipoId) {
  //     case 1:
  //       periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
  //       break;
  //     case 2:
  //       periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
  //       break;
  //     case 3:
  //       periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
  //       break;
  //     default:
  //       break;
  //   }

  //   this.recibo = {
  //     reciboId: 0,
  //     reciboPeriodoA: this.selectAnio.anioValor,
  //     reciboPeriodoM: this.selectMes.mesId,
  //     reciboPeriodoD: new Date().getDay(),
  //     reciboPeriodoNumero: periodoNumero,
  //     periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
  //     usuarioNoEmp: recibo.usuarioNoEmp,
  //     reciboEstatus: true,
  //     empresa: this.selectEmpresa,
  //     empresaId: this.selectEmpresa.empresaId,
  //   };

  //   console.log(new Date().getDay() + ' #######');

  //   setTimeout(() => {
  //     this.dataApi.Post('/Recibos/EnviarIndividual', this.recibo).subscribe(
  //       (result) => {
  //         if (result.exito == 1) {
  //           this.cambiarEstatusSpinner(false);
  //           this.toastr.success(result.mensaje, 'Exito', {
  //             timeOut: 3000,
  //           });
  //         } else {
  //           this.cambiarEstatusSpinner(false);
  //           this.toastr.error(result.mensaje, 'Error', {
  //             timeOut: 3000,
  //           });
  //         }
  //       },
  //       (error) => {
  //         this.cambiarEstatusSpinner(false);
  //         this.toastr.error(
  //           'Error en el servidor, contacte al administrador del sistema.',
  //           'Error',
  //           {
  //             timeOut: 3000,
  //           }
  //         );
  //       }
  //     );
  //   }, 1000);
  // }

  // enviarMasivo() {
  //   this.cambiarEstatusSpinner(true);
  //   var periodoNumero = 0;

  //   switch (this.selectPeriodoTipo.periodoTipoId) {
  //     case 1:
  //       periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
  //       break;
  //     case 2:
  //       periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
  //       break;
  //     case 3:
  //       periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
  //       break;
  //     default:
  //       break;
  //   }

  //   this.recibo = {
  //     reciboId: 0,
  //     reciboPeriodoA: this.selectAnio.anioValor,
  //     reciboPeriodoM: this.selectMes.mesId,
  //     reciboPeriodoD: new Date().getDay(),
  //     reciboPeriodoNumero: periodoNumero,
  //     periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
  //     usuarioNoEmp: null,
  //     reciboEstatus: true,
  //     empresa: this.selectEmpresa,
  //     empresaId: this.selectEmpresa.empresaId,
  //   };

  //   setTimeout(() => {
  //     this.dataApi.Post('/Recibos/EnviarMasivo', this.recibo).subscribe(
  //       (result) => {
  //         if (result.exito == 1) {
  //           this.cambiarEstatusSpinner(false);
  //           this.toastr.success(result.mensaje, 'Exito', {
  //             timeOut: 3000,
  //           });
  //         } else {
  //           this.cambiarEstatusSpinner(false);
  //           this.toastr.error(
  //             result.mensaje,
  //             'Error',
  //             {
  //               timeOut: 3000,
  //             }
  //           );
  //         }
  //       },
  //       (error) => {
  //         this.cambiarEstatusSpinner(false);
  //         this.toastr.error(
  //           'Error en el servidor, contacte al administrador del sistema.',
  //           'Error',
  //           {
  //             timeOut: 3000,
  //           }
  //         );
  //       }
  //     );
  //   }, 1000);
  // }
  downloadFile(data: any) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
 
 
 
  async download(archivo, dominio) {
 
    var urlfinal = this.url + archivo;
    // var headers = new Headers({});
    // // headers.append('Authorization', this.storageSvc.getUserToken());
    // let ActionUrl = 'xxxxxxxxxxxxxx';
 
    // this.http.get(ActionUrl ,).subscribe(data =>
    //   this.downloadFile(data.text())),
    //   error => console.log("Error downloading the file."),
    //   () => console.info("OK");
    let blob = await fetch(urlfinal).then(r => r.blob());

  //   var url= window.URL.createObjectURL(blob);
  // window.open(url);
    var random = Math.random() * (1000 - 100) + 100
   var nombre = "ReciboÇ_" +random.toFixed(0) + dominio;
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.href = url;
  a.download = nombre;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();


    // var blob = new Blob([urlfinal], { type: 'pdf' });
    // var url = window.URL.createObjectURL(blob);
    // window.open(url);
 
  }

}
