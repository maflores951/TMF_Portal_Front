import { ConfiguracionSuaNivel } from "./configuracionSuaNivel";

export interface ConfiguracionSua {
    configuracionSuaId?: number;

    confSuaNombre?: string;

    confSuaEstatus?: boolean;

    configuracionSuaNivel?: ConfiguracionSuaNivel[];

    configuracionSuaTipo?: Number;
  }