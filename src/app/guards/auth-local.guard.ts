import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalGuard implements CanActivate {
  
  constructor(private router: Router,private apiAuthService: AuthUserService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | 
      UrlTree {
        const usuario = this.apiAuthService.usuarioData;
          // return true;
          // console.log(usuario + ' Entra guards');
          console.log(JSON.stringify(usuario) + ' Entra guards Local');
        if (usuario.rolId == 2 || usuario.rolId == 1){
          return true;
        }
        // console.log('Entra');
        // this.tokenResponse = JSON.parse(sessionStorage.getItem('Token'));
        // if (this.tokenResponse == null) {
           this.router.navigate(['']);
           return false;
        //   console.log('user No loggd');
        // } else {
          //  return true//console.log('user loggd');
        // }
      }  
}
