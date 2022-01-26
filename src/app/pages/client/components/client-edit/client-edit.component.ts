import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { RequestError } from "../../../../shared/interfaces/request-error";
import { LOADING_EDIT } from "../../constants/loading-edit";
import { Client } from "../../interfaces/client";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  id!: string;
  loading = LOADING_EDIT;
  client!: Client;

  constructor(private service: ClientService, private router: Router, private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchClient();
  }

  fetchClient(): void {
    this.loading.client = true;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.findById(this.id).subscribe({
      next: (value) => this.client = value!,
      error: ({ error }) => this.onFetchError(error),
    }).add(() => this.loading.client = false);
  }

  onFetchError({ message }: RequestError): void {
    this.snackbar.open(message, undefined, SNACKBAR_CONFIGURATION);
    this.router.navigateByUrl('/clientes');
  }

  onSubmit(client: Client) {
    this.loading.submit = true;
    this.service.update(this.id, client).subscribe({
      next: () => this.router.navigateByUrl('/clientes'),
      error: ({ error }) => this.snackbar.open(error.message, undefined, SNACKBAR_CONFIGURATION)
    }).add(() => this.loading.submit = false);
  }
}
