import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.page.html',
  styleUrls: ['./editcategory.page.scss'],
})
export class EditcategoryPage implements OnInit {
 categorie: string = "apparels";
  constructor() { }

  ngOnInit() {
  }

}
