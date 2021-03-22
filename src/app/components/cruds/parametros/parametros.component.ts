import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
import { Parametro } from 'src/app/models/parametro';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Usuario } from 'src/app/models/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  public static updateParametros: Subject<boolean> = new Subject();

  constructor(private dataApi: DataApiService,private apiAuthService: AuthUserService, private spinner: SpinnerService, private toastr: ToastrService) {
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

  ngOnInit() {
    this.cambiarEstatusSpinner(true);
    this.getCurrentUser();
    this.getListParametros();
  }
  
  cambiarEstatusSpinner(estatus : boolean){
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

  getListParametros() {
    this.dataApi.GetList('/Parametros').subscribe(parametrost => {
       this.parametros = parametrost;
       this.cambiarEstatusSpinner(false);
    }, error => {
      console.error(error);
      this.toastr.error('Error en el servidor, contacte al administrador del sistema.', 'Error', {
        timeOut: 3000
      });
      this.cambiarEstatusSpinner(false);
    });
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
