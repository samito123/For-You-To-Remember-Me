import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  
	titulo = 'For You To Remember Me';

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;
	constructor(public loadingCtrl: LoadingController, public http: Http) {

	}

	LogarUsuario(){
		this.InicializarLoading();

	}

	VerificaLoginUsuario(){
		
	}

	InicializarLoading() { 
		this.loader = this.loadingCtrl.create({
			content: "Carregando..."
		}); 
		this.loader.present()
	}

	EncerraLoading(){
		this.loader.dismiss();
	}

}
