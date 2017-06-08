import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'clips.html'
})

export class ClipsPage {
  
  titulo = 'Clips';

  constructor(private http: Http) {
    
  }

  
}
