import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { $ } from "protractor";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario";
import { AuthUserService } from "../services/auth-user.service";


@Injectable()

export class JwtInterceptor implements HttpInterceptor{
    
    public usuario :Usuario;
    constructor(private authUserService: AuthUserService){
        
    }

    intercept(request : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
       
        this.usuario = this.authUserService.usuarioData;
        // console.log(this.usuario + ' Interceptor' );
        if(this.usuario){
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.usuario.usuarioToken}`
                }
            });
        }
        return next.handle(request);
    }
}