import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";
import { RemoveRow } from "../../../../shared/interfaces/remove-row";
import { CLIENT_LIST_DISPLAY_COLUMNS } from "../../constants/client-list-display-columns";
import { Client } from "../../interfaces/client";

@Component({
  selector: 'app-client-list-table',
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.scss', '../../../../shared/scss/list-table.scss']
})
export class ClientListTableComponent {
  @Input() data!: Client[];
  @Output() removeItem = new EventEmitter<RemoveRow>();

  displayedColumns = CLIENT_LIST_DISPLAY_COLUMNS;

  constructor(private router: Router) {
  }

  remove(index: number, id: string): void {
    this.removeItem.emit({ index, id });
  }

  edit(id: string): void {
    this.router.navigate(['clientes', id])
  }
}
