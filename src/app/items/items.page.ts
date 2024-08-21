import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {RESTService} from '../rest.service';
import firebase from 'firebase';
import FirebaseStorageError = firebase.storage.FirebaseStorageError;
import {AngularFireStorage} from '@angular/fire/storage';
import storage = firebase.storage;
import {DomSanitizer} from '@angular/platform-browser';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-items',
    templateUrl: './items.page.html',
    styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
    productos: any = [];

    constructor(private route: Router,
                private rest: RESTService,
                private loadingCtrl: LoadingController) {
        this.simpleLoader();
        this.rest.getProductos().subscribe(data => {
            console.log(data);
            this.productos = data;
            loadingCtrl.dismiss();
        });
    }

    ngOnInit() {


    }


    editItem(idProducto: any, idServicio: any, nombreServicio: any) {

    }

    abrirEditorDeProducto(producto: any) {

    }

    agregarProducto() {
        this.route.navigate(['./nuevo-producto']);
    }


    simpleLoader() {
        this.loadingCtrl.create({
            message: 'Cargando...',
            spinner: 'crescent'
        }).then((response) => {
            response.present();
        });
    }

    dismissLoader() {
        this.loadingCtrl.dismiss().then((response) => {
            console.log('Loader closed!', response);
        }).catch((err) => {
            console.log('Error occured : ', err);
        });
    }

    editarArticulo(producto: any) {
        sessionStorage.setItem('productoAEditar', producto.id);
        this.route.navigate(['./editar-producto']);
    }
}
