import { ConfiguracionSuaNivelC } from "./configuracionSuaNivelC";

export interface ConfiguracionSuaNivel {
    confSuaNId: number;
  
    confSuaNNombre?: string;
  
    confSuaNTipo?: number | null;

    configuracionSuaNivelC? : ConfiguracionSuaNivelC[];
  }
  