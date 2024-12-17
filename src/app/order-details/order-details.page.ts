import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.page.html',
    styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
    order: any;
    groupedDetails: any = {};
    estados = ['NUEVO', 'CREADO', 'EN_TIENDA', 'TERMINADO', 'EN_RUTA_REPARTIDOR'];

    constructor(private rest: RESTService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const orderId = this.route.snapshot.paramMap.get('id');
        if (orderId) {
            this.rest.getCarritoPorIdV2(orderId).subscribe((data) => {
                this.order = data;
                this.groupOrderDetails(data.detalles);
            });
        }
    }

    // Agrupar detalles
    private groupOrderDetails(detalles: any[]) {
        this.groupedDetails = detalles.reduce((acc, detalle) => {
            const {servicio, nombreCategoria} = detalle;
            if (!acc[servicio]) acc[servicio] = {};
            if (!acc[servicio][nombreCategoria]) acc[servicio][nombreCategoria] = [];
            detalle.comentario = detalle.comentario || '';
            acc[servicio][nombreCategoria].push(detalle);
            return acc;
        }, {});
    }

    // Obtener el siguiente estado
    obtenerSiguienteEstado(estadoActual: string): string {
        const index = this.estados.indexOf(estadoActual);
        return index !== -1 && index < this.estados.length - 1
            ? this.estados[index + 1]
            : this.estados[0];
    }

    // Cambiar el estado del pedido
    cambiarEstadoPedido() {
        const siguienteEstado = this.obtenerSiguienteEstado(this.order.estadoCarrito);
        this.rest.cambiarEstado(this.order.id, siguienteEstado).subscribe(
            (response) => {
                this.order.estadoCarrito = siguienteEstado; // Actualiza localmente el estado
                console.log('Estado del pedido actualizado:', siguienteEstado);
            },
            (error) => {
                console.error('Error al cambiar estado:', error);
            }
        );
    }

    printOrder() {
        this.rest.imprimirTicket(this.order.id).subscribe(data => {
            console.log(data);
        });
    }

    guardarComentario(item) {
        this.rest.comentarPrenda(item.idItemIndividual, item.comentario).subscribe(data => {
            console.log(data);
        });
    }
}
