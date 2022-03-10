import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.page.html',
    styleUrls: ['./mapa.page.scss'],
})


export class MapaPage implements OnInit {

    // Map related
    @ViewChild('map') public mapElement: ElementRef;

    map: any;

    currentMapTrack = null;

    isTracking = false;
    trackedRoute = [];
    previousTracks = [];


    constructor(public navCtrl: NavController,
                private plt: Platform) {
    }

    ngOnInit() {
        this.loadMap();
    }

    loadMap() {
        const mapOptions = {
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    redrawPath(path) {
        if (this.currentMapTrack) {
            this.currentMapTrack.setMap(null);
        }

        if (path.length > 1) {
            this.currentMapTrack = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: '#ff00ff',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            this.currentMapTrack.setMap(this.map);
        }
    }


}
