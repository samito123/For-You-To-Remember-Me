import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { ClipsPage } from '../../pages/clips/clips';

@Component({
  selector: 'page-home',
  templateUrl: 'clipe_selecionado.html'
})

export class ClipeSelecionado {
  	@ViewChild(ClipsPage)
    private numberComponent: ClipsPage;

  	clipe: any;
  	id: any;
  	visualizacoes: any;
  	titulo: any;
  	loader = this.ConfiguraLoading();
  	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
				public http: Http, public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController) { 
		
		this.id = navParams.get("id_clip");
		this.visualizacoes = parseInt(navParams.get("visualizacoes_clip")) + parseInt("1");
				
		this.aaaa();
		//this.titulo = this.visualizacoes;
		//this.CarregaClipeSelecionado();
	}

	aaaa(){
		this.numberComponent.aa();
	}

	CarregaClipeSelecionado(){
		this.loader.present().then(() => {
			this.BuscaClipeSelecionado();
			this.loader.dismiss();
		}); 
	}

	BuscaClipeSelecionado() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			id_clip: this.id, visualizacoes_clip: this.visualizacoes
	    }
	    
		this.http.post(this.url+'clips/consulta_clipe_id_ionic.php', postParams, options)
			.subscribe(data => {
				this.clipe = JSON.parse(data['_body']);

			}, error => {
				console.log(error);// Error getting the data
		});
	}

	ConfiguraLoading() { 
		let loader = this.loadingCtrl.create({
			content: "Carregando..."
		});  
		return loader;
	}
}
