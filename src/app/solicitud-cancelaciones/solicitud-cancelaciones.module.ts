import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudCancelacionesPageRoutingModule } from './solicitud-cancelaciones-routing.module';

import { SolicitudCancelacionesPage } from './solicitud-cancelaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudCancelacionesPageRoutingModule
  ],
  declarations: [SolicitudCancelacionesPage]
})
export class SolicitudCancelacionesPageModule {}
