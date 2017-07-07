import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { ClipeSelecionado } from '../../clipe_selecionado/clipe_selecionado';
import { ClipeMensagem } from '../../clipe_mensagem/clipe_mensagem';
import { ClipeAvaliacao } from '../../clipe_avaliacao/clipe_avaliacao';
import { AdicionarComentarioClip } from '../../modal/adicionar_comentario_clip/adicionar_comentario_clip';


@Component({
  selector: 'page-tab-clip',
  templateUrl: 'tab_clip.html'
})

export class TabClip {
 	
 	clip: any;
 	clipList: any;
 	titulo: any;
 	qtd_mensagens: any;
 	avaliacao: any;
 	offset: any;

 	tab1: any;
	tab2: any;
	tab3: any;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navParams: NavParams, public navCtrl: NavController,
				public loadingCtrl: LoadingController, public http: Http,
				public events: Events, public modalCtrl: ModalController) {
		this.tab1 = ClipeSelecionado;
		this.tab2 = ClipeMensagem;
		this.tab3 = ClipeAvaliacao;
		this.clip = navParams.get("clipSelecionado");	
		this.offset = navParams.get("offset");
		
		this.titulo = this.clip[0].titulo_clip;
		this.qtd_mensagens = this.clip[0].qtd_mensagens;
		this.avaliacao = this.clip[0].nota_clip;
	}

	AtualizaListaDeClips(){
		this.InicializarLoading();
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			offset: this.offset, limit: true
	    }
	    
		this.http.post(this.url+'clips/consulta_clips_list_ionic.php', postParams, options)
			.subscribe(data => {
				this.clipList = JSON.parse(data['_body']);
				this.events.publish('AtualizaClipDaLista', this.clipList);
				this.EncerraLoading();
				this.VoltarParaListaDeClips();
			}, error => {
				console.log(error);// Error getting the data
		});	
	}

	VoltarParaListaDeClips(){
		this.navCtrl.pop();
	}

	EscreverNovoComentario(){
		let modal = this.modalCtrl.create(AdicionarComentarioClip);
    	modal.present();
    	console.log("aaa");
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
