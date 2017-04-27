import { NgModule, ErrorHandler,ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { GMapPage } from '../pages/gMap/g-map.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomeService } from '../pages/home/home.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AgmCoreModule} from 'angular2-google-maps/core';
import { HttpModule }    from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    GMapPage,
    TabsPage,

  ],
  imports: [
    BrowserModule,
      HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBlcoASaCC2Vl5owMWVdxmbdqxqO13otOs'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    GMapPage,
    TabsPage
  ],
  providers: [
    HomeService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
