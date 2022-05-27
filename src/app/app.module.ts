import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, FormControl, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuariosComponent } from './components/cruds/usuarios/usuarios.component';
import { RolesComponent } from './components/cruds/roles/roles.component';
import { ParametrosComponent } from './components/cruds/parametros/parametros.component';
import { HomeComponent } from './components/home/home/home.component';
import { ModalUsuarioComponent } from './components/modals/modal-usuario/modal-usuario.component';
import { ModalRolComponent } from './components/modals/modal-rol/modal-rol.component';
import { ModalParametroComponent } from './components/modals/modal-parametro/modal-parametro.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AsignarPassComponent } from './components/users/asignar-pass/asignar-pass.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegistroComponent } from './components/users/registro/registro.component';
import { RecuperarPassComponent } from './components/users/recuperar-pass/recuperar-pass.component';
import { PerfilComponent } from './components/users/perfil/perfil.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { JwtInterceptor } from './security/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { Page404Component } from './components/page404/page404.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterParametroPipe } from './pipes/filter-parametro.pipe';
import { FilterRolPipe } from './pipes/filter-rol.pipe';
import { MatSpinnerOverlayComponent } from './spinner/mat-spinner-overlay/mat-spinner-overlay.component';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { MatTableExporterModule } from 'mat-table-exporter';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { EmpresasComponent } from './components/cruds/empresas/empresas.component';
import { ModalEmpresaComponent } from './components/modals/modal-empresa/modal-empresa.component';
import { CargarRecibosComponent } from './components/cargarRecibos/cargar-recibos/cargar-recibos.component';
import { ConsultaReciboComponent } from './components/consultaRecibo/consulta-recibo/consulta-recibo.component';
import { EnviarRecibosComponent } from './components/enviar-recibos/enviar-recibos.component';
import { BorrarRecibosComponent } from './components/borrar-recibos/borrar-recibos.component';
import { FilterEmpresasPipe } from './pipes/filter-empresas.pipe';
import { EmpleadosComponent } from './components/cruds/empleados/empleados.component';
import { ModalEmpleadosComponent } from './components/modals/modal-empleados/modal-empleados.component';
import { FilterEmpleadosPipe } from './pipes/filter-empleados.pipe';
import { ModalCargaMasivaComponent } from './components/modals/modal-carga-masiva/modal-carga-masiva.component';
import { FilterEnvioPipe } from './pipes/filter-envio.pipe';
import { FilterConsultaPipe } from './pipes/filter-consulta.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CargaMasivaArchivosComponent } from './components/carga-masiva-archivos/carga-masiva-archivos.component';



@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    RolesComponent,
    ParametrosComponent,
    HomeComponent,
    ModalUsuarioComponent,
    ModalRolComponent,
    ModalParametroComponent,
    NavbarComponent,
    AsignarPassComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarPassComponent,
    PerfilComponent,
    Page404Component,
    FilterPipe,
    FilterParametroPipe,
    FilterRolPipe,
    MatSpinnerOverlayComponent,
    EmpresasComponent,
    ModalEmpresaComponent,
    CargarRecibosComponent,
    ConsultaReciboComponent,
    EnviarRecibosComponent,
    BorrarRecibosComponent,
    FilterEmpresasPipe,
    EmpleadosComponent,
    ModalEmpleadosComponent,
    FilterEmpleadosPipe,
    ModalCargaMasivaComponent,
    FilterEnvioPipe,
    FilterConsultaPipe,
    CargaMasivaArchivosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteLibModule,
    MatTableExporterModule,
    TooltipModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
