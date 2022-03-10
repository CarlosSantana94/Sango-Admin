import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

 editcategory() {
    this.route.navigate(['./editcategory']);
  } 
}
