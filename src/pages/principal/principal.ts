import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { ClipsPage } from '../../pages/clips/clips';

@Component({
  selector: 'principal',
  templateUrl: 'principal.html'
})

export class Principal {
 	rootPage;

	usuarioLogado;
  	imagemUsuario: any;
  	nickUsuario: any;
  	emailUsuario: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public events: Events) {
		
		events.subscribe('SetDadosUsuarioMenu', (clip) => {
	      this.SetDadosUsuarioMenu();
	    });

	    this.VerificaUsuarioLogado();
	}

	VerificaUsuarioLogado(){
		if(sessionStorage.getItem('usuarioLogado') == null){
			this.rootPage = LoginPage;
		}else{
			this.SetDadosUsuarioMenu();
			this.rootPage = ClipsPage;
		}
	}

	SetDadosUsuarioMenu(){
		this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
		this.imagemUsuario = this.usuarioLogado[0].img_usuario;
		this.nickUsuario = this.usuarioLogado[0].nick_usuario;
		this.emailUsuario = this.usuarioLogado[0].email_usuario;
	}

	LogoutUsuario(){
		sessionStorage.clear();
		if(this.rootPage == LoginPage){
			this.rootPage = Principal;
		}else{
			this.rootPage = LoginPage;
		}
	}

	FecharImagemExpandida(){
		this.FadeOut(document.querySelector('.divImagemExpandidaPrincipal'));
	}

	FadeOut(elemento){
		elemento.style.opacity = 1;
		(function fade() {
			if ((elemento.style.opacity -= .1) < 0) {
				elemento.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();
	}

	FadeIn(elemento, display){
		elemento.style.opacity = 0;
		elemento.style.display = display || "block";
		(function fade() {
			var val = parseFloat(elemento.style.opacity);
			if (!((val += .1) > 1)) {
				elemento.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}
}
