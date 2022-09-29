import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

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

}
