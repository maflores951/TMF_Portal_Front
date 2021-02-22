import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: any, arg: any): any {
    //  console.log(JSON.stringify(arg) + ' ***');
    if (arg.usuarioId === '' &&
    arg.email === '' &&
    arg.usuarioApellidoP === ''&&
    arg.usuarioApellidoM === '') return value;
    const resultUser = [];
    for(const user of value){
      // console.log(user.usuarioId + " Pipe entra");
      // if(user.usuarioId.indexof(arg) > -1){
      //   console.log("sip");
      // }
      // const userF: String = user.usuarioId.toString();
      // if(userF.indexOf(arg.usuarioId.toString()) > -1)
      // {
      //   // resultUser.push(user);
      // }
      //   else
      // {
      //       if (arg.email != "")
      //       {
      //         if(user.email.indexOf(arg.email) > -1)
      //         {
      //           // resultUser.push(user);
      //         }
      //         else
      //         {
      //             if (arg.usuarioApellidoP != "")
      //             {
      //               if(user.usuarioApellidoP.indexOf(arg.usuarioApellidoP) > -1)
      //               {
      //                 // resultUser.push(user);
      //               }
      //               else
      //               {
      //                   if (arg.usuarioApellidoP != "")
      //                   {
      //                     if(user.usuarioApellidoM.indexOf(arg.usuarioApellidoM) > -1)
      //                       {
      //                         resultUser.push(user);
      //                       };
      //                   }
      //               }
      //             }  
      //           }
      //       }
      //   }

        const userF: String = user.usuarioId.toString();
      if(userF.indexOf(arg.usuarioId.toString()) > -1)
      {
        if(user.email.toLowerCase().indexOf(arg.email.toLowerCase()) > -1)
        {
          if(user.usuarioApellidoP.toLowerCase().indexOf(arg.usuarioApellidoP.toLowerCase()) > -1)
          {
            if(user.usuarioApellidoM.toLowerCase().indexOf(arg.usuarioApellidoM.toLowerCase()) > -1)
              {
                resultUser.push(user);
              };
          };
        };
      };
    };
     return resultUser;
  }
}
