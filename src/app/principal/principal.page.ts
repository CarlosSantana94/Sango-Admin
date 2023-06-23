import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.page.html',
    styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


    porRecolectar: any;
    entregarHoy: any;
    entregarAtrasados: any;
    entregarFuturos: any;
    recolectarAtrasados: any;
    recolectarHoy: any;
    recolectarFuturos: any;
    porEntregar: any;
    canceladosHistorico: any;
    solicitudCancelacion: any;
    finalizados: any;
    enTienda: any;

    constructor(private rest: RESTService,
                private route: Router) {
    }

    ngOnInit() {


        this.rest.obtenerDesgloseDeCarritos().subscribe(data => {
            console.log(data);

            this.recolectarFuturos = data.recolectarFuturos;
            this.recolectarAtrasados = data.recolectarAtrasados;
            this.recolectarHoy = data.recolectarHoy;
            this.entregarHoy = data.entregarHoy;
            this.entregarAtrasados = data.entregarAtrasados;
            this.entregarFuturos = data.entregarFuturos;
            this.canceladosHistorico = data.canceladosHistorico;
            this.solicitudCancelacion = data.solicitudCancelacion;
            this.finalizados = data.finalizados;
            this.enTienda = data.enTienda;


            this.porRecolectar = this.recolectarFuturos + this.recolectarHoy + this.recolectarAtrasados;
            this.porEntregar = this.entregarFuturos + this.entregarAtrasados + this.entregarHoy;
        });
    }

    recargar() {
        this.ngOnInit();
    }

    irASolicitudesDeCancelacion() {
        this.route.navigate(['./solicitud-cancelaciones']);
    }
}
