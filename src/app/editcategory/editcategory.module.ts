import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
	  
import { IonicModule } from '@ionic/angular';

import { EditcategoryPageRoutingModule } from './editcategory-routing.module';

import { EditcategoryPage } from './editcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
	TranslateModule,   
    EditcategoryPageRoutingModule
  ],
  declarations: [EditcategoryPage]
})
export class EditcategoryPageModule {}
