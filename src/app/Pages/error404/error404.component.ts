import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error404',
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component {

  constructor(private location: Location) { }
  goBack() {
    this.location.back();  // Retrocede en el historial del navegador
  }

}
