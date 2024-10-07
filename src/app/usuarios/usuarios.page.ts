import {Component, OnInit} from '@angular/core';
import {RESTService} from '../rest.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.page.html',
    styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

    usuarios: any = [];
    searchTerm: string = '';
    usuariosFiltrados = [];

    constructor(private rest: RESTService) {
    }

    ngOnInit() {
        this.rest.getUsuarios().subscribe(data => {
            this.usuarios = data;
           this.usuariosFiltrados = [...this.usuarios];
        });
    }

    cambiarEstadoPago(user: any) {
        this.rest.postActualizarUsuario(user).subscribe(data => {
        });
    }

    buscarUsuario() {
        const valorBusqueda = this.searchTerm.toLowerCase();

        // Si el campo de búsqueda está vacío, restauramos la lista completa de usuarios
        if (valorBusqueda.trim() === '') {
            this.usuariosFiltrados = [...this.usuarios];
            return;
        }

        // Filtramos usuarios que coincidan con el nombre o el email
        this.usuariosFiltrados = this.usuarios.filter(user =>
            (user.nombre?.toLowerCase() ?? '').includes(valorBusqueda) ||
            (user.email?.toLowerCase() ?? '').includes(valorBusqueda)
        );
    }
}
