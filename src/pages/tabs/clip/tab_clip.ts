import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ClipeSelecionado } from '../../clipe_selecionado/clipe_selecionado';
import { ClipeAvaliacao } from '../../clipe_avaliacao/clipe_avaliacao';

@Component({
  selector: 'page-tab-clip',
  templateUrl: 'tab_clip.html'
})

export class TabClip {
 	
 	clip: any;
 	titulo: any;
 	avaliacao: any;

 	tab1: any;
  	tab2: any;
  	tab3: any;

  	constructor(public navParams: NavParams) {
  		
  		this.tab1 = ClipeSelecionado;
  		this.tab3 = ClipeAvaliacao;
  		this.clip = navParams.get("clipSelecionado");	
  		console.log(this.clip);
  		this.titulo = this.clip[0].titulo_clip;
  		this.avaliacao = this.clip[0].nota_clip;
  	}

}
