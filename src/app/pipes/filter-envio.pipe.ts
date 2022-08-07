import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEnvio'
})
export class FilterEnvioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // var periodoNumero = 0;
    // switch (arg.selectPeriodoTipo) {
    //   case 1:
    //     periodoNumero = arg.selectPeriodoNumeroM;
    //     break;
    //   case 2:
    //     periodoNumero = arg.selectPeriodoNumeroQ;
    //     break;
    //   case 3:
    //     periodoNumero = arg.selectPeriodoNumeroS;
    //     break;
    //   default:
    //     break;
    // }


    //  console.log(JSON.stringify(arg) + " ******")
    // if (arg.empleadoNoEmp === '' &&
    //     arg.empresaNombre === '' &&
    //     arg.selectPeriodoTipo === '' &&
    //     arg.selectMes === '' &&
    //     arg.selectAnio === '' &&
    //     periodoNumero === 0) return value;

    // console.log(value)
    if(!value) return value;
    const resultRecibo = [];
    for(const recibo of value){
        // const reciboNoEmp: String = recibo.UsuarioNoEmp.toString();
      // if(reciboNoEmp.indexOf(arg.empleadoNoEmp.toString()) > -1)
      // {
        if(recibo.empresa.empresaNombre.toLowerCase().indexOf(arg.empresaNombre.toLowerCase()) > -1)
          {
            if(recibo.periodoTipoId === arg.selectPeriodoTipo)
              {
                if(recibo.reciboPeriodoA === arg.selectAnio)
                  {
                    if(recibo.reciboPeriodoM === arg.selectMes)
                      {
                        if(recibo.reciboPeriodoNumero == arg.selectPeriodoNumero)
                          {
                            if(arg.empleadoNoEmp === ''){
                              resultRecibo.push(recibo);
                            }else{
                              // console.log(recibo.usuarioNoEmp + " arg.empleadoNoEmp " + arg.empleadoNoEmp)
                              if(recibo.usuarioNoEmp.toLowerCase().indexOf(arg.empleadoNoEmp.toLowerCase()) > -1){
                                resultRecibo.push(recibo);
                              }
                            }
                          };
                      };
                  };
              };
          };
      // };
    };
     return resultRecibo;
    // return value;
  }
  
}
