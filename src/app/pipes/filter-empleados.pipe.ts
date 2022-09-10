import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpleados',
})
export class FilterEmpleadosPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (
      arg.empleadoNoEmp === '' &&
      arg.email === '' &&
      arg.emailSSO === '' &&
      arg.usuarioApellidoP === '' &&
      arg.empresaNombre === ''
    )
      return value;
    // console.log(arg)
    const resultUser = [];
    for (const user of value) {
      // console.log(value)
      // const userF: String = user.empleadoNoEmp.toString();
      if (
        user.empleadoNoEmp
          .toLowerCase()
          .indexOf(arg.empleadoNoEmp.toLowerCase()) > -1
      ) {
        if (user.email.toLowerCase().indexOf(arg.email.toLowerCase()) > -1) {
          if (
            user.emailSSO.toLowerCase().indexOf(arg.emailSSO.toLowerCase()) > -1
          ) {
            if (
              user.usuarioApellidoP
                .toLowerCase()
                .indexOf(arg.usuarioApellidoP.toLowerCase()) > -1
            ) {
              if (
                user.empresa.empresaNombre
                  .toLowerCase()
                  .indexOf(arg.empresaNombre.toLowerCase()) > -1
              ) {
                resultUser.push(user);
              }
            }
          }
        }
      }
    }
    return resultUser;
  }
}
