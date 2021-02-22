import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { ApiUsuarioService } from '../services/api-usuario.service';
import { AuthUserService } from '../services/auth-user.service';
// import { TokenResponse } from '../models/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private apiAuthService: AuthUserService ){}
  // public tokenResponse: TokenResponse;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = this.apiAuthService.usuarioData;
      // return true;
      // console.log(usuario + ' Entra guards');
    if (usuario){
      return true;
    }
    // console.log('Entra');
    // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
    // if (this.tokenResponse == null) {
       this.router.navigate(['/user/login']);
       return false;
    //   console.log('user No loggd');
    // } else {
      //  return true//console.log('user loggd');
    // }
  }
  
}
