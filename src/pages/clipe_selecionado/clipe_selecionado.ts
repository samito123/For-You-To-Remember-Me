import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-clipe',
  templateUrl: 'clipe_selecionado.html'
})

export class ClipeSelecionado {
 	
 	opcoes = "clipe";
  	clip: any;
  	visualizacoes: any;

  	titulo: any;
  	subtitulo: any;
  	descricao: any;
  	videoUrl: any;

  	avaliacao = 50;

  	loader;
  	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	
	constructor(public navParams: NavParams, public loadingCtrl: LoadingController,
				public domSanitizer: DomSanitizer) { 
		this.clip = navParams.data;
		this.InicializaTabClip();
	}

	InicializaTabClip(){
		this.InicializarLoading();
		this.SetClipeSelecionado();
		this.EncerraLoading();
	}

	SetClipeSelecionado(){
		
		this.titulo = this.clip[0].titulo_clip;
		this.subtitulo = this.clip[0].subtitulo_clip;
		this.descricao = this.clip[0].descricao_clip.split('##').
						 join('<br /><br />').split('#').join('<br />');
		
		this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl
						("http://www.youtube.com/embed/"+this.clip[0].link_clip);

	}

	AtualizaClipDaLista(){
		//this.events.publish('AtualizaClipDaLista', this.clipe);
		//this.EncerraLoading();
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
