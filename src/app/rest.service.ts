import { Injectable } from '@angular/core';
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
}
