import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Avaliacao } from '../modal/avaliacao/avaliacao';

@Component({
  selector: 'page-clipe',
  templateUrl: 'clipe_selecionado.html'
})

export class ClipeSelecionado {
 	
 	opcoes = "clipe";
  	clipe: any;
  	id: any;
  	visualizacoes: any;

  	titulo: any;
  	subtitulo: any;
  	descricao: any;
  	videoUrl: any;

  	avaliacao = 50;

  	loader = this.ConfiguraLoading();
  	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
				public http: Http, public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController, public events: Events,
				public domSanitizer: DomSanitizer) { 
		
		this.id = navParams.get("id_clip");
		this.visualizacoes = parseInt(navParams.get("visualizacoes_clip")) + parseInt("1");
				
		this.CarregaClipeSelecionado();
	}

	CarregaClipeSelecionado(){
		this.loader.present().then(() => {
			this.BuscaClipeSelecionado();
		}); 
	}

	BuscaClipeSelecionado() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			id_clip: 16, visualizacoes_clip: 20
	    }
	    
		this.http.post(this.url+'clips/consulta_clipe_id_ionic.php', postParams, options)
			.subscribe(data => {
				this.clipe = JSON.parse(data['_body']);
				this.SetClipeSelecionado();
			}, error => {
				console.log(error);
				this.loader.dismiss();
		});
	}

	SetClipeSelecionado(){
		this.titulo = this.clipe[0].titulo_clip;
		this.subtitulo = this.clipe[0].subtitulo_clip;
		this.descricao = this.clipe[0].descricao_clip.split('##').
						 join('<br /><br />').split('#').join('<br />');
		
		this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl
						("http://www.youtube.com/embed/"+this.clipe[0].link_clip);
		//document.getElementById("conteudo").style.display = "block"; 

		this.AtualizaClipDaLista();
	}

	AtualizaClipDaLista(){
		this.events.publish('AtualizaClipDaLista', this.clipe);
		this.EncerraLoading();
	}

	VisualizarAvaliacao() {
    	let modal = this.modalCtrl.create(Avaliacao);
    	modal.present();
  	}

	ConfiguraLoading() { 
		let loader = this.loadingCtrl.create({
			content: "Carregando..."
		});  
		return loader;
	}

	EncerraLoading(){
		this.loader.dismiss();
	}
}
