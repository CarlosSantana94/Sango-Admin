import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {environment} from '../../environments/environment';
import {GoogleMap} from '@capacitor/google-maps';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from '@angular/common';
import {RESTService} from '../rest.service';
import {Geolocation} from '@capacitor/geolocation';

declare var google;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.page.html',
    styleUrls: ['./mapa.page.scss'],
})


export class MapaPage {

    @ViewChild('map') mapRef: ElementRef;

    map: GoogleMap;
    private markerId: string;
    ubicaciones: any = [];
    date: string;
    markers: any[] = [];


    constructor(private route: Router,
                public datepipe: DatePipe,
                private rest: RESTService) {
    }


    ionViewDidEnter() {
        this.date = new Date().toISOString();
        this.createMap();
    }

    async createMap() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log(coordinates);
        this.map = await GoogleMap.create({
            id: 'my-map', // Unique identifier for this map instance
            element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
            apiKey: environment.mapsKey, // Your Google Maps API Key
            config: {
                center: {
                    // The initial position to be rendered by the map
                    lat: coordinates.coords.latitude,
                    lng: coordinates.coords.longitude,
                },
                zoom: 14, // The initial zoom level to be rendered by the map
            },
        });
        await this.map.enableCurrentLocation(true);

    }

    async addMarker(lat, lng, title) {
        // Add a marker to the map
        if (this.markerId) {
            this.removeMarker();
        }
        this.markerId = await this.map.addMarker({
            coordinate: {
                lat,
                lng,
            },
            draggable: false,
            title
        });

        this.markers.push(this.markerId);
    }

    async removeMarker(id?) {
        await this.map.removeMarker(id ? id : this.markerId);
    }

    async locate() {
        if (this.map) {
            await this.map.enableCurrentLocation(true);
        }
    }

    cambioDeFecha() {
        console.log(formatDate(this.date, 'yyyy/MM/dd', 'en', '-0600'));
        this.rest.getRutaRepartidorPorDia(formatDate(this.date, 'yyyy-MM-dd', 'en', '-0600')).subscribe(ubi => {



            // tslint:disable-next-line:prefer-for-of
            console.log(ubi);
            for (let i = 0; i < ubi.length; i++) {
                this.addMarker(ubi[i].lat, ubi[i].lng, formatDate(ubi[i].fecha, 'd/M/yy, h:mm a', 'en', '-0600'));
            }


        });
    }
}
