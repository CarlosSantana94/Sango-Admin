import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
    selector: 'app-additems',
    templateUrl: './additems.page.html',
    styleUrls: ['./additems.page.scss'],
})
export class AdditemsPage implements OnInit {
    categorie: string = 'apparels';
    sub_category: string = 'men_wear';
    in_stock: string = '1';
    producto: any = {};
    categorias: any = [];
    nombreServicio = '';

    constructor(private afs: AngularFirestore) {
    }

    ngOnInit() {
        this.nombreServicio = sessionStorage.getItem('nombreServicio');
        this.afs.doc('Servicios/' + sessionStorage.getItem('servicioSeleccionado') + '/Opciones/' + sessionStorage.getItem('productoSeleccionado'))
            .valueChanges().subscribe(prod => {
            // @ts-ignore
            prod.idServicio = sessionStorage.getItem('servicioSeleccionado');
            this.producto = Object.assign({}, prod);
        });

    }

    actualizarProducto(pr: any) {
        console.log(pr);
        this.afs.doc('Servicios/' + sessionStorage.getItem('servicioSeleccionado') + '/Opciones/' + sessionStorage.getItem('productoSeleccionado'))
            .update(this.producto).then(p => {

        });
    }
}
