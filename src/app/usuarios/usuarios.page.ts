import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.page.html',
    styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

    usaurios: any = [];

    constructor(private rest: RESTService) {
    }

    ngOnInit() {
        this.rest.getUsuarios().subscribe(data => {
            this.usaurios = data;
        });
    }

}
