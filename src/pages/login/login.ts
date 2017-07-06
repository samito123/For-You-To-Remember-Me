import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ClipsPage } from '../../pages/clips/clips';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  
	titulo = 'For You To Remember Me';
	usuarioForm = {login: '', senha: ''};
	usuarioRetornado: any;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;
	alert;
	constructor(public loadingCtrl: LoadingController, public http: Http,
		public alertCtrl: AlertController, public navCtrl: NavController,
		public events: Events) {

	}

	LogarUsuario(){
		this.InicializarLoading();
		this.VerificaLoginUsuario();
	}

	VerificaLoginUsuario(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			loginUsuario: this.usuarioForm.login, senhaUsuario: this.usuarioForm.senha
	    }
	    
		this.http.post(this.url+'usuarios/verifica_login_usuario_ionic.php', postParams, options)
			.subscribe(data => {
				this.usuarioRetornado = JSON.parse(data['_body']);
				this.VerificaUsuarioRetornado();
			}, error => {
				this.ShowAlert("Ocorreu um erro!", "Erro: "+error);
				this.EncerraLoading();
		});
	}

	VerificaUsuarioRetornado(){
		if(this.usuarioRetornado.length == 0){
			this.ShowAlert("Login incorreto!", 
				"Verifique se o usuário está correto é digite novamente a sua senha");
			this.usuarioForm.senha = "";
			this.EncerraLoading();
		}else{
			this.SalvaSessaoDeUsuario();
		}
	}

	SalvaSessaoDeUsuario(){
		sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioRetornado));
		this.EncerraLoading();
		this.events.publish('SetDadosUsuarioMenu');
		this.RedirecionaParaClips();
	}

	RedirecionaParaClips(){
  		this.navCtrl.setRoot(ClipsPage);
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

	ShowAlert(titulo, subTitulo) {
		this.alert = this.alertCtrl.create({
			title: titulo,
			subTitle: subTitulo,
			buttons: ['OK']
			});
		this.alert.present();
	}

}
