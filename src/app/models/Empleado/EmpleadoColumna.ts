import { ExcelColumna } from "../Excel/ExcelColumna";

export interface EmpleadoColumna {
    empleadoColumnaId: number;
  
    empleadoColumnaMes?: string;

    empleadoColumnaAnio?: number;

    empleadoColumnaTipo?: number;

    empleadoColumnaNo?: number;

    excelColumnaId?: number;

    excelColumna?: ExcelColumna;
  }
  