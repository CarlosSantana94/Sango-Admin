import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditemsPage } from './additems.page';

const routes: Routes = [
  {
    path: '',
    component: AdditemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditemsPageRoutingModule {}
