import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoadingModule } from "../../shared/components/loading/loading.module";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListTableComponent } from './components/product-list-table/product-list-table.component';
import { ProductRoutingModule } from "./product-routing.module";
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductListTableComponent,
    ProductFormComponent,
    ProductCreateComponent
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ProductModule { }
