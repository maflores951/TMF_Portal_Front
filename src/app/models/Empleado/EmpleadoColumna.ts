import { SuaExcel } from "../Sua/SuaExcel";
import { EmpleadoColumnaV } from "./EmpleadoColumnaV";

export interface EmpleadoColumna {
    empleadoColumnaId: number;
  
    empleadoColumnaMes?: number;

    empleadoColumnaAnio?: number;

    suaExcelId?: number;

    suaExcel?: SuaExcel;

    empleadoColumnaV?: EmpleadoColumnaV[];
  }
  