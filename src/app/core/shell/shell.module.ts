import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';

const COMPONENTS = [
  NavbarComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [...COMPONENTS]
})
export class ShellModule { }
