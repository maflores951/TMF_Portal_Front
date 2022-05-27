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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/RecuperaPass', component: RecuperarPassComponent },
  { path: 'user/AsignarPass/:token', component: AsignarPassComponent },
  // { path: 'user/registro', component: RegistroComponent },
  { path: 'catalogos/catalogo-parametros', component: ParametrosComponent, canActivate: [AuthGuard]},
  { path: 'catalogos/catalogo-usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/catalogo-empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/catalogo-roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/catalogo-empresas', component: EmpresasComponent, canActivate: [AuthGuard] },
  { path: 'recibo/enviar-recibo', component: EnviarRecibosComponent, canActivate: [AuthGuard] },
  { path: 'recibo/consultar-recibo', component: ConsultaReciboComponent, canActivate: [AuthGuard] },
  { path: 'recibo/cargar-recibo', component: CargarRecibosComponent, canActivate: [AuthGuard] },
  { path: 'recibo/borrar-recibo', component: BorrarRecibosComponent, canActivate: [AuthGuard] },
  { path: 'recibo/carga-masiva', component: CargaMasivaArchivosComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
