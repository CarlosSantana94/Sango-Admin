import {Component, OnInit, Inject} from '@angular/core';
import {Platform, NavController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from './app.config';
import {MyEvent} from 'src/services/myevent.services';
import {Constants} from 'src/models/contants.models';
import {BuyappalertPage} from 'src/app/buyappalert/buyappalert.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    rtlSide = 'left';
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Inicio',
            url: '/principal',
            icon: 'zmdi zmdi-home'
        },
        {
            title: 'Pedidos',
            url: '/pedidos',
            icon: 'zmdi zmdi-money'
        },
        {
            title: 'Solicitud Cancelaciones',
            url: '/solicitud-cancelaciones',
            icon: 'zmdi zmdi-close'
        },
        /*{
            title: 'dashboard',
            url: '/home',
            icon: 'zmdi zmdi-desktop-mac'
        },*/
        {
            title: 'Ruta',
            url: '/mapa',
            icon: 'zmdi zmdi-map'
        },

        {
            title: 'Productos',
            url: '/items',
            icon: 'zmdi zmdi-shopping-basket'
        },

        /* {
             title: 'Categorias',
             url: '/categories',
             icon: 'zmdi zmdi-layers'
         },*/

        {
            title: 'Mensajes',
            url: '/messages',
            icon: 'zmdi zmdi-comments'
        },
        {
            title: 'Cerrar Sesión',
            url: '/signin',
            icon: 'zmdi zmdi-power'
        },
        {
            title: 'Aviso De Privacidad',
            url: '/aviso-de-privacidad',
            icon: 'zmdi zmdi-attachment-alt'
        },
        {
            title: 'Terminos Y Condiciones',
            url: '/terminos-ycondiciones',
            icon: 'zmdi zmdi-attachment-alt'
        }
    ];

    constructor(
        @Inject(APP_CONFIG) public config: AppConfig,
        private platform: Platform,
        private navCtrl: NavController,
        private modalController: ModalController,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService, private myEvent: MyEvent) {
        this.initializeApp();
        this.myEvent.getLanguageObservable().subscribe(value => {
            this.navCtrl.navigateRoot(['./']);
            this.globalize(value);
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
            this.globalize(defaultLang);
        });
    }

    globalize(languagePriority) {
        this.translate.setDefaultLang('en');
        let defaultLangCode = this.config.availableLanguages[0].code;
        this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    }

    setDirectionAccordingly(lang: string) {
        switch (lang) {
            case 'ar': {
                this.rtlSide = 'rtl';
                break;
            }
            default: {
                this.rtlSide = 'ltr';
                break;
            }
        }
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }

    buyappalert() {
        this.modalController.create({component: BuyappalertPage}).then((modalElement) => modalElement.present());
    }

    developed_by() {
        // window.open('https://opuslab.works/', '_system', 'location=no');
    }
}
