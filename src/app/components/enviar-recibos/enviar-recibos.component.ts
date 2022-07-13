import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { PeriodoTipo } from 'src/app/models/periodoTipo';
import { Recibo } from 'src/app/models/recibo';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-enviar-recibos',
  templateUrl: './enviar-recibos.component.html',
  styleUrls: ['./enviar-recibos.component.css'],
})
export class EnviarRecibosComponent implements OnInit {
  public usuario: Usuario;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;

  public empleadoNoEmp = '';

  private recibo: Recibo;

  public p: number = 1;

  constructor(
    public dataApi: DataApiService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private apiAuthService: AuthUserService
  ) {
    this.usuario = this.apiAuthService.usuarioData;
  }

  //Lista de los tipos de periodos
  public periodoTipos: PeriodoTipo[]; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Inicio del filtro
  public selectPeriodoTipo: PeriodoTipo; // = this.periodoTipos[0];

  //Lista de las empresas
  public empresas: Empresa[]; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Lista de los recibos
  public recibos: Recibo[]; // = [{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },{ "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]

  //Inicio del filtro
  public selectEmpresa: Empresa; // = this.periodoTipos[0];

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
  public selectMes = this.meses[new Date().getMonth()];

  //Se recuperan los años con respecto al año actual
  public anios = this.recuperaAnios();

  public selectAnio = this.anios[1];

