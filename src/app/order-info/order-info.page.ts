import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSlides, Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {RESTService} from '../rest.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  @ViewChild('slides', {static: true}) slider: IonSlides;
  segment = 0;
  prendas = [];
  resumen: any = [];
  recogerFecha = '';
  entregarFecha = '';
  subTotal = 0;

  cargando: boolean;

  constructor(private route: Router,
              private rest: RESTService,
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.cargando = false;

    this.rest.getCarritoPorId(sessionStorage.getItem('carritoSeleccionado')).subscribe(data => {
      this.resumen = data;
      this.cargando = true;
      console.log(data);
      this.rest.postOrdenParaConfirmar(data.prendasList, sessionStorage.getItem('carritoSeleccionado')).subscribe(resp => {
        this.prendas = resp;
        this.subTotal = 0;
        this.prendas.forEach(p => {
          if (p.revisada) {
            this.subTotal += p.precioTotal;
          }
        });
      });
    });

  }

  payment() {
    this.route.navigate(['./payment']);
  }


  actualizarRevisado(reg, event) {
    this.rest.postConfirmarPrendas(reg.reg, event.target.checked).subscribe(data => {
      reg = data;
    });
    this.ngOnInit();
  }

  async presentAlertConfirm(estado) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar orden?',
      message: 'Asegurate de validar todas las <strong>prendas</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {


            this.rest.postCambiarEstadoCarrito(estado, sessionStorage.getItem('carritoSeleccionado')).subscribe(c => {
              console.log(c);
              this.route.navigate(['./pedidos']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  presentarAlerta(estado) {
    this.presentAlertConfirm(estado);
  }

  ponerComentario(prenda) {
    prenda.comentarioVisible = !prenda.comentarioVisible;
    if (prenda.comentarioVisible === null) {
      prenda.comentarioVisible = true;
    }

  }


  guardarComentario(prenda: any) {
    console.log(prenda);
    this.rest.postComentarioPrenda(prenda.reg, prenda).subscribe(d => {
      console.log(d);
    });
  }
}
