import { Usuario } from './usuario';
import { Empresa } from './empresa';
import { PeriodoTipo } from "./periodoTipo";

export interface Recibo {
    reciboId?: number;
  
    reciboPeriodoA?: number;
  
    reciboPeriodoM?: number;
  
    reciboPeriodoD?: number;

    reciboPeriodoNumero?: number;
  
    periodoTipoId?: number;
  
    periodoTipo?: PeriodoTipo;

    reciboEstatus: boolean;
  
    reciboPath?: string;

    usuarioNoEmp?: string;

    empresa?: Empresa;

    empresaId?: number;

    usuario?: Usuario;
  }
