import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Client } from "../../interfaces/client";
import { RemoveRow } from "../../../../shared/interfaces/remove-row";
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

  remove({ id, index }: RemoveRow) {
    this.service.remove(id).subscribe({
      next: () => this.clients.splice(index, 1),
      error: ({ error }) => this.snackbar.open(error.message, '', SNACKBAR_CONFIGURATION)
    });
  }
}
