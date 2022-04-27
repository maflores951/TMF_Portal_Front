import { Empresa } from './empresa';
import { Rol } from "./rol";

export interface Usuario {
  usuarioId: number | null;

  usuarioNombre?: string | null;

  usuarioApellidoP?: string | null;

  usuarioApellidoM?: string | null;

  usuarioNumConfirmacion?: number | null;

  usuarioFechaLimite?: Date | string | null;

  usuarioEstatusSesion?: boolean | null;

  password?: string | null;

  email?: string | null;

  usuarioClave?: string |null;

  imagePath?: string | null;

  imageFullPath?: string;

  rolId?: number | null;

  rol?: Rol;

  imageBase64?: string;

  usuarioToken?: string;

  usuarioFullName?: string;

  empleadoNoEmp?: string;

  empleadoRFC?: string;

  empresaId?: number;

  empresa?: Empresa;
}




