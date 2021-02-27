import { ExcelColumna } from "./ExcelColumna";

export interface ExcelTipo {
    excelTipoId: number;
  
    excelTipoNombre?: string;
  
    excelTipoDescripcion?: string;

    excelTipoPeriodo?: number;

    excelColumna?: ExcelColumna[];
  }
  