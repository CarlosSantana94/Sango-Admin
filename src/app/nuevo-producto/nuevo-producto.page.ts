import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Camera, CameraResultType} from '@capacitor/camera';

@Component({
    selector: 'app-nuevo-producto',
    templateUrl: './nuevo-producto.page.html',
    styleUrls: ['./nuevo-producto.page.scss'],
})
export class NuevoProductoPage implements OnInit {
    nuevaPrenda = {
        img: '',
        nombre: '',
        descripcion: '',
        precio: 0.0,
        opcionId: 0
    };
    servicios: any = [];
    subServicios: any = [];
    servicioSeleccionado: any;
    opcionSeleccionada: any;
    opcionSeleccionadaImg: any;
    opcionSeleccionadaImgCruda: any;
    opcionSeleccionadaId: any;
    usarMismaImagenQuePadre: boolean;
    private imageSelected: string;

    constructor(private rest: RESTService,
                private route: Router,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.imageSelected = '';
        this.opcionSeleccionadaImg = '';
        this.opcionSeleccionadaId = '';
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

    getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + url);
    }

    nuevaSubSeccion(servicioSeleccionado: any) {
        this.route.navigate(['./nueva-sub-seccion']);
    }

    seleccionarSubOpcion(opcionSeleccionada: any) {
        this.opcionSeleccionadaId = opcionSeleccionada.id;
        this.nuevaPrenda.opcionId = opcionSeleccionada.id;

        this.opcionSeleccionadaImg = this.getSantizeUrl(opcionSeleccionada.img);
        this.opcionSeleccionadaImgCruda = opcionSeleccionada.img;

    }

    guardarProducto() {
        if (this.usarMismaImagenQuePadre) {
            this.nuevaPrenda.img = this.opcionSeleccionadaImgCruda;
        }
        console.log(this.nuevaPrenda);
        this.rest.postSubOpciones(this.nuevaPrenda).subscribe(resp => {
            console.log(resp);
            this.route.navigate(['./items']);
        });
    }

    async addNewToGallery() {

        const capturedPhoto = await Camera.getPhoto({
            quality: 100,
            resultType: CameraResultType.Base64
        }).then(photo => {
            this.imageSelected = photo.base64String;
            this.nuevaPrenda.img = this.imageSelected;
        });
    }
}