  public recuperaAnios() {
    var selectAnio = [];
    var anio = new Date().getFullYear() - 1;
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

  //Lista de los tipos de periodos
  public periodoNumerosS = [
    { periodoNumeroId: 1, periodoNumeroNombre: '1' },
    { periodoNumeroId: 2, periodoNumeroNombre: '2' },
    { periodoNumeroId: 3, periodoNumeroNombre: '3' },
    { periodoNumeroId: 4, periodoNumeroNombre: '4' },
  ];

  //Lista de los tipos de periodos
  public periodoNumerosQ = [
    { periodoNumeroId: 1, periodoNumeroNombre: '1' },
    { periodoNumeroId: 2, periodoNumeroNombre: '2' },
  ];

  //Lista de los tipos de periodos
  public periodoNumerosM = [{ periodoNumeroId: 1, periodoNumeroNombre: '1' }];

  //Inicio del filtro
  public selectPeriodoNumeroS = this.periodoNumerosS[0];
  public selectPeriodoNumeroQ = this.periodoNumerosQ[0];
  public selectPeriodoNumeroM = this.periodoNumerosM[0];

  ngOnInit(): void {
    this.cambiarEstatusSpinner(true);
    this.getCurrentUser();
    this.RecuperaEmpresas();
    this.RecuperaPeriodoTipo();

  }

  RecuperaPeriodoTipo() {
    this.dataApi.GetList('/PeriodoTipos').subscribe(
      (periodoTipos) => {
        this.periodoTipos = periodoTipos.sort((a, b) => {
          if (a.periodoTipoNombre > b.periodoTipoNombre) {
            return 1;
          }
          if (a.periodoTipoNombre < b.periodoTipoNombre) {
            return -1;
          }
          return 0;
        });
        this.selectPeriodoTipo = this.periodoTipos[0];
        this.cambiarEstatusSpinner(false);
        // this.RecuperaRecibo();
      },
      (error) => {
        this.cambiarEstatusSpinner(false);
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

  RecuperaEmpresas() {
    this.dataApi.GetList('/Empresas').subscribe(
      (empresas) => {
        this.empresas = empresas.sort((a, b) => {
          if (a.empresaNombre > b.empresaNombre) {
            return 1;
          }
          if (a.empresaNombre < b.empresaNombre) {
            return -1;
          }
          return 0;
        });
        this.selectEmpresa = this.empresas[0];
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

  //Se recuperan todos los recibos
  RecuperaRecibo() {
    // console.log("Entra recibos")
    this.cambiarEstatusSpinner(true);

    var periodoNumero = 0;

    switch (this.selectPeriodoTipo.periodoTipoId) {
      case 1:
        periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
        break;
      case 2:
        periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
        break;
      case 3:
        periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
        break;
      default:
        break;
    }

    this.recibo = {
      reciboId: 0,
      reciboPeriodoA: this.selectAnio.anioValor,
      reciboPeriodoM: this.selectMes.mesId,
      reciboPeriodoD: new Date().getDay(),
      reciboPeriodoNumero: periodoNumero,
      periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
      usuarioNoEmp: null,
      reciboEstatus: true,
      empresa: this.selectEmpresa,
      empresaId: this.selectEmpresa.empresaId,
    };

    setTimeout(() => {
      this.dataApi.Post('/Recibos/GetRecibosFiltro', this.recibo ).subscribe(
        (recibos) => {
          if(recibos.length > 0){
            // if(this.recibos.pipe())
            this.recibos = recibos.sort((a, b) => {
              if (a.usuarioNoEmp > b.usuarioNoEmp) {
                return 1;
              }
              if (a.usuarioNoEmp < b.usuarioNoEmp) {
                return -1;
              }
              return 0;
            });
          }else{
            this.toastr.error(
              'No se encontraron registros para esta búsqueda.',
              'Error',
              {
                timeOut: 3000,
              }
            );
            this.recibos = [] ;//new Observable<Recibo[]>() 
            // console.log("Entra borrado" + JSON.stringify(this.recibos))
          }
          
          this.cambiarEstatusSpinner(false);
          // console.log('Entra ' + this.recibos);
        },
        (error) => {
          this.cambiarEstatusSpinner(false);
          this.toastr.error(
            'Error en el servidor, contacte al administrador del sistema.',
            'Error',
            {
              timeOut: 3000,
            }
          );
        }
      );
    }, 3000);
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
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  onEnvioIndividual(recibo: Recibo) {
    this.cambiarEstatusSpinner(true);
    var periodoNumero = 0;

    switch (this.selectPeriodoTipo.periodoTipoId) {
      case 1:
        periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
        break;
      case 2:
        periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
        break;
      case 3:
        periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
        break;
      default:
        break;
    }

    this.recibo = {
      reciboId: 0,
      reciboPeriodoA: this.selectAnio.anioValor,
      reciboPeriodoM: this.selectMes.mesId,
      reciboPeriodoD: new Date().getDay(),
      reciboPeriodoNumero: periodoNumero,
      periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
      usuarioNoEmp: recibo.usuarioNoEmp,
      reciboEstatus: true,
      empresa: this.selectEmpresa,
      empresaId: this.selectEmpresa.empresaId,
    };

    console.log(new Date().getDay() + ' #######');

    setTimeout(() => {
      this.dataApi.Post('/Recibos/EnviarNotificacion', this.recibo).subscribe(
        (result) => {
          if (result.exito == 1) {
            this.cambiarEstatusSpinner(false);
            this.toastr.success(result.mensaje, 'Exito', {
              timeOut: 3000,
            });
          } else {
            this.cambiarEstatusSpinner(false);
            this.toastr.error(result.mensaje, 'Error', {
              timeOut: 3000,
            });
          }
        },
        (error) => {
          this.cambiarEstatusSpinner(false);
          this.toastr.error(
            'Error en el servidor, contacte al administrador del sistema.',
            'Error',
            {
              timeOut: 3000,
            }
          );
        }
      );
    }, 1000);
  }

  enviarMasivo() {
    this.cambiarEstatusSpinner(true);
    var periodoNumero = 0;

    switch (this.selectPeriodoTipo.periodoTipoId) {
      case 1:
        periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
        break;
      case 2:
        periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
        break;
      case 3:
        periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
        break;
      default:
        break;
    }

    this.recibo = {
      reciboId: 0,
      reciboPeriodoA: this.selectAnio.anioValor,
      reciboPeriodoM: this.selectMes.mesId,
      reciboPeriodoD: new Date().getDay(),
      reciboPeriodoNumero: periodoNumero,
      periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
      usuarioNoEmp: null,
      reciboEstatus: true,
      empresa: this.selectEmpresa,
      empresaId: this.selectEmpresa.empresaId,
    };

    setTimeout(() => {
      this.dataApi.Post('/Recibos/NotificarMasivo', this.recibo).subscribe(
        (result) => {
          if (result.exito == 1) {
            this.cambiarEstatusSpinner(false);
            this.toastr.success(result.mensaje, 'Exito', {
              timeOut: 3000,
            });
          } else {
            this.cambiarEstatusSpinner(false);
            this.toastr.error(result.mensaje, 'Error', {
              timeOut: 3000,
            });
          }
        },
        (error) => {
          this.cambiarEstatusSpinner(false);
          this.toastr.error(
            'Error en el servidor, contacte al administrador del sistema.',
            'Error',
            {
              timeOut: 3000,
            }
          );
        }
      );
    }, 1000);
  }
}
