import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  titulo = 'Clips';
  constructor() {
    
  }

  getTitulo(){
    return "Retorna blah blah blah! " + this.titulo;
  }
}
