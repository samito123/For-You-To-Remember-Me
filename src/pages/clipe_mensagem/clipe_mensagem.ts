import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-clipe-mensagem',
  templateUrl: 'clipe_mensagem.html'
})

export class ClipeMensagem {
 	
	clip: any;
	mensagemList: any;
	imagemExpandida : any;
	data: any;

	url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navParams: NavParams, public loadingCtrl: LoadingController,
				public http: Http) { 
		
		this.clip = navParams.data;
		this.InicializaTabMensagem();
	}

	InicializaTabMensagem(){
		this.InicializarLoading();
		this.BuscaMensagensDoClipSelecionado();
	}

	BuscaMensagensDoClipSelecionado() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_fytrm', senha: '6m-,f;ekPT%8', banco: 'appot240_fytrm', 
			id_clip: this.clip[0].id_clip
	    }
	    
		this.http.post(this.url+'clips/consulta_mensagens_clipe_id_ionic.php', postParams, options)
			.subscribe(data => {
				this.mensagemList = JSON.parse(data['_body']);
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
	}

	FormataAnoMesPorExtensoEmPortugues(dataHora){
		var meses = new Array("Jan","Fev","Mar",
			"Abr","Mai","Jun","Jul","Ago","Set",
			"Out","Nov","Dez");

		var data = new Date(dataHora);
		var ano = data.getFullYear();
		var mes = data.getMonth();
		var AnoMesPorExtenso = meses[mes] + " de "+ ano;
		return AnoMesPorExtenso;
	}

	FormataDiaHoraPorExtensoEmPortugues(dataHora){
		var semana = new Array("Dom","Seg","Ter",
			"Qua","Qui","Sex","Sáb");


		var data = new Date(dataHora);
		var dia = data.getDate();
		var dias = data.getDay();
		
		var hora = this.FormataNumeroMenorQueDez(data.getUTCHours());
		var minuto = this.FormataNumeroMenorQueDez(data.getUTCMinutes());
		var horaPorExtenso = semana[dias] + ", " + " às "+ hora + ":"+ minuto;
		return horaPorExtenso;
	}

	FormataNumeroMenorQueDez(numero){
		var numeroFormatado = numero;
		if(numero < 10){
			numeroFormatado = "0" + numeroFormatado;
		}
		return numeroFormatado;
	}

	ExpandirImagem(imagem){
		this.imagemExpandida = imagem;
		this.FadeIn(document.querySelector(
			'.divImagemExpandidaClipeMensagem'), "inline-block");
	}

	FecharImagemExpandida(){
		this.FadeOut(document.querySelector('.divImagemExpandidaClipeMensagem'));
	}

	FadeOut(elemento){
		elemento.style.opacity = 1;
		(function fade() {
			if ((elemento.style.opacity -= .1) < 0) {
				elemento.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();
	}

	FadeIn(elemento, display){
		elemento.style.opacity = 0;
		elemento.style.display = display || "block";
		(function fade() {
			var val = parseFloat(elemento.style.opacity);
			if (!((val += .1) > 1)) {
				elemento.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}

	EditarMensagem(idMensagem){
		console.log("id: "+ idMensagem);
	}

	ExcluirMensagem(idMensagem){
		console.log("id: "+ idMensagem);
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
