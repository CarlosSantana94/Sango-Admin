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

    products: any = [];
    filteredProducts: any = [];
    searchQuery: string = '';
    parents: string[] = [];
    selectedParent: any;
    // Variables for image viewer
    isImageViewerOpen: boolean = false;
    currentImage: string = '';

    constructor(private route: Router,
                private rest: RESTService,
                private loadingCtrl: LoadingController) {

        this.rest.getProductos().subscribe(data => {
            console.log(data);
            this.products = this.processData(data);
            this.filteredProducts = [...this.products];
            this.parents = Object.keys(data); // Extract parent categories

        });
    }

    ngOnInit() {


    }
    processData(data: any): any[] {
        let processedData: any[] = [];

        for (let parent in data) {
            let parentCategory = data[parent];
            for (let option in parentCategory) {
                let subOption = parentCategory[option];
                for (let subOptionKey in subOption) {
                    processedData.push(subOption[subOptionKey]);
                }
            }
        }

        return processedData;
    }

    // Search and filter the data based on the search query
    filterData(): void {
        const query = this.searchQuery.toLowerCase();

        this.filteredProducts = this.products.filter((item: any) =>
            item.servicioNombre.toLowerCase().includes(query) ||
            item.opcionNombre.toLowerCase().includes(query) ||
            item.subopcionNombre.toLowerCase().includes(query)
        );
    }

    // Filter products by parent category
    filterByParent(parent: string): void {
        this.selectedParent = parent; // Set selected category
        this.filteredProducts = this.products.filter((item: any) =>
            item.servicioNombre === parent
        );
    }

    // Show all data (reset filters)
    showAllData(): void {
        this.filteredProducts = [...this.products]; // Reset filtered products
        this.selectedParent = null; // Clear selected category
        this.searchQuery = ''; // Clear the search bar
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

    editarArticulo(productoID: any) {
        sessionStorage.setItem('productoAEditar', productoID);
        this.route.navigate(['./editar-producto']);
    }

    // Open the image viewer with the selected image
    openImageViewer(imageUrl: string): void {
        this.currentImage = imageUrl;
        this.isImageViewerOpen = true;
    }

    // Close the image viewer when clicking outside the image
    closeImageViewer(): void {
        this.isImageViewerOpen = false;
        this.currentImage = '';
    }


}

export interface Producto {
    servicioId: number;
    servicioNombre: string;
    opcionId: number;
    opcionNombre: string;
    subopcionId: number;
    subopcionNombre: string;
    opcionImg: string;
    subopcionPrecio: number;
    subopcionDescripcion: string;
    subopcionImg: string;
    subopcionPorMetro: boolean;
}
