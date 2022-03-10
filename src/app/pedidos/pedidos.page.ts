import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';
import {interval, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

    @ViewChild('slides', {static: true}) slider: IonSlides;
    segment = 0;
    subscription: Subscription;

    pedidos: any = [
        {
            direccion: {
                direccion: undefined,
                alias: undefined
            },
            metodoDePago: undefined,
            cuandoEfectivo: undefined
        }
    ];
    hoy: any;
    cuantosPedidos = 0;

    constructor(private route: Router,
                private afs: AngularFirestore,
                public datepipe: DatePipe) {
    }

    ngOnInit() {

        this.pedidos = [];

        this.afs.collection('/PedidosNuevos').valueChanges({idField: 'idUser'}).subscribe(p => {
            p.forEach(listado => {
                this.afs.collection('/PedidosNuevos/' + listado.idUser + '/Listado/').valueChanges({idField: 'id'}).subscribe(ped => {

                    ped.forEach(p2 => {
                        let pedidoFin = Object.assign({}, p2);

                        // @ts-ignore
                        pedidoFin.idCorto = pedidoFin.id.substr(0, 5);
                        this.afs.doc('PedidosNuevos/' + listado.idUser + '/Listado/' + pedidoFin.id + '/Direccion/seleccion')
                            .valueChanges().subscribe(dir => {
                            // @ts-ignore
                            pedidoFin.userId =  listado.idUser;

                            // @ts-ignore
                            pedidoFin.direccion = Object.assign({}, dir);

                            console.log(pedidoFin.id);
                            this.pedidos.push(Object.assign({}, pedidoFin));
                            this.cuantosPedidos++;
                        });
                    });
                });
            });
        });
    }

    async segmentChanged() {
        await this.slider.slideTo(this.segment);
    }

    async slideChanged() {
        this.segment = await this.slider.getActiveIndex();
    }

    orderDetail(idPedido: any, userId: any) {
        sessionStorage.setItem('pedidoSeleccionado', idPedido);
        sessionStorage.setItem('uid', userId);
        this.route.navigate(['./order-info']);
    }


}
