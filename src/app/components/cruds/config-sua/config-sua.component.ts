import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
import { Parametro } from 'src/app/models/parametro';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';

@Component({
  selector: 'app-config-sua',
  templateUrl: './config-sua.component.html',
  styleUrls: ['./config-sua.component.css']
})
export class ConfigSuaComponent implements OnInit {
  public static updateConfigSua: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService) {
    ConfigSuaComponent.updateConfigSua.subscribe(res => {
      setTimeout(() => {
        this.getListConfigSua();
      }, 300)
    })
  }

  public confSuaNombre = '';
  public usuario: Usuario;
  public configuracionSuas: ConfiguracionSua[];
  public isAdmin: any = null;
  public userUid: number = null;
  // public tokenResponse: TokenResponse;

  ngOnInit() {
    // this.spinnerService.showAll();
    this.cambiarEstatusSpinner(true);
    this.getCurrentUser();
    this.getListConfigSua();
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

  getListConfigSua() {
    this.dataApi.GetList('/ConfiguracionSuas').subscribe(ConfigSuaList => {
       this.configuracionSuas = ConfigSuaList;
      // console.log("Entra parametros " + this.parametros[0].parametroClave);
    }, error => console.error(error));
  }

  onDeleteSua(configuracionSua: ConfiguracionSua): void {
    const confirmacion = confirm('¿Quiere eliminar el registro?');
    if (confirmacion) {
      configuracionSua.confSuaEstatus = true;
      this.dataApi.Put('/ConfiguracionSuas', configuracionSua.configuracionSuaId, configuracionSua)

      setTimeout(() => {
        this.getListConfigSua();
      }, 500);

    }
  }

  onPreUpdateSua(configuracionSua: ConfiguracionSua) {
    if (configuracionSua == null){
          this.dataApi.validarEspera([]);
          this.dataApi.SelectedconfiguracionSua = Object.assign({}, configuracionSua);
    }else{
          this.dataApi.validarEspera(configuracionSua.configuracionSuaNivel);
          this.dataApi.SelectedconfiguracionSua = Object.assign({}, configuracionSua);
  }
    }


 }