import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpresas'
})
export class FilterEmpresasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultEmpresa = [];
    for(const empresa of value){
        if(empresa.empresaNombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultEmpresa.push(empresa);
        };
        //Validar Id
        // console.log(empresa.empresaId + ' ' + arg + ' Pipe Empresa')
        // if(empresa.empresaId === arg)
        // {
        //    resultEmpresa.push(empresa);
        // };
    };
  return resultEmpresa;
  }

}
