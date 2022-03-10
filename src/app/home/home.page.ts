import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    woocommerce: string = 'orders';
    orders_tab: string = 'weekly';
    revenue: string = 'monthly';

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    orders() {
        this.route.navigate(['./orders']);
    }
}
