import { EmpleadoColumna } from "../Empleado/EmpleadoColumna";
import { ExcelColumna } from "../Excel/ExcelColumna";
import { ConfiguracionSuaNivel } from "./configuracionSuaNivel";

export interface SuaExcel {
    suaExcelId?: number;

    tipoPeriodoId: number;

    excelColumnaId?: number;

    excelColumna?: ExcelColumna;

    confSuaNId?: number;

    configuracionSuaNivel?: ConfiguracionSuaNivel;

    empleadoColumna?: EmpleadoColumna[];
  }