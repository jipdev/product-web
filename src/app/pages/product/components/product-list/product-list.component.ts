import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACKBAR_CONFIGURATION } from "../../../../shared/constants/snackbar-configuration";
import { RemoveRow } from "../../../../shared/interfaces/remove-row";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  loading!: boolean;
  products!: Product[];

  constructor(private service: ProductService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.service.findAll().subscribe({
      next: (products) => this.products = products,
      error: ({ error }) => this.snackbar.open(error.message, '', SNACKBAR_CONFIGURATION),
    }).add(() => this.loading = false)
  }

  remove({ id, index }: RemoveRow) {
    this.service.remove(id).subscribe({
      next: () => this.products.splice(index, 1),
      error: ({ error }) => this.snackbar.open(error.message, '', SNACKBAR_CONFIGURATION)
    });
  }
}
