import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  @ViewChild('slides', {static: true}) slider: IonSlides;
  segment = 0;
  pedidoSeleccionado = '';
  coords: any;

  pedido: any = {
    metodoDePago: undefined,
    total: undefined,
    cuandoEfectivo: undefined,
    recoger: undefined,
    entrega: undefined,
    estadoPedido: undefined
  };
  direccion: any = {
    lat: undefined,
    long: undefined
  };
  prendas = [];

  constructor(private afs: AngularFirestore,
              private platform: Platform) {
  }

  ngOnInit() {
    this.pedidoSeleccionado = sessionStorage.getItem('pedidoSeleccionado');

    this.afs.doc('PedidosNuevos/' + sessionStorage.getItem('uid') + '/Listado/' + this.pedidoSeleccionado)
        .valueChanges().subscribe(sel => {
      console.log(sel);
      this.pedido = Object.assign({}, sel);
    });
    this.afs.collection('PedidosNuevos/' + sessionStorage.getItem('uid') + '/Listado/' + this.pedidoSeleccionado + '/Prendas')
        .valueChanges().subscribe(pren => {
      console.log(pren);
      this.prendas = pren;
    });
    this.afs.doc('PedidosNuevos/' + sessionStorage.getItem('uid') + '/Listado/' + this.pedidoSeleccionado + '/Direccion/seleccion')
        .valueChanges().subscribe(dir => {
      console.log(dir);
      this.direccion = Object.assign({}, dir);
    });

  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  public openMapsApp(latitude: any, longitude: any) {
    const destination = latitude + ',' + longitude;

    console.log(destination);

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    } else {
      const label = encodeURI('Pedido');
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

}
