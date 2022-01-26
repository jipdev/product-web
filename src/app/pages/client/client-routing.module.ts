import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ClientCreateComponent } from "./components/client-create/client-create.component";
import { ClientEditComponent } from "./components/client-edit/client-edit.component";
import { ClientListComponent } from "./components/client-list/client-list.component";

const routes: Routes = [
  {
    path: '',
    component: ClientListComponent
  },
  {
    path: 'novo',
    component: ClientCreateComponent
  },
  {
    path: ':id',
    component: ClientEditComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
