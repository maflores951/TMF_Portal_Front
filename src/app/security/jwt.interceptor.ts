import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { $ } from "protractor";
import { Observable } from "rxjs";
import { AuthUserService } from "../services/auth-user.service";


@Injectable()

export class JwtInterceptor implements HttpInterceptor{
    
    constructor(private authUserService: AuthUserService){

    }

    intercept(request : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        const usuario = this.authUserService.usuarioData;
        // console.log(this.authUserService.usuarioData['usuarioId'] + ' ****');
        if(usuario){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer' ${usuario.usuarioToken}`
                }
            });
        }
        return next.handle(request);
    }
}