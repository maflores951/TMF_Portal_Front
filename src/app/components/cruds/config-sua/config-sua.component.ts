import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
import { Parametro } from 'src/app/models/parametro';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfiguracionSua } from 'src/app/models/Sua/configuracionSua';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-config-sua',
  templateUrl: './config-sua.component.html',
  styleUrls: ['./config-sua.component.css']
})
export class ConfigSuaComponent implements OnInit {
  public static updateConfigSua: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService, private apiAuthService: AuthUserService, private spinner: SpinnerService, private toastr: ToastrService) {
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

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.getCurrentUser();
    this.getListConfigSua();
  }

  cambiarEstatusSpinner(estatus: boolean) {
    this.spinner.validarEspera(estatus);
  }

  getCurrentUser() {
    this.usuario = this.apiAuthService.usuarioData;
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
      this.cambiarEstatusSpinner(false);
    }, error => {
      console.error(error);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
      this.cambiarEstatusSpinner(false);
    });
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
    if (configuracionSua == null) {
      this.dataApi.SelectedconfiguracionSua = Object.assign({}, configuracionSua);
      this.dataApi.validarEspera([]);
      this.dataApi.cargarTipoExcel([{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
      { "excelTipoId": 2, "excelNombre": "Template", "excelTipoPeriodo" : 1 },
      { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
      { "excelTipoId": 5, "excelNombre": "EMA" , "excelTipoPeriodo" : 1}]);
      this.dataApi.cargarTipoPeriodo([{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
      { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]);
    
    } else {
      // console.log(JSON.stringify(configuracionSua));
     
      this.dataApi.SelectedconfiguracionSua = Object.assign({}, configuracionSua);
      this.dataApi.validarEspera(configuracionSua.configuracionSuaNivel);
      if(configuracionSua.configuracionSuaTipo == 1){
        this.dataApi.cargarTipoExcel([{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
        { "excelTipoId": 2, "excelNombre": "Template", "excelTipoPeriodo" : 1 },
        { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
        { "excelTipoId": 5, "excelNombre": "EMA" , "excelTipoPeriodo" : 1}]);
        this.dataApi.cargarTipoPeriodo([{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
        { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]);
      }else{
        this.dataApi.cargarTipoExcel([{ "excelTipoId": 1, "excelNombre": "Comparativo Especial", "excelTipoPeriodo" : 1 },
        { "excelTipoId": 3, "excelNombre": "Template bimestral" , "excelTipoPeriodo" : 2},
        { "excelTipoId": 4, "excelNombre": "SUA" , "excelTipoPeriodo" : 1},
        { "excelTipoId": 6, "excelNombre": "EBA" , "excelTipoPeriodo" : 2}]);
        this.dataApi.cargarTipoPeriodo([{ "tipoPeriodoId": 1, "tipoPeriodoNombre": "Mensual" },
        { "tipoPeriodoId": 2, "tipoPeriodoNombre": "Bimestral" }]);
      }
      
    }
  }
}