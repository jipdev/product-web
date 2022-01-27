import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { RemoveRow } from 'src/app/shared/interfaces/remove-row';
import { PRODUCT_LIST_DISPLAY_COLUMNS } from "../../constants/product-list-display-columns";
import { Product } from "../../interfaces/product";

@Component({
  selector: 'app-product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list-table.component.scss', '../../../../shared/scss/list-table.scss']
})
export class ProductListTableComponent {
  @Input() data!: Product[];
  @Output() removeItem = new EventEmitter<RemoveRow>();

  @ViewChild(MatTable) table!: MatTable<Product>;

  displayedColumns = PRODUCT_LIST_DISPLAY_COLUMNS;

  constructor(private router: Router) {
  }

  remove(index: number, id: string): void {
    this.removeItem.emit({ index, id, table: this.table });
  }

  edit(id: string): void {
    this.router.navigate(['/produtos', id])
  }
}
