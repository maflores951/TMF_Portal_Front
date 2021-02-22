import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
// import { SpinnerService } from 'angular-spinners';
import { Parametro } from 'src/app/models/parametro';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  public static updateParametros: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService) {
    ParametrosComponent.updateParametros.subscribe(res => {
      setTimeout(() => {
        this.getListParametros();
      }, 300)
    })
  }

  public parametroNombre = '';
  public parametroClave = '';
  public usuario: Usuario;
  public parametros: Parametro[];
  public isAdmin: any = null;
  public userUid: number = null;
  // public tokenResponse: TokenResponse;

  ngOnInit() {
    // this.spinnerService.showAll();
    this.cambiarEstatusSpinner(true);
    this.getCurrentUser();
    this.getListParametros();
    // this.spinnerService.hideAll();
    this.cambiarEstatusSpinner(false);
  }
  
  cambiarEstatusSpinner(estatus : boolean){
    this.spinner.validarEspera(estatus);
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    // console.log(this.tokenResponse);
    if (this.usuario) {
      this.userUid = this.usuario.usuarioId;
      if (this.usuario.rolId == 1) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  getListParametros() {
    this.dataApi.GetList('/Parametros').subscribe(parametrost => {
       this.parametros = parametrost;
      console.log("Entra parametros " + this.parametros[0].parametroClave);
    }, error => console.error(error));
  }

  onDeleteParametro(parametro: Parametro): void {
    const confirmacion = confirm('¿Quiere eliminar el registro?');
    if (confirmacion) {
      parametro.parametroEstatusDelete = true;
      this.dataApi.Put('/Parametros', parametro.parametroId, parametro)

      setTimeout(() => {
        this.getListParametros();
      }, 500);

    }
  }

  onPreUpdateParametro(parametro: Parametro) {
     this.dataApi.SelectedParametro = Object.assign({}, parametro);
  }

 }
