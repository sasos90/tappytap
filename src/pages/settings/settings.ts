import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {LSK} from "../../models/LSK";
import {LocalStorage} from "../../services/LocalStorage";
import {Firebase} from "@ionic-native/firebase";
import {FBKey} from "../../models/FBKey";

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class Settings {

    public pushNotifications: boolean = true;
    public sound: boolean = true;

    constructor(
        public navCtrl: NavController,
        public firebase: Firebase,
        public platform: Platform
    ) {
        if (this.platform.is("cordova")) {
            this.firebase.logEvent(FBKey.SETTINGS.SCREEN, {}).then((success) => {
                console.log("FB: " + FBKey.SETTINGS.SCREEN, success);
            });
        }
    }

    ngOnInit() {
        this.pushNotifications = LocalStorage.get(LSK.PUSH_NOTIFICATIONS);
        this.sound = LocalStorage.get(LSK.SOUND);
    }

    public back() {
        if (this.platform.is("cordova")) {
            this.firebase.logEvent(FBKey.SETTINGS.DISCARD, {
                pushNotifications: this.pushNotifications,
                sound: this.sound
            }).then((success) => {
                console.log("FB: " + FBKey.SETTINGS.DISCARD, success);
            });
        }
        this.navCtrl.pop();
    }

    public save() {
        if (this.platform.is("cordova")) {
            // firebase
            this.firebase.logEvent(FBKey.SETTINGS.SAVE, {
                pushNotifications: this.pushNotifications,
                sound: this.sound
            }).then((success) => {
                console.log("FB: " + FBKey.SETTINGS.SAVE, success);
            });
        }

        // save to storage
        LocalStorage.set(LSK.PUSH_NOTIFICATIONS, this.pushNotifications);
        LocalStorage.set(LSK.SOUND, this.sound);
        // TODO: Show toast if needed
        console.warn("Show toast if needed");
        this.navCtrl.pop();
    }
}
