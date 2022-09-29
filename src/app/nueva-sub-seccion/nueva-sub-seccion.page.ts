import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Camera, CameraResultType} from '@capacitor/camera';


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

    constructor(private rest: RESTService,
                private route: Router,
                private firestorage: AngularFireStorage,
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

    cargarSubProductos(servicioSeleccionado: any) {
        this.rest.getOpciones(servicioSeleccionado).subscribe(opc => {
            this.subServicios = opc;
            console.log(opc);
        });
    }

    nuevaSubSeccion(servicioSeleccionado: any) {
        this.route.navigate(['./nueva-sub-seccion']);
    }


    requestReadPermission() {
        // no callbacks required as this opens a popup which returns async
        this.requestReadPermission();
    }


    uploadImageToFirebase(image) {
        // uploads image to firebase storage
        this.firestorage.upload('productos', image)
            .then(photoURL => {
                console.log(photoURL);
            });
    }

    async addNewToGallery() {

        const capturedPhoto = await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.Base64
        }).then(photo => {
            this.imageSelected = photo.base64String;
            this.opcion.img = this.imageSelected;
        });
    }

    guardarNuevaOpcion() {
        this.opcion.servicioId = this.servicioSeleccionado;
        this.rest.postOpciones(this.opcion).subscribe(resp => {
            console.log(resp);
            this.route.navigate(['./nuevo-producto']);
        });
    }

}
