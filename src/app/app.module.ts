import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule,
  FormControl,
  Validators,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { JwtInterceptor } from './security/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { Page404Component } from './components/page404/page404.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterParametroPipe } from './pipes/filter-parametro.pipe';
import { FilterRolPipe } from './pipes/filter-rol.pipe';
import { MatSpinnerOverlayComponent } from './spinner/mat-spinner-overlay/mat-spinner-overlay.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
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
import { ModalVisorPDfComponent } from './components/modals/modal-visor-pdf/modal-visor-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarEmailMasivoComponent } from './components/modals/Empleados/actualizar-email-masivo/actualizar-email-masivo.component';
import { EliminarEmpleadoMasivoComponent } from './components/modals/Empleados/eliminar-empleado-masivo/eliminar-empleado-masivo.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { OAuthModule } from 'angular-oauth2-oidc';
// import { LoginGoogleComponent } from './components/users/login-google/login-google.component';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MatButtonModule } from '@angular/material/button';
import { JwtInterceptor } from './security/jwt.interceptor';
import { InicioSamlComponent } from './components/users/inicio-saml/inicio-saml.component';
import { ActualizarEmpresaMasivoComponent } from './components/modals/Empleados/actualizar-empresa-masivo/actualizar-empresa-masivo.component';
import { ErrorSamlComponent } from './components/users/error-saml/error-saml.component';
// import { userInfo } from 'os';

// const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


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
    ModalVisorPDfComponent,
    ActualizarEmailMasivoComponent,
    EliminarEmpleadoMasivoComponent,
    InicioSamlComponent,
    ActualizarEmpresaMasivoComponent,
    ErrorSamlComponent,
    // LoginGoogleComponent,
    
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
    MatButtonModule,
    MatInputModule,
    AutocompleteLibModule,
    MatTableExporterModule,
    TooltipModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxPaginationModule,
    PdfViewerModule,
    NgbModule,
    // SocialLoginModule,
    // OAuthModule.forRoot(),
    ////Configuracion para el SSO
  //   MsalModule.forRoot(new PublicClientApplication({
  //     auth: {
  //       clientId: '8f4d0b0a-51b1-43ae-bb34-cb0e9bdb65a7', // Application (client) ID from the app registration
  //       authority: 'https://login.microsoftonline.com/11213b50-17df-49ab-bb19-23220120e176', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
  //       redirectUri: 'http://localhost:4200'// This is your redirect URI
  //     },
  //     cache: {
  //       cacheLocation: 'sessionStorage',
  //       storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  //   }
  // }), {
  //   interactionType: InteractionType.Redirect,
  //   authRequest: {
  //     scopes: ['user.read']
  //     }
  // }, {
  //   interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
  //   protectedResourceMap: new Map([ 
  //       ['https://graph.microsoft.com/v1.0/me', ['user.read'],
  //     ]
  //   ])
  // })
  // ],
  // providers: [{
  //    provide:  HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true 
  //   },
    //Configuracion original
  //   MsalModule.forRoot( new PublicClientApplication({
  //     auth: {
  //       clientId: '8f4d0b0a-51b1-43ae-bb34-cb0e9bdb65a7', // Application (client) ID from the app registration
  //       authority: 'https://login.microsoftonline.com/organizations', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
  //       redirectUri: 'http://localhost:4200'// This is your redirect URI
  //     },
  //     cache: {
  //       cacheLocation: 'localStorage',
  //       storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  //     }
  //   }), null, null)
   ],
  providers: [{
     provide:  HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
    },
  //   MsalModule.forRoot( new PublicClientApplication({
  //     auth: {
  //       clientId: '8f4d0b0a-51b1-43ae-bb34-cb0e9bdb65a7', // Application (client) ID from the app registration
  //       authority: 'https://login.microsoftonline.com/organizations', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
  //       redirectUri: 'http://localhost:4200'// This is your redirect URI
  //     },
  //     cache: {
  //       cacheLocation: 'localStorage',
  //       storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  //     }
  //   }), null, null)
  // ],
  // providers: [{
  //    provide:  HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
  //   },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false, //keeps the user signed in
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('954536317663-lf7v587pn250oldsk27i3u34lnnld9ig.apps.googleusercontent.com') // your client id
    //       }
    //     ] 
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
