import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderupdatePage } from '../orderupdate/orderupdate.page';  
import {AlertController, ModalController} from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import {Router} from '@angular/router';
import {RESTService} from '../rest.service';

@Component({
  selector: 'app-ordersinfo',
  templateUrl: './ordersinfo.page.html',
  styleUrls: ['./ordersinfo.page.scss'],
})
export class OrdersinfoPage implements OnInit {
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
            this.rest.postOrdenParaConfirmar(data.prendasList, sessionStorage.getItem('carritoSeleccionado')).subscribe(resp => {
                this.prendas = resp;
                console.log(this.prendas);
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

    async presentAlertConfirm() {
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
                        this.rest.postCambiarEstadoCarrito('Recolectada', sessionStorage.getItem('carritoSeleccionado')).subscribe(c => {
                            console.log(c);
                            this.route.navigate(['./tabs/deliveries']);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    presentarAlerta() {
        this.presentAlertConfirm();
    }
}
