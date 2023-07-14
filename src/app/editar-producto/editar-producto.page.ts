import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {LoadingController} from '@ionic/angular';
import {last, switchMap} from 'rxjs/operators';
import {Camera, CameraResultType} from '@capacitor/camera';

@Component({
    selector: 'app-editar-producto',
    templateUrl: './editar-producto.page.html',
    styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

    nuevaPrenda = {
        id: '',
        img: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        opcionId: 0,
        porMetro: false
    };
    servicios: any = [];
    subServicios: any = [];
    servicioSeleccionado: any;
    opcionSeleccionada: any;
    opcionSeleccionadaImg: any;
    opcionSeleccionadaImgCruda: any;
    opcionSeleccionadaId: any;
    usarMismaImagenQuePadre: boolean;
    imageSelected: string;

    constructor(private rest: RESTService,
                private route: Router,
                private firestorage: AngularFireStorage,
                private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        this.imageSelected = '';
        this.opcionSeleccionadaImg = '';
        this.opcionSeleccionadaId = '';
        this.simpleLoader();
        this.rest.getServicios().subscribe(serv => {
            this.servicios = serv;
            this.rest.getProductoPorId(sessionStorage.getItem('productoAEditar')).subscribe(p => {
                this.rest.getOpciones(p.opcionId).subscribe(opc => {
                    this.subServicios = opc;

                    this.nuevaPrenda.id = p.id;
                    this.nuevaPrenda.nombre = p.nombre;
                    this.nuevaPrenda.descripcion = p.descripcion;
                    this.nuevaPrenda.precio = p.precio;
                    this.nuevaPrenda.img = p.img;
                    this.nuevaPrenda.opcionId = p.opcionPadreId;

                    this.opcionSeleccionadaImgCruda = p.img;
                    this.nuevaPrenda.porMetro = p.porMetro;
                    this.servicioSeleccionado = p.opcionId;
                    this.imageSelected = p.img;
                    this.opcionSeleccionadaImg = p.servicioPadreImg;
                    this.opcionSeleccionada = p.opcionPadreId;


                    this.opcionSeleccionadaId = p.opcionPadreId;
                    this.dismissLoader();
                });
            });
        });

    }

    cargarSubProductos(servicioSeleccionado: any) {
        this.rest.getOpciones(servicioSeleccionado).subscribe(opc => {
            this.subServicios = opc;
            console.log(opc);
            console.log(this.opcionSeleccionada);
        });
    }

    nuevaSubSeccion() {
        this.route.navigate(['./nueva-sub-seccion']);
    }


    guardarProducto() {
        this.simpleLoader();
        if (this.usarMismaImagenQuePadre) {
            this.nuevaPrenda.img = this.opcionSeleccionadaImgCruda;
        }
        this.nuevaPrenda.opcionId = this.opcionSeleccionada;

        console.log(this.nuevaPrenda);

        this.rest.postSubOpciones(this.nuevaPrenda).subscribe(resp => {
            console.log(resp);
            this.dismissLoader();
            this.route.navigate(['./items']);
        });

    }

    requestReadPermission() {
        // no callbacks required as this opens a popup which returns async
        this.requestReadPermission();
    }


    uploadImageToFirebase(image) {
        // uploads image to firebase storage
        const filePath = 'productos2.0/';
        const fileRef = this.firestorage.ref(filePath + this.nuevaPrenda.nombre);
        const task = this.firestorage.upload(filePath + this.nuevaPrenda.nombre, image);

        task.snapshotChanges().pipe(
            last(),
            switchMap(() => fileRef.getDownloadURL())
        ).subscribe(url => {
            console.log('download url:', url);
            this.nuevaPrenda.img = url;
            this.dismissLoader();
        });
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

    base64ToImage(dataURI) {
        console.log();
        const fileDate = dataURI.split(',');
        // const mime = fileDate[0].match(/:(.*?);/)[1];
        const byteString = atob(fileDate[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], {type: 'image/png'});
        return blob;
    }

    async addNewToGallery() {

        await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.DataUrl
        }).then(photo => {
            console.log(photo);
            this.simpleLoader();
            this.uploadImageToFirebase(this.base64ToImage(photo.dataUrl));
            this.imageSelected = photo.dataUrl;
        });
    }
}
