import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { TabClip } from '../../pages/tabs/clip/tab_clip';

@Component({
  selector: 'page-clips',
  templateUrl: 'clips.html'
})

export class ClipsPage {
  
	titulo: any;
	clipList: any;
	clip: any;
	offset: any = 0;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navCtrl: NavController, public http: Http, 
				public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController, public events: Events) { 

		this.titulo = 'Clips';

		events.subscribe('AtualizaClipDaLista', (clip) => {
		  this.AtualizaClipsDaLista(clip);
		});

		this.CarregaLista();
	}

	CarregaLista(){
		this.InicializarLoading();
		this.BuscaClips();	
	}

	BuscaClips() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			offset: this.offset, limit: false
	    }
	    
		this.http.post(this.url+'clips/consulta_clips_list_ionic.php', postParams, options)
			.subscribe(data => {
				this.clipList = JSON.parse(data['_body']);
				this.offset = this.clipList.length;
				console.log(this.clipList);
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
			id_clip: id
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
  		this.navCtrl.push(TabClip, {clipSelecionado: this.clip, offset: this.offset});
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

  	AtualizaClipsDaLista(clips) {
  		console.log(clips);
    	for (var i = 0; i < this.clipList.length; i++) {
    		this.clipList.splice(i, 1, clips[i]);
    	}
  	}
}
