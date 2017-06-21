import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ClipeSelecionado } from '../../pages/clipe_selecionado/clipe_selecionado';

@Component({
  selector: 'page-home',
  templateUrl: 'clips.html'
})

export class ClipsPage {
  
	clips = [];
	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	titulo: any;
	clipList: any;
	loader = this.ConfiguraLoading();

	constructor(public navCtrl: NavController, public http: Http, 
				public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController) { 

		this.titulo = 'Clips';

		if(this.clips.length == 0){
			this.CarregaLista(0);
		}
	}

	CarregaLista($offset){
		this.loader.present().then(() => {
			this.BuscaClips($offset);
			this.loader.dismiss();
		}); 
	}

	BuscaClips($offset) {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			offset: $offset
	    }
	    
		this.http.post(this.url+'clips/consulta_clips_list_ionic.php', postParams, options)
			.subscribe(data => {
				this.clips = JSON.parse(data['_body']);
				//console.log(this.clips);
				this.clipList = this.clips;
				//console.log(this.clipList);
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

	VisualizarClipSelecionado(id, visualizacoes) {
    	this.navCtrl.push(ClipeSelecionado, {id_clip: id, visualizacoes_clip: visualizacoes});
  	}

  	aa() {
    	console.log("aaaaa");
  	}
}
