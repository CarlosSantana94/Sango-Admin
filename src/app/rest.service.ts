import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import * as http from 'http';

@Injectable({
    providedIn: 'root'
})
export class RESTService {

    constructor(private http: HttpClient) {
    }

    getProductos() {
        return this.http.get(environment.url + 'productos');
    }

    getServicios() {
        return this.http.get(environment.url + 'servicios');
    }

    getOpciones(servicioId: number) {
        return this.http.get(environment.url + 'opciones/' + servicioId);
    }

    getSubOpciones(opcionId: number) {
        return this.http.get(environment.url + 'subOpciones/' + opcionId);
    }

    postOpciones(opcion: any) {
        return this.http.post(environment.url + 'opciones', opcion);
    }

    postSubOpciones(subOpcion: any) {
        return this.http.post(environment.url + 'subOpciones', subOpcion);
    }

    getProductoPorId(productoId: any): any {
        return this.http.get(environment.url + 'productos/id/' + productoId);
    }

    obtenerTodosLosPedidosRepartidor(fechaTope: any): any {
        return this.http.get(environment.url + 'carrito/pedidos/repartidor/actuales/' + fechaTope);
    }

    obtenerTodosLosPedidosPendientesRepartidor(fecha: string): any {
        return this.http.get(environment.url + 'carrito/pedidos/repartidor/pendientes/' + fecha);
    }

    obtenerPedidosEnTienda(): any {
        return this.http.get(environment.url + 'carrito/pedidos/repartidor/enTienda');
    }

    obtenerPedidosParaEntrega(): any {
        return this.http.get(environment.url + 'carrito/pedidos/repartidor/paraEntrega');
    }

    getCarritoPorId(idCarrito: any): any {
        return this.http.get(environment.url + 'carrito/id/' + idCarrito);
    }

    postOrdenParaConfirmar(listaDePrendas, idCarrito): any {
        return this.http.post(environment.url + 'prendasConfirmar/' + idCarrito, listaDePrendas);
    }

    postConfirmarPrendas(reg, registrada): any {
        return this.http.post(environment.url + 'prendaConfirmar/reg/' + reg + '/' + registrada, '');
    }

    postCambiarEstadoCarrito(estado, idCarrito): any {
        return this.http.post(environment.url + 'cambiarEstadoCarrito/' + estado + '/' + idCarrito, '');
    }

    getRutaRepartidorPorDia(fecha): any {
        return this.http.get(environment.url + 'repartidor/dia/' + fecha);
    }

    postComentarioPrenda(registro, prenda): any {
        return this.http.post(environment.url + 'prendaConfirmar/comentar/' + registro, prenda);
    }

}
