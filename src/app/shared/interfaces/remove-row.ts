import { MatTable } from "@angular/material/table";

export interface RemoveRow {
  index: number;
  id: string;
  table: MatTable<any>;
}
