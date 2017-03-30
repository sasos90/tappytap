import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class Settings {

    public pushNotifications: boolean = true;
    public sound: boolean = true;

    constructor(public navCtrl: NavController) {}

    ngOnInit() {}

    public back() {
        this.navCtrl.pop();
    }

    public save() {
        // TODO: implement that method
        console.log(this.pushNotifications, this.sound);
        console.error("Implement the saving to local store and show toast");
        this.navCtrl.pop();
    }
}
