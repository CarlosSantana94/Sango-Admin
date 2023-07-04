import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';
import {interval, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {DatePipe} from '@angular/common';
import {RESTService} from '../rest.service';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

    @ViewChild('slides', {static: false}) slider: IonSlides;
    segment = 0;
    subscription: Subscription;

    cuantosPedidosEnTienda = 0;
    cuantosPedidosParaEntregar = 0;
    cuantosPedidos = 0;
    cuantosProximos = 0;

    cuantosHoyRecoleccion = 0;
    cuantosAtrasadosRecoleccion = 0;
    cuantosFuturosRecoleccion = 0;

    cuantosHoyEntrega = 0;
    cuantosAtrasadosEntrega = 0;
    cuantosFuturosEntrega = 0;

    proximos: any = [
        {
            direccion: {
                direccion: undefined,
                alias: undefined
            },
            metodoDePago: undefined,
            cuandoEfectivo: undefined
        }
    ];
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
    pedidosEnTienda: any = [
        {
            direccion: {
                direccion: undefined,
                alias: undefined
            },
            metodoDePago: undefined,
            cuandoEfectivo: undefined
        }
    ];
    pedidosParaEntregar: any = [
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
    btnSeleccionado: string;

    constructor(private route: Router,
                private rest: RESTService,
                public datepipe: DatePipe) {
    }

    ngOnInit() {
        this.btnSeleccionado = 'hoy';
        this.pedidos = [];
        this.proximos = [];
        this.pedidosEnTienda = [];

        this.hoy = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

        this.rest.obtenerTodosLosPedidosRepartidor('3022-11-04').subscribe(p => {
            this.pedidos = p;
            console.log(p);
            this.cuantosPedidos = p.length;
        });
        this.rest.obtenerPedidosEnTienda().subscribe(p => {
            this.pedidosEnTienda = p;
            console.log(p);
            this.cuantosPedidosEnTienda = p.length;
        });
        this.rest.obtenerPedidosParaEntrega().subscribe(p => {
            this.pedidosParaEntregar = p;
            console.log(p);
            this.cuantosPedidosParaEntregar = p.length;
        });

        /* this.rest.obtenerTodosLosPedidosPendientesRepartidor('3022-11-04').subscribe(p => {
             this.proximos = p;
             console.log(p);
             this.cuantosProximos = p.length;
         });*/
    }

    async segmentChanged() {
        await this.slider.slideTo(this.segment);
    }

    async slideChanged() {
        this.segment = await this.slider.getActiveIndex();
    }


    orderDetail(idPedido: any) {
        sessionStorage.setItem('carritoSeleccionado', idPedido);
        this.route.navigate(['./order-info']);
    }


    seleccionarTiempo(tiempo: string) {
        this.btnSeleccionado = tiempo;
    }
}
