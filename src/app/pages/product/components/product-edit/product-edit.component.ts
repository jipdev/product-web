import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { RequestError } from "../../../../shared/interfaces/request-error";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id!: string;
  loading = false;
  product!: Product;

  constructor(private service: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.findById(this.id).subscribe({
      next: (value) => this.product = value!,
      error: ({ error }) => this.onFetchError(error),
    });
  }

  onFetchError({ message }: RequestError): void {
    this.snackbar.open(message, undefined, SNACKBAR_CONFIGURATION);
    this.router.navigateByUrl('/produtos');
  }

  onSubmit(product: Product) {
    this.loading = true;
    this.service.update(this.id, product).subscribe({
      next: () => this.router.navigateByUrl('/produtos'),
      error: ({ error }) => this.snackbar.open(error.message, undefined, SNACKBAR_CONFIGURATION)
    }).add(() => this.loading = false);
  }
}
