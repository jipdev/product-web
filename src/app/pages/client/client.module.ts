import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { NgxMaskModule } from "ngx-mask";
import { LoadingModule } from "../../shared/components/loading/loading.module";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientListTableComponent } from './components/client-list-table/client-list-table.component';
import { ClientListComponent } from './components/client-list/client-list.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientListTableComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    OverlayModule,
    LoadingModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    NgxMaskModule,
    MatProgressSpinnerModule
  ]
})
export class ClientModule { }
