import { ExcelColumna } from "./ExcelColumna";

export interface ExcelTipo {
    excelTipoId: number;
  
    excelTipoNombre?: string;
  
    excelTipoDescripcion?: string;

    excelColumna?: ExcelColumna[];
  }
  