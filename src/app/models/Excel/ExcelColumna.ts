import { SuaExcel } from "../Sua/SuaExcel";
import { ExcelTipo } from "./ExcelTipo";

export interface ExcelColumna {
  excelColumnaId: number;

  excelColumnaNombre?: string;

  excelTipoId: number;

  excelPosicion: number;

  suaExcel?: SuaExcel[];
}
