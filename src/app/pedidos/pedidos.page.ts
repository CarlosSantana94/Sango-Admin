import {Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {IonDatetime, IonSlides, ModalController} from '@ionic/angular';
import {Subscription, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {RESTService} from '../rest.service';


export type EstadoCarrito = 'CREADO' | 'EN_TIENDA' | 'TERMINADO' | 'EN_RUTA_REPARTIDOR';

export interface CarritosAgrupadosPorEstado {
    [estado: string]: {
        total: number;
        carritosPorFecha: {
            retrasados: CarritoConTotal[];
            hoy: CarritoConTotal[];
            futuros: CarritoConTotal[];
        };
    };
}

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




@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

    // Diccionario que mapea los estados a sus alias


    carritosPorEstado: CarritosAgrupadosPorEstado = {};
    estados: string[] = ['CREADO', 'EN_TIENDA', 'TERMINADO', 'EN_RUTA_REPARTIDOR'];
    estadoSeleccionado: string = 'CREADO';
    carritosFiltrados: CarritoConTotal[] = []; // Asegúrate de inicializar como un arreglo vacío

    filtroFechaSeleccionado: string = 'todos';

    conteoPorFecha: { [key: string]: number } = {
        todos: 0,
        retrasados: 0,
        hoy: 0,
        futuros: 0,
    };


    estadosAlias: { [key: string]: string } = {
        CREADO: 'Recolectar',
        EN_TIENDA: 'En Sucursal',
        TERMINADO: 'Terminados',
        EN_RUTA_REPARTIDOR: 'Entregando'
    };

    constructor(private route: Router,
                private rest: RESTService,
                private modalController: ModalController,
                private cd: ChangeDetectorRef,
                public datepipe: DatePipe) {
    }

    ngOnInit() {
        this.cargarCarritos();
    }

    cargarCarritos() {
        this.rest.getCarritosV2().subscribe((response) => {
            this.carritosPorEstado = response;
            this.filtrarCarritos(); // Inicializa los filtros
        });
    }


    actualizarConteos() {
        const carritosEstado = this.carritosPorEstado[this.estadoSeleccionado]?.carritosPorFecha || {
            retrasados: [],
            hoy: [],
            futuros: []
        };

        this.conteoPorFecha.retrasados = carritosEstado.retrasados.length;
        this.conteoPorFecha.hoy = carritosEstado.hoy.length;
        this.conteoPorFecha.futuros = carritosEstado.futuros.length;
        this.conteoPorFecha.todos =
            this.conteoPorFecha.retrasados +
            this.conteoPorFecha.hoy +
            this.conteoPorFecha.futuros;
    }



    filtrarCarritos() {
        const carritosEstado = this.carritosPorEstado[this.estadoSeleccionado]?.carritosPorFecha || {
            retrasados: [],
            hoy: [],
            futuros: []
        };

        switch (this.filtroFechaSeleccionado) {
            case 'retrasados':
                this.carritosFiltrados = carritosEstado.retrasados;
                break;
            case 'hoy':
                this.carritosFiltrados = carritosEstado.hoy;
                break;
            case 'futuros':
                this.carritosFiltrados = carritosEstado.futuros;
                break;
            default: // Todos
                this.carritosFiltrados = [
                    ...carritosEstado.retrasados,
                    ...carritosEstado.hoy,
                    ...carritosEstado.futuros
                ];
                break;
        }

        this.actualizarConteos();
        this.cd.detectChanges(); // Fuerza la actualización del DOM
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

    filtrarPorFecha() {
        this.filtrarCarritos();
    }




}
