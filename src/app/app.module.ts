import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClipsPage } from '../pages/clips/clips';
import { TabClip } from '../pages/tabs/clip/tab_clip';
import { ClipeSelecionado } from '../pages/clipe_selecionado/clipe_selecionado';
import { ClipeAvaliacao } from '../pages/clipe_avaliacao/clipe_avaliacao';
import { ClipeMensagem } from '../pages/clipe_mensagem/clipe_mensagem';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClipsPage,
    TabClip,
    ClipeSelecionado,
    ClipeAvaliacao,
    ClipeMensagem
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClipsPage,
    TabClip,
    ClipeSelecionado,
    ClipeAvaliacao,
    ClipeMensagem
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
