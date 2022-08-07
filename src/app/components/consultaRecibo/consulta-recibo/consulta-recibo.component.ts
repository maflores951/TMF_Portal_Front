import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Recibo } from 'src/app/models/recibo';
import { Usuario } from 'src/app/models/usuario';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-recibo',
  templateUrl: './consulta-recibo.component.html',
  styleUrls: ['./consulta-recibo.component.css'],
})
export class ConsultaReciboComponent implements OnInit {
  public usuario: Usuario;
  public isAdmin: boolean = false;
  public isIT: boolean = false;
  public isLocal: boolean = false;
  public isSuper: boolean = false;
  private UserTypeId: number;
  public userUid: number = null;

  private recibo: Recibo;

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;

  constructor(
    public dataApi: DataApiService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private apiAuthService: AuthUserService,
    private http: HttpClient,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
    this.usuario = this.apiAuthService.usuarioData;
  }

  public url = environment.baseUrl + '/';
  safeSrc: SafeResourceUrl;

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

  ngOnInit(): void {
    this.getCurrentUser();
  }

  RecuperaRecibo() {
    this.dataApi.Post('/Recibos/Usuario', this.recibo).subscribe(
      (recibos) => {
        this.recibos = recibos.sort((a, b) => {
          if (a.usuarioNoEmp > b.usuarioNoEmp) {
            return 1;
          }
          if (a.usuarioNoEmp < b.usuarioNoEmp) {
            return -1;
          }
          return 0;
        });

        //  console.log('Entra ' + JSON.stringify(this.recibos));
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

  downloadFile(data: any) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  async download(archivo, dominio) {
    var urlfinal = this.url + archivo;
    let blob = await fetch(urlfinal).then((r) => r.blob());
    var random = Math.random() * (1000 - 100) + 100;
    var nombre = 'Recibo_' + random.toFixed(0) + dominio;
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  async descargar() {
    // var urlfinal = this.url + archivo;
    let blob = await fetch(this.dataApi.SelectedUsuarioPDF).then((r) =>
      r.blob()
    );
    var random = Math.random() * (1000 - 100) + 100;
    var nombre = 'Recibo_' + random.toFixed(0) + '.pdf';
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

    this.modalService.dismissAll();
  }

  async imprimir() {
    // const url = request URL // e.g localhost:3000 + "/download?access_token=" + "sample access token";
    let blob = await fetch(this.dataApi.SelectedUsuarioPDF).then((r) =>
      r.blob()
    );
    const blobUrl = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

  onPreUpdateVisor(reciboPathPDF) {
    this.dataApi.SelectedUsuarioPDF = this.url + reciboPathPDF;
    console.log('Abrir visor' + this.dataApi.SelectedUsuarioPDF);
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     // this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  open(content, reciboPathPDF) {
    // this.dataApi.SelectedUsuarioPDF = this.url + reciboPathPDF;
    // console.log("Abrir visor " + this.dataApi.SelectedUsuarioPDF)
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url + reciboPathPDF
    );
    this.modalService
      .open(content, { size: 'lg', backdrop: 'static' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
}
