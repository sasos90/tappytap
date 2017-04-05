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
import {Device} from "@ionic-native/device";
import {IHighScore} from "../models/IHighScore";

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
        public admob: AdMob,
        public device: Device
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.initLocalStorageValues();

            if (this.platform.is("cordova")) {
                this.firebase.onTokenRefresh().subscribe((token: string) => {
                    console.log("Firebase token: " + token);
                    LocalStorage.set(LSK.FIREBASE_TOKEN, token);
                });

                // permissions for push notifications - iOS
                if (this.platform.is("ios") && !this.firebase.hasPermission()) {
                    this.firebase.grantPermission();
                }

                // device uuid
                console.log("Device uuid:", this.device.uuid);
                // admob AD
                this.admob.createBanner({
                    adId: "ca-app-pub-8663484789528557/4325806029",
                    position: this.admob.AD_POSITION.BOTTOM_CENTER,
                    isTesting: this.isTestingBanner()
                }).then((par) => {
                    console.log("ADMOB", par);
                });
            }

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    private isTestingBanner() : boolean {
        // list the device.uuid which will have the test banner
        let arrayOfDevices: Array<string> = [
            "7b9ba921977ca9d0", // Saso
            "37e758f5d5c8f245"  // Masa
        ];
        let isTestingBanner = Config.ENV === Environment.DEVELOP || arrayOfDevices.indexOf(this.device.uuid) !== -1;
        console.log("Is testing banner?", isTestingBanner);
        return isTestingBanner;
    }

    private initLocalStorageValues() {
        /*let to: IHighScore = {
            score: 12,
            sync: true
        };
        LocalStorage.set("hs", JSON.stringify(to));
        let out: IHighScore = JSON.parse(LocalStorage.get("hs"));
        console.log("Out", out);*/

        // push notifications
        let pushNotifications = LocalStorage.get(LSK.PUSH_NOTIFICATIONS);
        if (!pushNotifications) {
            LocalStorage.set(LSK.PUSH_NOTIFICATIONS, true);
        }
        // sound
        let sound = LocalStorage.get(LSK.SOUND);
        if (!pushNotifications) {
            LocalStorage.set(LSK.SOUND, true);
        }
    }
}
