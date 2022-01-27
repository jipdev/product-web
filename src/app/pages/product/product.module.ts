import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoadingModule } from "../../shared/components/loading/loading.module";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListTableComponent } from './components/product-list-table/product-list-table.component';
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductListTableComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatIconModule,
    LoadingModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ProductModule { }
