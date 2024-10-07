import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonDatetime, IonSlides, ModalController} from '@ionic/angular';
import {Subscription, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {RESTService} from '../rest.service';
import {DatePickerModalComponent} from "../date-picker-modal/date-picker-modal.component";

// Interfaz para los pedidos
interface Pedido {
    entrega: any;
    recoleccion: any;
    direccion: {
        direccion: string | undefined;
        alias: string | undefined;
    };
    metodoDePago: string | undefined;
    cuandoEfectivo: string | undefined;
    estado?: string;
    id?: number;
    total?: number;
}

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit, OnDestroy {

    @ViewChild('slides', {static: false}) slider: IonSlides;
    segment: string = '0';
    private unsubscribe$ = new Subject<void>();
    // Contadores
    cuantosPedidosEnTienda = 0;
    cuantosPedidosParaEntregar = 0;
    cuantosPedidos = 0;

    @ViewChild('picker', { static: false }) picker: IonDatetime;
    datePicker: string = new Date().toISOString();
    isDatePickerOpen: boolean = false;

    // Arrays de pedidos
    proximos: Pedido[] = [];
    pedidos: Pedido[] = [];
    pedidosEnTienda: Pedido[] = [];
    pedidosParaEntregar: Pedido[] = [];

    hoy: string;
    btnSeleccionado: string = 'hoy';

    constructor(private route: Router,
                private rest: RESTService,
                private modalController: ModalController,
                public datepipe: DatePipe) {
    }

    ngOnInit() {
        this.cambiarFecha();
    }

    ngOnDestroy() {
        // Cancelar las suscripciones para evitar fugas de memoria
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    async segmentChanged() {
        if (this.slider) {
            // tslint:disable-next-line:radix
            await this.slider.slideTo(parseInt(this.segment));
        }
    }

    async slideChanged() {
        if (this.slider) {
            this.segment = (await this.slider.getActiveIndex()).toString();
        }
    }

    orderDetail(idPedido: number) {
        sessionStorage.setItem('carritoSeleccionado', idPedido.toString());
        this.route.navigate(['./order-info']);
    }

    seleccionarTiempo(tiempo: string) {
        this.btnSeleccionado = tiempo;
    }

    // Ejemplo de colores para diferentes estados
    getBackgroundClass(estado: string): string {
        switch (estado) {
            case 'Creada':
                return 'bg-creada';
            case 'Terminado':
                return 'bg-terminado';
            case 'Recolectada':
                return 'bg-recolectada';
            default:
                return 'bg-default';
        }
    }

// Método para obtener el ícono según el estado
    getIconName(estado: string): string {
        switch (estado) {
            case 'Creada':
                return 'arrow-redo-outline';
            case 'Terminado':
                return 'checkmark-done-outline';
            case 'Recolectada':
                return 'cube-outline';
            default:
                return 'help-circle-outline';
        }
    }

// Método existente para obtener el color del ícono
    getIconColor(estado: string): string {
        switch (estado) {
            case 'Creada':
                return 'orangered';
            case 'Terminado':
                return 'dodgerblue';
            case 'Recolectada':
                return '#99ff00';
            default:
                return 'gray';
        }
    }

    cambiarFecha() {
        console.log(this.datePicker);
        this.isDatePickerOpen = false;
        console.log('Fecha seleccionada:', this.datePicker);

        this.hoy = this.datepipe.transform(this.datePicker, 'dd MMM yyyy');
        const fechaAPI = this.datepipe.transform(this.datePicker, 'yyyy-MM-dd');

        // Cargar los pedidos
        this.rest.obtenerTodosLosPedidosRepartidor(fechaAPI).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(p => {
            console.log(p);
            this.pedidos = p;
            this.cuantosPedidos = p.length;
            console.log(p);
        });

        this.rest.obtenerPedidosEnTienda().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(p => {
            this.pedidosEnTienda = p;
            this.cuantosPedidosEnTienda = p.length;
            console.log(p);
        });

        this.rest.obtenerPedidosParaEntrega().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(p => {
            this.pedidosParaEntregar = p;
            this.cuantosPedidosParaEntregar = p.length;
            console.log(p);
        });
    }

    async openDatePicker() {
        const modal = await this.modalController.create({
            component: DatePickerModalComponent,
            componentProps: { selectedDate: this.datePicker },
        });

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.datePicker = data.data.selectedDate;
                this.cambiarFecha();
            }
        });

        return await modal.present();
    }

}
