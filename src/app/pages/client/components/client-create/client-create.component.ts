import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCreateComponent {
  loading!: boolean;

  constructor(private service: ClientService, private router: Router, private snackbar: MatSnackBar) {
  }

  onSubmit(client: Client) {
    this.loading = true;
    this.service.create(client).subscribe({
      next: (client) => this.router.navigate(['clientes', client.id]),
      error: ({ error }) => this.snackbar.open(error.message, undefined, SNACKBAR_CONFIGURATION)
    }).add(() => this.loading = false);
  }
}
