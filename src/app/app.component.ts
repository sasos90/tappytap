import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import {MainMenu} from "../pages/mainmenu/mainmenu";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Firebase} from "@ionic-native/firebase";
import {LocalStorage} from "../services/LocalStorage";
import {LSK} from "../models/LSK";

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
        public firebase: Firebase
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            if (this.platform.is("cordova")) {
                this.firebase.onTokenRefresh().subscribe((token: string) => {
                    LocalStorage.set(LSK.FIREBASE_TOKEN, token);
                });
            }

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
