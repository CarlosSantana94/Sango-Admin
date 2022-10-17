import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Camera, CameraResultType} from '@capacitor/camera';
import {Observable} from 'rxjs';
import {finalize, last, switchMap} from 'rxjs/operators';
import {LoadingController} from '@ionic/angular';
import loader from '@angular-devkit/build-angular/src/angular-cli-files/plugins/single-test-transform';


@Component({
    selector: 'app-nueva-sub-seccion',
    templateUrl: './nueva-sub-seccion.page.html',
    styleUrls: ['./nueva-sub-seccion.page.scss'],
})
export class NuevaSubSeccionPage implements OnInit {

    opcion = {
        img: '',
        nombre: '',
        servicioId: 0
    };
    servicios: any = [];
    subServicios: any = [];
    servicioSeleccionado: any;
    imageElement: any;
    imageSelected: any;
    loader: any;

    constructor(private rest: RESTService,
                private route: Router,
                private firestorage: AngularFireStorage,
                private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.imageSelected = '';
        this.servicioSeleccionado = '';
        this.rest.getServicios().subscribe(serv => {
            this.servicios = serv;
            console.log(serv);
        });

    }



    requestReadPermission() {
        // no callbacks required as this opens a popup which returns async
        this.requestReadPermission();
    }


    uploadImageToFirebase(image) {
        // uploads image to firebase storage
        const filePath = 'productos2.0/';
        const fileRef = this.firestorage.ref(filePath + this.opcion.nombre);
        const task = this.firestorage.upload(filePath + this.opcion.nombre, image);

        task.snapshotChanges().pipe(
            last(),
            switchMap(() => fileRef.getDownloadURL())
        ).subscribe(url => {
            console.log('download url:', url);
            this.opcion.img = url;
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

    guardarNuevaOpcion() {
        this.simpleLoader();
        this.opcion.servicioId = this.servicioSeleccionado;

        this.rest.postOpciones(this.opcion).subscribe(resp => {
            console.log(resp);
            this.dismissLoader();
            this.route.navigate(['./nuevo-producto']);
        });
    }

}
