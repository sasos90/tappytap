import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import {MainMenu} from "../pages/mainmenu/mainmenu";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Firebase} from "@ionic-native/firebase";
import {LocalStorage} from "../services/LocalStorage";
import {LSK} from "../models/LSK";
import { AdMob, AdMobOptions, AdSize, AdExtras } from '@ionic-native/admob';
import {Config} from "../services/Config";
import {Environment} from "../models/Environment";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = MainMenu;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public firebase: Firebase,
        public admob: AdMob
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            if (this.platform.is("cordova")) {
                this.firebase.onTokenRefresh().subscribe((token: string) => {
                    console.log("Firebase token: " + token);
                    LocalStorage.set(LSK.FIREBASE_TOKEN, token);
                });

                // permissions for push notifications - iOS
                if (this.platform.is("ios") && !this.firebase.hasPermission()) {
                    this.firebase.grantPermission();
                }

                // admob AD
                this.admob.createBanner({
                    adId: "ca-app-pub-8663484789528557/4325806029",
                    position: this.admob.AD_POSITION.BOTTOM_CENTER,
                    isTesting: Config.ENV === Environment.DEVELOP
                }).then((par) => {
                    console.warn("ADMOB");
                    console.warn(par);
                });
            }

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
