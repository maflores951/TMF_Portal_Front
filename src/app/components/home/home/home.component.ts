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
}

