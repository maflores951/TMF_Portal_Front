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
        if (usuario.rolId == 2 || usuario.rolId == 1 || usuario.rolId == 4){
          return true;
        }
           this.router.navigate(['']);
           return false;
      }  
}
