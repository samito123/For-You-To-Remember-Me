import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-clipe-mensagem',
  templateUrl: 'clipe_mensagem.html'
})

export class ClipeMensagem {
 	
	clip: any;
	imagem: any;
	titulo: any;
	subtitulo: any;
	avaliacao: any;
	avaliacaoGeral: any;

	loader;

	constructor(public navParams: NavParams, public loadingCtrl: LoadingController) { 
		
		this.clip = navParams.data;
		this.InicializaTabMensagem();
	}

	InicializaTabMensagem(){
		this.InicializarLoading();
		this.SetMensagemClipSelecionado();
		this.EncerraLoading();
	}

	SetMensagemClipSelecionado(){
		this.imagem = this.clip[0].img_clip;
		this.titulo = this.clip[0].titulo_clip;
		this.subtitulo = this.clip[0].subtitulo;		
		this.avaliacao = this.clip[0].nota_clip;
		this.avaliacaoGeral = 40;
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
