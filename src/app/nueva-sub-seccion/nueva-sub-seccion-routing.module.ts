import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaSubSeccionPage } from './nueva-sub-seccion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaSubSeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaSubSeccionPageRoutingModule {}
