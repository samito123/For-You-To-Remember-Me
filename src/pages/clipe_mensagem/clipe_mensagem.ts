import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-clipe-mensagem',
  templateUrl: 'clipe_mensagem.html'
})

export class ClipeMensagem {
 	
	clip: any;
	mensagemList: any;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navParams: NavParams, public loadingCtrl: LoadingController,
				public http: Http) { 
		
		this.clip = navParams.data;
		this.InicializaTabMensagem();
	}

	InicializaTabMensagem(){
		this.InicializarLoading();
		this.BuscaMensagensDoClipSelecionado();
	}

	BuscaMensagensDoClipSelecionado() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			id_clip: this.clip[0].id_clip
	    }
	    
		this.http.post(this.url+'clips/consulta_mensagens_clipe_id_ionic.php', postParams, options)
			.subscribe(data => {
				this.mensagemList = JSON.parse(data['_body']);
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
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
