import { Component } from '@angular/core';
import { ClipeSelecionado } from '../../clipe_selecionado/clipe_selecionado';
import { ClipsPage } from '../../clips/clips';

@Component({
  selector: 'page-tab-clip',
  templateUrl: 'tab_clip.html'
})

export class TabClip {
 	
 	tab1Root: any = ClipeSelecionado;
  	tab2Root: any = ClipeSelecionado;

  	constructor() {

  	}
}
