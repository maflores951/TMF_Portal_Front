import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRol'
})
export class FilterRolPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultRol = [];
    for(const rol of value){
        if(rol.rolNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRol.push(rol);
        };
    };
  return resultRol;
  }

}
