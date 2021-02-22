import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private dataApi: DataApiService) {}
  public respuesta: Response;

  // public Get() {
  //   this.dataApi.GetList('/Tarjetas')
  //     .subscribe((result: Tarjeta[]) => {
  //       this.tarjeta = result;
  //       console.log(this.tarjeta[5].TarjetaNumero);
  //     }, error => console.error(error + "Error Api"));
  // }

}

