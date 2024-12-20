import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {RESTService} from '../rest.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
    username: any;
    password: any;
    servidor: any;
    apiVersion: any;

    constructor(private navCtrl: NavController,
                private rest: RESTService) {
        sessionStorage.setItem('lg', '0');
    }

    ngOnInit() {
        this.rest.getHealth().subscribe(h => {
            console.log(h);
            this.servidor = h.isUp;
            this.apiVersion = h.appName + ' V' + h.version;

            if (h.is && localStorage.getItem('uid') !== null) {
                this.navCtrl.navigateRoot(['./tabs']);
            }

            if (!this.servidor) {
                localStorage.clear();
                sessionStorage.clear();
            }
        });
    }

    home() {
        if (this.username === 'admin' && this.password === 'admin') {
            this.navCtrl.navigateRoot(['./principal']);
            sessionStorage.setItem('lg', '1');
        }
    }
}
