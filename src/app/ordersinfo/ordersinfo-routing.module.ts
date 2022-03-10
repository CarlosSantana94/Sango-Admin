import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersinfoPage } from './ordersinfo.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersinfoPageRoutingModule {}
