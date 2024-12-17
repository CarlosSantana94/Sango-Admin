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

    getCarritoPorIdV2(idCarrito: any): any {
        return this.http.get(environment.url + 'api/v2/carritos/' + idCarrito);
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

    obtenerDesgloseDeCarritos(): any {
        return this.http.get(environment.url + 'desgloseTodosLosPedidos');
    }

    obtenerCarritoPorEstado(estado): any {
        return this.http.get(environment.url + 'estado/' + estado);
    }

    getHealth(): any {
        return this.http.get(environment.url + 'health');
    }

    getUsuarios(): any {
        return this.http.get(environment.url + 'usuarios');
    }

    getCarritosV2(): any {
        return this.http.get(environment.url + 'api/v2/carritos/agrupados-por-estado');
    }

    cambiarEstado(id, estado): any {
        return this.http.put(environment.url + 'api/v2/carritos/' + id + '/estado?estado=' + estado, null);
    }

    postActualizarUsuario(usuario): any {
        return this.http.post(environment.url + 'usuario', usuario);
    }


    imprimirTicket(id): any {
        return this.http.post(environment.url + 'api/v2/carritos/' + id + '/imprimir', null);
    }

    comentarPrenda(idPrenda, comentario): any {
        return this.http.put(environment.url + 'api/v2/carritos/item/' + idPrenda + '/comentario?comentario=' + comentario, null);
    }
}
