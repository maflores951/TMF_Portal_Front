import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Recibo } from 'src/app/models/recibo';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-carga-masiva-archivos',
  templateUrl: './carga-masiva-archivos.component.html',
  styleUrls: ['./carga-masiva-archivos.component.css']
})
export class CargaMasivaArchivosComponent implements OnInit {

  private recibo: Recibo;
  public numeroArchivos: number;

  constructor( public dataApi: DataApiService,
    private toastr: ToastrService,
    private spinner: SpinnerService,
    private apiAuthService: AuthUserService) { }

  ngOnInit(): void {
  }

    //Se activa o inactiva el spinner
    cambiarEstatusSpinner(estatus: boolean) {
      this.spinner.validarEspera(estatus);
    }

  public cargarArchivo() {
    this.cambiarEstatusSpinner(true);


        this.recibo = {
          reciboId: 0,
          reciboPeriodoA: 0,
          reciboPeriodoM: 0,
          reciboPeriodoD: 0,
          reciboPeriodoNumero: this.numeroArchivos,
          periodoTipoId: 0,
          usuarioNoEmp: null,
          reciboEstatus: true,
          empresa: null,
          empresaId: 0,
        };

        setTimeout(() => {
          this.dataApi.Post('/Recibos/CargaMasivaArchivos', this.recibo).subscribe(
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
                  timeOut: 6000,
                }
              );
            }
          );
        }, 1000);
      }

}
