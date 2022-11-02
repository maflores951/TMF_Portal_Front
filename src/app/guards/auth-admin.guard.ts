import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  
  constructor(private router: Router,private apiAuthService: AuthUserService ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const usuario = this.apiAuthService.usuarioData;
      // console.log(usuario );
      if(usuario != null){
        if (usuario.rolId == 1 || usuario.rolId == 4){
          return true;
        }
      }
     
      // console.log("Entra");
         this.router.navigate(['/user/login']);
         return false;
    }  
  
}
