import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  loading!: boolean;

  constructor(private service: ProductService, private router: Router, private snackbar: MatSnackBar) {
  }

  onSubmit(product: Product) {
    this.loading = true;
    this.service.create(product).subscribe({
      next: (client) => this.router.navigate(['produtos', client.id]),
      error: ({ error }) => this.snackbar.open(error.message, undefined, SNACKBAR_CONFIGURATION)
    }).add(() => this.loading = false);
  }
}
