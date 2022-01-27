import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { RemoveRow } from "../../../../shared/interfaces/remove-row";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  loading!: boolean;
  clients!: Client[];

  constructor(private service: ClientService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.loading = true;
    this.service.findAll().subscribe({
      next: (clients) => this.clients = clients,
      error: ({ error }) => this.snackbar.open(error.message, '', SNACKBAR_CONFIGURATION),
    }).add(() => this.loading = false)
  }

  remove(removeRow: RemoveRow) {
    this.service.remove(removeRow.id).subscribe({
      next: () => this.onRemoveSuccess(removeRow),
      error: ({ error }) => this.snackbar.open(error.message, '', SNACKBAR_CONFIGURATION)
    });
  }

  onRemoveSuccess({ index, table }: RemoveRow): void {
    this.clients.splice(index, 1);
    table?.renderRows();
  }
}
