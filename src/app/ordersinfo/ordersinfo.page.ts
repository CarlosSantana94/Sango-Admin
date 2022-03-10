import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderupdatePage } from '../orderupdate/orderupdate.page';  
import { ModalController } from '@ionic/angular'; 
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-ordersinfo',
  templateUrl: './ordersinfo.page.html',
  styleUrls: ['./ordersinfo.page.scss'],
})
export class OrdersinfoPage implements OnInit {
 @ViewChild('slides', { static: true }) slider: IonSlides;
 segment = 0; 
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

 update_order(){
    this.modalController.create({component:OrderupdatePage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  } 
    


  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }     
}
