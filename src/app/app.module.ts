import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, FormControl, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
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
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
