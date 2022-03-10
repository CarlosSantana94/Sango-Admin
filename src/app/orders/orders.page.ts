import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
 segment = 0; 
  constructor(private route: Router) { }

  ngOnInit() {
  }

 ordersinfo() {
    this.route.navigate(['./ordersinfo']);
  } 
    
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }     
}
