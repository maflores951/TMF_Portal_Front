import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionSuaComponent } from './components/configuracionSua/configuracion-sua/configuracion-sua.component';
import { ConfigSuaComponent } from './components/cruds/config-sua/config-sua.component';
import { ParametrosComponent } from './components/cruds/parametros/parametros.component';
import { RolesComponent } from './components/cruds/roles/roles.component';
import { UsuariosComponent } from './components/cruds/usuarios/usuarios.component';
import { CargarExcelComponent } from './components/excel/cargar-excel/cargar-excel.component';
import { HomeComponent } from './components/home/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { ReporteCompararSuaComponent } from './components/reportes/reporte-comparar-sua/reporte-comparar-sua.component';
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
  { path: 'catalogos/catalogo-roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'configuracion/catalogo-sua', component: ConfigSuaComponent, canActivate: [AuthLocalGuard] },
  { path: 'configuracion/cargarDatos', component: CargarExcelComponent, canActivate: [AuthLocalGuard] },
  { path: 'reportes/reporteSua', component: ReporteCompararSuaComponent, canActivate: [AuthLocalGuard] },
  { path: '**', component: Page404Component }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
