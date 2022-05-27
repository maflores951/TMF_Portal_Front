import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {



  transform(value: any, arg: any): any {
    if (arg.usuarioId === '' &&
    arg.email === '' &&
    arg.usuarioApellidoP === '') return value;
    const resultUser = [];
    for(const user of value){
        const userF: String = user.usuarioId.toString();
      if(userF.toLowerCase().indexOf(arg.usuarioId.toString().toLowerCase()) > -1)
      {
        if(user.email.toLowerCase().indexOf(arg.email.toLowerCase()) > -1)
        {
          if(user.usuarioApellidoP.toLowerCase().indexOf(arg.usuarioApellidoP.toLowerCase()) > -1)
          {
            // if(user.usuarioApellidoM.toLowerCase().indexOf(arg.usuarioApellidoM.toLowerCase()) > -1)
            //   {
                resultUser.push(user);
              // };
          };
        };
      };
    };
     return resultUser;
  }
}
