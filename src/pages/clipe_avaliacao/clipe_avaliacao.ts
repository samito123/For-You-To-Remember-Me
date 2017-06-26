import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ClipsPage } from '../clips/clips';

@Component({
  selector: 'page-clipe-avaliacao',
  templateUrl: 'clipe_avaliacao.html'
})

export class ClipeAvaliacao {
 	
	clip: any;
	imagem: any;
	avaliacao: any;

	loader;

	constructor(public navParams: NavParams, public loadingCtrl: LoadingController) { 
		
		this.clip = navParams.data;
		this.InicializaTabAvaliacao();
	}

	InicializaTabAvaliacao(){
		this.InicializarLoading();
		this.SetAvaliacaoSelecionado();
		this.EncerraLoading();
	}

	SetAvaliacaoSelecionado(){
		this.imagem = this.clip[0].img_clip;
		this.avaliacao = this.clip[0].nota_clip;
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
