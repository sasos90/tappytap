import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LSK} from "../../models/LSK";
import {LocalStorage} from "../../services/LocalStorage";
import {Firebase} from "@ionic-native/firebase";

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class Settings {

    public pushNotifications: boolean = true;
    public sound: boolean = true;

    constructor(
        public navCtrl: NavController,
        public firebase: Firebase
    ) {
        this.firebase.logEvent("settings_screen", {});
    }

    ngOnInit() {
        this.pushNotifications = LocalStorage.get(LSK.PUSH_NOTIFICATIONS) || true;
        this.sound = LocalStorage.get(LSK.SOUND) || true;
    }

    public back() {
        this.firebase.logEvent("discard_settings", {
            pushNotifications: this.pushNotifications,
            sound: this.sound
        });
        this.navCtrl.pop();
    }

    public save() {
        // firebase
        this.firebase.logEvent("save_settings", {
            pushNotifications: this.pushNotifications,
            sound: this.sound
        });

        // save to storage
        LocalStorage.set(LSK.PUSH_NOTIFICATIONS, this.pushNotifications);
        LocalStorage.set(LSK.SOUND, this.sound);
        // TODO: Show toast if needed
        console.warn("Show toast if needed");
        this.navCtrl.pop();
    }
}
