import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LSK} from "../../models/LSK";
import {LocalStorage} from "../../services/LocalStorage";

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class Settings {

    public pushNotifications: boolean = true;
    public sound: boolean = true;

    constructor(public navCtrl: NavController) {}

    ngOnInit() {
        this.pushNotifications = LocalStorage.get(LSK.PUSH_NOTIFICATIONS) || true;
        this.sound = LocalStorage.get(LSK.SOUND) || true;
    }

    public back() {
        this.navCtrl.pop();
    }

    public save() {
        LocalStorage.set(LSK.PUSH_NOTIFICATIONS, this.pushNotifications)
        LocalStorage.set(LSK.SOUND, this.sound)
        // TODO: Show toast if needed
        console.warn("Show toast if needed");
        this.navCtrl.pop();
    }
}
