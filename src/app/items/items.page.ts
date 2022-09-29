import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {RESTService} from '../rest.service';
import firebase from 'firebase';
import FirebaseStorageError = firebase.storage.FirebaseStorageError;
import {AngularFireStorage} from '@angular/fire/storage';
import storage = firebase.storage;
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-items',
    templateUrl: './items.page.html',
    styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
    productos: any = [];

    constructor(private route: Router,
                private rest: RESTService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.rest.getProductos().subscribe(data => {
            console.log(data);
            this.productos = data;
        });

    }


    editItem(idProducto: any, idServicio: any, nombreServicio: any) {

    }

    abrirEditorDeProducto(producto: any) {

    }

    agregarProducto() {
        this.route.navigate(['./nuevo-producto']);
    }

    getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + url);
    }
}
