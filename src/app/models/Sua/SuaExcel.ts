import { EmpleadoColumna } from "../Empleado/EmpleadoColumna";
import { ExcelColumna } from "../Excel/ExcelColumna";
import { ExcelTipo } from "../Excel/ExcelTipo";
import { ConfiguracionSuaNivel } from "./configuracionSuaNivel";

export interface SuaExcel {
    suaExcelId?: number;

    // tipoPeriodoId: number;
    ExcelTipoId: number;

    excelColumnaId?: number;

    excelColumna?: ExcelColumna;

    excelTipo: ExcelTipo;

    confSuaNId?: number;

    configuracionSuaNivel?: ConfiguracionSuaNivel;

    empleadoColumna?: EmpleadoColumna[];
  }