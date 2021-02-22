import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TMF Group';

  constructor(private spinner: SpinnerService) {

  }

   public IsWait : boolean;
  ngOnInit() {
    this.spinner.validarEsperaObservable.subscribe(response => {
      this.IsWait = response;
    });
  }

}
