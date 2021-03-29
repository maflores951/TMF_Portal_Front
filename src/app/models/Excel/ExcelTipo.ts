import { ExcelColumna } from "./ExcelColumna";

export interface ExcelTipo {
    excelTipoId?: number;
  
    excelNombre?: string;
  
    excelTipoDescripcion?: string;

    excelTipoPeriodo?: number;

    excelColumna?: ExcelColumna[];
  }
  