import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClipsPage } from '../pages/clips/clips';
import { ClipeSelecionado } from '../pages/clipe_selecionado/clipe_selecionado';
import { Avaliacao } from '../pages/modal/avaliacao/avaliacao';
import { TabClip } from '../pages/tabs/clip/tab_clip';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClipsPage,
    ClipeSelecionado,
    Avaliacao,
    TabClip
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
    ClipeSelecionado,
    Avaliacao,
    TabClip
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
