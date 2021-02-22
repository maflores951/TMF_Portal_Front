import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterParametro'
})
export class FilterParametroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg.paramemtroNombre === '' &&
        arg.parametroClave === '') return value;
    const resultParametro = [];
    for(const parametro of value){
          if(parametro.parametroNombre.toLowerCase().indexOf(arg.parametroNombre.toLowerCase()) > -1)
          {
            if(parametro.parametroClave.toLowerCase().indexOf(arg.parametroClave.toLowerCase()) > -1)
            {
              resultParametro.push(parametro);
            };
          };
    };
  return resultParametro;
  }
}