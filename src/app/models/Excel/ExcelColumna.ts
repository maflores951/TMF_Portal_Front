import { SuaExcel } from "../Sua/SuaExcel";

export interface ExcelColumna {
    excelColumnaId: number;
  
    excelColumnaNombre?: string;

    excelTipoId: number;

    suaExcel?: SuaExcel[];
  }
  