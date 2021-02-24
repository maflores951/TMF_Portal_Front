import { ExcelColumna } from "../Excel/ExcelColumna";
import { TipoPeriodo } from "../TipoPeriodo";

export interface SuaExcel {
    suaExcelId: number;

    tipoPeriodoId: number;

    excelColumnaId?: number;

    confSuaNId?: number;

    tipoPeriodo?: TipoPeriodo;

    excelColumna?: ExcelColumna;
  }