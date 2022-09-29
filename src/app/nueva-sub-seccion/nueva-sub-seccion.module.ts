import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaSubSeccionPageRoutingModule } from './nueva-sub-seccion-routing.module';

import { NuevaSubSeccionPage } from './nueva-sub-seccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaSubSeccionPageRoutingModule
  ],
  declarations: [NuevaSubSeccionPage]
})
export class NuevaSubSeccionPageModule {}
