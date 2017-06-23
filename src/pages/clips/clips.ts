import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { ClipeSelecionado } from '../../pages/clipe_selecionado/clipe_selecionado';
import { TabClip } from '../../pages/tabs/clip/tab_clip';

@Component({
  selector: 'page-clips',
  templateUrl: 'clips.html'
})

export class ClipsPage {
  
	//clips = [];
	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	titulo: any;
	clipList: any;
	loader = this.ConfiguraLoading();

	constructor(public navCtrl: NavController, public http: Http, 
				public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController, public events: Events) { 

		this.titulo = 'Clips';

		events.subscribe('AtualizaClipDaLista', (clip) => {
		  this.AtualizaClipDaLista(clip);
		});

		//if(this.clips.length == 0){
			this.CarregaLista(0);
		//}
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
				this.clipList = JSON.parse(data['_body']);
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
    	//this.navCtrl.push(ClipeSelecionado, {id_clip: id, visualizacoes_clip: visualizacoes});
    	this.navCtrl.push(TabClip, {id_clip: id, visualizacoes_clip: visualizacoes});
  	}

  	AtualizaClipDaLista($clipe) {
    	var index = this.clipList.findIndex(clipe => clipe.id_clip === $clipe[0].id_clip);
    	this.clipList[index].visualizacoes_clip = $clipe[0].visualizacoes_clip;
    	this.clipList[index].nota_clip = $clipe[0].nota_clip;
  	}
}
