import { InicioSamlComponent } from './components/users/inicio-saml/inicio-saml.component';
// import { LoginGoogleComponent } from './components/users/login-google/login-google.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { CargaMasivaArchivosComponent } from './components/carga-masiva-archivos/carga-masiva-archivos.component';
import { EmpleadosComponent } from './components/cruds/empleados/empleados.component';
import { BorrarRecibosComponent } from './components/borrar-recibos/borrar-recibos.component';
import { CargarRecibosComponent } from './components/cargarRecibos/cargar-recibos/cargar-recibos.component';
import { ConsultaReciboComponent } from './components/consultaRecibo/consulta-recibo/consulta-recibo.component';
import { EnviarRecibosComponent } from './components/enviar-recibos/enviar-recibos.component';
import { EmpresasComponent } from './components/cruds/empresas/empresas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametrosComponent } from './components/cruds/parametros/parametros.component';
import { RolesComponent } from './components/cruds/roles/roles.component';
import { UsuariosComponent } from './components/cruds/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { AsignarPassComponent } from './components/users/asignar-pass/asignar-pass.component';
import { LoginComponent } from './components/users/login/login.component';
import { PerfilComponent } from './components/users/perfil/perfil.component';
import { RecuperarPassComponent } from './components/users/recuperar-pass/recuperar-pass.component';
import { RegistroComponent } from './components/users/registro/registro.component';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminItGuard } from './guards/auth-admin-it.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/RecuperaPass', component: RecuperarPassComponent },
  { path: 'user/AsignarPass/:token', component: AsignarPassComponent },
  { path: 'user/InicioSaml/:tokenUser', component: InicioSamlComponent },
  // { path: 'user/loginGoogle', component: LoginGoogleComponent },
  // { path: 'user/registro', component: RegistroComponent },
  { path: 'recibo/consultar-recibo', component: ConsultaReciboComponent, canActivate: [AuthLocalGuard]},
  { path: 'catalogos/catalogo-parametros', component: ParametrosComponent, canActivate: [AuthGuard]},
  { path: 'catalogos/catalogo-usuarios', component: UsuariosComponent, canActivate: [AuthAdminItGuard] },
  { path: 'catalogos/catalogo-empleados', component: EmpleadosComponent, canActivate: [AuthAdminItGuard] },
  { path: 'catalogos/catalogo-roles', component: RolesComponent, canActivate: [AuthAdminItGuard] },
  { path: 'catalogos/catalogo-empresas', component: EmpresasComponent, canActivate: [AuthAdminItGuard] },
  { path: 'recibo/enviar-recibo', component: EnviarRecibosComponent, canActivate: [AuthAdminGuard] },
  { path: 'recibo/cargar-recibo', component: CargarRecibosComponent, canActivate: [AuthAdminGuard] },
  { path: 'recibo/borrar-recibo', component: BorrarRecibosComponent, canActivate: [AuthAdminGuard] },
  // { path: 'recibo/carga-masiva', component: CargaMasivaArchivosComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
