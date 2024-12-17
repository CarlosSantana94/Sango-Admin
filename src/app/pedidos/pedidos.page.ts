import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonDatetime, IonSlides, ModalController} from '@ionic/angular';
import {Subscription, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {RESTService} from '../rest.service';


export type EstadoCarrito = 'CREADO' | 'EN_TIENDA' | 'TERMINADO' | 'EN_RUTA_REPARTIDOR';

export interface Servicio {
    id: number;
    nombre: string;
}

export interface OpcionesPrenda {
    id: number;
    nombre: string;
    img: string;
    servicio: Servicio;
}

export interface Prenda {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    img: string;
    opcionesPrenda: OpcionesPrenda;
    porMetro: boolean;
    estado: string | null;
}

export interface ItemCarrito {
    id: number;
    prenda: Prenda;
    cantidad: number;
    estado: string;
}

export interface Direccion {
    id: number;
    cp: number;
    tel: number;
    indicacion: string;
    alias: string;
    direccion: string;
    lat: number;
    lng: number;
    nombre: string;
    interior: string;
}

export interface Envios {
    id: number;
    fechaRecoleccion: string;
    fechaEntrega: string;
    fechaCreado: string;
    fechaModificado: string | null;
    fechaOriginalRecoleccion: string;
    motivoModificacion: string | null;
    fechaOriginalEntrega: string;
}

export interface Carrito {
    id: number;
    envios: Envios;
    estado: string;
    fechaCreacion: string;
    items: ItemCarrito[];
    direccion: Direccion;
    cuandoOToken: string;
    formaDePago: string;
    ordenConekta: string;
}

export interface CarritoConTotal {
    totalCarrito: number;
    carrito: Carrito;
}

export interface EstadoCarritos {
    total: number;
    carritos: CarritoConTotal[];
}

export interface CarritosAgrupadosPorEstado {
    [estado: string]: EstadoCarritos;
}


@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

    carritosPorEstado: CarritosAgrupadosPorEstado = {};
    estados: string[] = ['CREADO', 'EN_TIENDA', 'TERMINADO', 'EN_RUTA_REPARTIDOR'];
    estadoSeleccionado: string = 'CREADO';
    carritosFiltrados: CarritoConTotal[] = [];

    constructor(private route: Router,
                private rest: RESTService,
                private modalController: ModalController,
                public datepipe: DatePipe) {
    }

    ngOnInit() {
        this.cargarCarritos();
    }

    cargarCarritos() {
        this.rest.getCarritosV2().subscribe((response) => {
            this.carritosPorEstado = response;
            this.filtrarCarritos(this.estadoSeleccionado);
        });
    }

    filtrarCarritos(estado: string) {
        this.estadoSeleccionado = estado;
        this.carritosFiltrados = this.carritosPorEstado[estado]?.carritos || [];
    }

    verDetalle(carritoId: number) {
        // Aquí puedes navegar a una página de detalles de carrito, pasando el ID
        this.route.navigate(['./order-details', {id: carritoId}]);
    }

    esRetrasado(fechaRecoleccion: string): boolean {
        const fechaRecoleccionDate = new Date(fechaRecoleccion);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Elimina la hora de hoy para comparar solo fechas
        return fechaRecoleccionDate < hoy;
    }

    protected readonly open = open;

    openConekta(url: string): void {
        window.open(url, '_blank'); // '_blank' abre en una nueva pestaña o ventana
    }

    openMaps(lat: number, lng: number) {
        window.open('https://maps.google.com/?q=' + lat + ',' + lng, '_blank'); // '_blank' abre en una nueva pestaña o ventana
    }
}
