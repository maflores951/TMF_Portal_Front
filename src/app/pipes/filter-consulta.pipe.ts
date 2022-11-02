import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterConsulta'
})
export class FilterConsultaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultRecibo = [];
    for(const recibo of value){
      if(recibo.reciboPeriodoA === arg.selectAnio)
      {
        if(recibo.reciboPeriodoM === arg.selectMes)
          {
            resultRecibo.push(recibo);
          }
      };
    }
     return resultRecibo;

    // return value;
  }
}
