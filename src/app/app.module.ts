import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {OrderupdatePageModule} from './orderupdate/orderupdate.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {APP_CONFIG, BaseAppConfig} from './app.config';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {DatePipe} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule,
        OrderupdatePageModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        DatePipe,
        {provide: APP_CONFIG, useValue: BaseAppConfig},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
