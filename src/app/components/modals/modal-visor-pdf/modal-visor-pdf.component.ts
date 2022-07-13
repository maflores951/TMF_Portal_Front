import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { DataApiService } from 'src/app/services/data-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-visor-pdf',
  templateUrl: './modal-visor-pdf.component.html',
  styleUrls: ['./modal-visor-pdf.component.css']
})
export class ModalVisorPDfComponent implements OnInit {

  public src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  public url = environment.baseUrl + '/';
  
  constructor(public dataApi: DataApiService) { 
   
  }

  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
  @Input() userUid: number;
  
  ngOnInit(): void {
    this.src = this.dataApi.SelectedUsuarioPDF
    console.log("Descargar")
  }

  CerrarMP(): void {
    console.log("Cerrar")
  }

  async Descargar() {
    // var urlfinal = this.url + archivo;
    let blob = await fetch(this.dataApi.SelectedUsuarioPDF).then((r) => r.blob());
    var random = Math.random() * (1000 - 100) + 100;
    var nombre = 'Recibo_' + random.toFixed(0) + '.pdf';
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  pageInitialized(e: CustomEvent) {
    console.log('(pages-initialized)', e);
  }

  callBackFn(pdf: PDFDocumentProxy) {
    console.log('(callback)');
 }

}
