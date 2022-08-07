import { Empresa } from './../../../models/empresa';
import { Recibo } from './../../../models/recibo';
import { PeriodoTipo } from './../../../models/periodoTipo';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/response';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { CifradoDatosService } from 'src/app/services/cifrado-datos.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-recibos',
  templateUrl: './cargar-recibos.component.html',
  styleUrls: ['./cargar-recibos.component.css'],
})
export class CargarRecibosComponent implements OnInit {
  //Variables para limpiar los archivos
  @ViewChild('myInput')
  myInput: ElementRef;

  public usuario: Usuario;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;

  private recibo: Recibo;

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

  // //Lista de bimestres
  // public bimestres = [
  //   { bimestreId: 13, bimestreNombre: 'Enero-febrero' },
  //   { bimestreId: 14, bimestreNombre: 'Marzo-Abril' },
  //   { bimestreId: 15, bimestreNombre: 'Mayo-Junio' },
  //   { bimestreId: 16, bimestreNombre: 'Julio-Agosto' },
  //   { bimestreId: 17, bimestreNombre: 'Septiembre-Octubre' },
  //   { bimestreId: 18, bimestreNombre: 'Noviembre-Diciembre' },
  // ];

  // //Inicio del filtro del mes
  // public selectBimestre = this.bimestres[0];

  //Se recuperan los años con respecto al año actual
  public anios = this.recuperaAnios();

  public selectAnio = this.anios[2];



  public recuperaAnios() {
    var selectAnio = [];
    var anio = new Date().getFullYear() - 2;
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

  public selectPeriodoNumero = 1;
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
    this.getCurrentUser();
    this.RecuperaPeriodoTipo();
    this.RecuperaEmpresas();
  }

  onChange() {
   this.selectPeriodoNumero = 1;
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

  public imageSrc: string;
  public file: File;

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result.toString());

      reader.readAsDataURL(file);

      const id = Math.random().toString(36).substring(2);
      this.file = event.target.files[0];
      const filePath = 'uploads/profile_${id}';
    }
  }

  cargarArchivo() {
    if (this.file != null) {
       this.cambiarEstatusSpinner(true);
      let file = this.file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      var image: any;

      reader.onload = () => {
        image = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

      // var periodoNumero = this.selectPeriodoNumero;

      // switch (this.selectPeriodoTipo.periodoTipoId) {
      //   case 1:
      //     periodoNumero = this.selectPeriodoNumeroM.periodoNumeroId;
      //     break;
      //   case 2:
      //     periodoNumero = this.selectPeriodoNumeroQ.periodoNumeroId;
      //     break;
      //   case 3:
      //     periodoNumero = this.selectPeriodoNumeroS.periodoNumeroId;
      //     break;
      //   default:
      //     break;
      // }

      this.recibo = {
        reciboId: 0,
        reciboPeriodoA: this.selectAnio.anioValor,
        reciboPeriodoM: this.selectMes.mesId,
        reciboPeriodoD: new Date().getDay(),
        reciboPeriodoNumero: +this.selectPeriodoNumero, //periodoNumero,
        periodoTipoId: this.selectPeriodoTipo.periodoTipoId,
        usuarioNoEmp: null,
        reciboEstatus: true,
        empresa: this.selectEmpresa,
        empresaId: this.selectEmpresa.empresaId,
      };
       console.log(this.recibo);
      setTimeout(() => {
        var buscaComa: number = image.indexOf(',') + 1;

        this.recibo.reciboPathPDF = image.substr(buscaComa);

        this.dataApi
          .Post('/Recibos/ValidarArchivo', this.recibo)
          .subscribe((result) => {
            if (result.exito == 0) {
              this.dataApi
                .Post('/Recibos/cargarArchivo', this.recibo)
                .subscribe(
                  (result) => {
                    this.cambiarEstatusSpinner(false);
                    var respuestaDel: Response = result;
                    if (respuestaDel.exito == 1) {
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
                    this.toastr.error(result.mensaje, 'Error', {
                      timeOut: 3000,
                    });
                  }
                );
              //  }
            } else {
              this.cambiarEstatusSpinner(false);
              Swal.fire({
                title:
                  'Ya existe información cargada para este periodo, si continua se actualizarán los datos ¿Quiere continuar?',
                confirmButtonText: `Continuar`,
                denyButtonText: `Cancelar`,
                showDenyButton: true,
                icon: 'question',
                reverseButtons: true,
              }).then((resultado) => {
                if (resultado.isConfirmed) {
                  this.cambiarEstatusSpinner(true);
                  this.dataApi
                    .Post('/Recibos/cargarArchivo', this.recibo)
                    .subscribe(
                      (result) => {
                        var respuestaDel: Response = result;
                        if (respuestaDel.exito == 1) {
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
                } else {
                  this.cambiarEstatusSpinner(false);
                  Swal.fire('Carga de información cancelada', '', 'error');
                }
              });
            }
          });
      }, 1000);
    } else {
      this.toastr.error(
        'Ingrese un archivo .zip para poder continuar.',
        'Error',
        {
          timeOut: 3000,
        }
      );
    }
  }
}
