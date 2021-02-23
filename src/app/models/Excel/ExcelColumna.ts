import { EmpleadoColumna } from "../Empleado/EmpleadoColumna";

export interface ExcelColumna {
    excelColumnaId: number;
  
    excelColumnaNombre?: string;

    empleadoColumna?: EmpleadoColumna[];
  }
  