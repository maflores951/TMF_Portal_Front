import { SuaExcel } from "../Sua/SuaExcel";
import { EmpleadoColumnaV } from "./EmpleadoColumnaV";

export interface EmpleadoColumna {
    empleadoColumnaId?: number;

    empleadoColumnaNo?: string;
  
    empleadoColumnaMes?: number;

    empleadoColumnaAnio?: number;

    suaExcelId?: number;

    suaExcel?: SuaExcel;

    empleadoColumnaValor?: string;

    excelColumnaNombre?: string;

    configuracionSuaId?: number;

    excelTipoId?: number;

    // empleadoColumnaV?: EmpleadoColumnaV[];
  }
  