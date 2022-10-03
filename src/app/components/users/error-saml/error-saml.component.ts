import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-saml',
  templateUrl: './error-saml.component.html',
  styleUrls: ['./error-saml.component.css']
})
export class ErrorSamlComponent implements OnInit {

  constructor( private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.toastr.error('No se pudo iniciar sesión con su cuenta, contacte al administrador del sistema.', 'Error', {
      timeOut: 8000,
    });
  }

}
