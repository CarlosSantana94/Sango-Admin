import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudCancelacionesPage } from './solicitud-cancelaciones.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudCancelacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudCancelacionesPageRoutingModule {}
