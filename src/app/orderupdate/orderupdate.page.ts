import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-orderupdate',
  templateUrl: './orderupdate.page.html',
  styleUrls: ['./orderupdate.page.scss'],
})
export class OrderupdatePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

 dismiss(){
   this.modalController.dismiss();
 }
}
