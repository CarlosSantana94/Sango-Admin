import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
  
import { IonicModule } from '@ionic/angular';

import { OrdersinfoPageRoutingModule } from './ordersinfo-routing.module';

import { OrdersinfoPage } from './ordersinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    OrdersinfoPageRoutingModule
  ],
  declarations: [OrdersinfoPage]
})
export class OrdersinfoPageModule {}
