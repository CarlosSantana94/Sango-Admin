import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-solicitud-cancelaciones',
    templateUrl: './solicitud-cancelaciones.page.html',
    styleUrls: ['./solicitud-cancelaciones.page.scss'],
})
export class SolicitudCancelacionesPage implements OnInit {
    solicitudes: any;

    constructor(private rest: RESTService,
                private route: Router) {
    }

    ngOnInit() {
        this.rest.obtenerCarritoPorEstado('SolicitaCancelacion').subscribe(data => {
            console.log(data);
            this.solicitudes = data;
        });
    }

    recargar() {
        this.ngOnInit();
    }

    verPedido(id) {
        sessionStorage.setItem('carritoSeleccionado', id);
        this.route.navigate(['./order-info']);
    }
}
