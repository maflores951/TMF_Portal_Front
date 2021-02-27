import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSua'
})
export class FilterSuaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // console.log(arg + ' ***');
    if (arg === '') return value;
    const resultSua = [];
    for(const rol of value){
        if(rol.confSuaNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultSua.push(rol);
        };
    };
  return resultSua;
  }

}
