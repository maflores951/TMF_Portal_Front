import { ExcelColumna } from "../Excel/ExcelColumna";
import { SuaExcel } from "../Sua/SuaExcel";

export interface EmpleadoColumna {
    empleadoColumnaId?: number;

    empleadoColumnaNo?: string;
  
    empleadoColumnaMes?: number;

    empleadoColumnaAnio?: number;

    // suaExcelId?: number;

    // suaExcel?: SuaExcel;

    empleadoColumnaValor?: string;

    excelColumnaNombre?: string;

    configuracionSuaId?: number;

    excelTipoId?: number;

    excelColumnaId?: number;

    excelColumna?: ExcelColumna;

    // empleadoColumnaV?: EmpleadoColumnaV[];
  }
  