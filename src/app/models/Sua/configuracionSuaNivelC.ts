import { ExcelColumna } from "../Excel/ExcelColumna";
import { ConfiguracionSuaNivel } from "./configuracionSuaNivel";

export interface ConfiguracionSuaNivelC {
    confSuaNCId: number;
  
    confSuaNId?: number;
  
    excelcolumnaId?: number | null;

    ConfiguracionSuaNivel?: ConfiguracionSuaNivel;

    excelColumna?: ExcelColumna;
  }
  