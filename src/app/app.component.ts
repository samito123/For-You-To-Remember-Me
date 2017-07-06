import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ClipsPage } from '../pages/clips/clips';
import { LoginPage } from '../pages/login/login';


@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
  
  usuarioLogado;
  imagemUsuario: any;
  nickUsuario: any;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, public modalCtrl: ModalController,
    public events: Events) {

    events.subscribe('SetDadosUsuarioMenu', (clip) => {
      this.SetDadosUsuarioMenu();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  SetDadosUsuarioMenu(){
    this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    this.imagemUsuario = this.usuarioLogado[0].img_usuario;
    this.nickUsuario = this.usuarioLogado[0].nick_usuario;
  }

  LogoutUsuario(){
    sessionStorage.clear();
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}

