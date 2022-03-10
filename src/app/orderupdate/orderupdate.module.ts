import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	  
import { IonicModule } from '@ionic/angular';

import { OrderupdatePageRoutingModule } from './orderupdate-routing.module';

import { OrderupdatePage } from './orderupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    OrderupdatePageRoutingModule
  ],
  declarations: [OrderupdatePage]
})
export class OrderupdatePageModule {}
