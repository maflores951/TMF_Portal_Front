import { ConfiguracionSuaNivel } from "./configuracionSuaNivel";

export interface ConfiguracionSua {
    confSuaId: number;

    confSuaNombre?: string;

    configuracionSuaNivel?: ConfiguracionSuaNivel[];

    confSuaEstatus?: boolean;
  }
  