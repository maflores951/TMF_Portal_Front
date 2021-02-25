import { ConfiguracionSua } from "./configuracionSua";
import { SuaExcel } from "./SuaExcel";

export interface ConfiguracionSuaNivel {
    configuracionSuaNivelId?: number;
  
    confSuaNNombre?: string;

    confSuaId?: number;

    configuracionSua?: ConfiguracionSua;

    suaExcel?: SuaExcel[];
  }
  