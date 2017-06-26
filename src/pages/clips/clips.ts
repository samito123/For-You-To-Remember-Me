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
  
	titulo: any;
	clipList: any;
	clip: any;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navCtrl: NavController, public http: Http, 
				public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController, public events: Events) { 

		this.titulo = 'Clips';

		events.subscribe('AtualizaClipDaLista', (clip) => {
		  this.AtualizaClipDaLista(clip);
		});

		this.CarregaLista(0);
	}

	CarregaLista($offset){
		this.InicializarLoading();
		this.BuscaClips($offset);	
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
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
	}

	ClickClip(id) {
		this.InicializarLoading();
		this.RecuperaClip(id);	
  	}

  	RecuperaClip(id){
  		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			id_clip: id, visualizacoes_clip: 20
	    }
	    
		this.http.post(this.url+'clips/consulta_clipe_id_ionic.php', postParams, options)
			.subscribe(data => {
				this.clip = JSON.parse(data['_body']);
				this.RedirecionaParaTabClip();
			}, error => {
				console.log(error);
				this.loader.dismiss();
		});
  	}

  	RedirecionaParaTabClip(){
  		this.EncerraLoading();
  		//this.modalCtrl.create(TabClip).present();
  		this.navCtrl.push(TabClip, {clipSelecionado: this.clip});
  		//this.navCtrl.push(TabClip, {clipSelecionado: this.clip});
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

  	AtualizaClipDaLista($clipe) {
    	var index = this.clipList.findIndex(clipe => clipe.id_clip === $clipe[0].id_clip);
    	this.clipList[index].visualizacoes_clip = $clipe[0].visualizacoes_clip;
    	this.clipList[index].nota_clip = $clipe[0].nota_clip;
  	}
}
