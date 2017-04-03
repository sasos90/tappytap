import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'highscore',
    templateUrl: 'highscore.html'
})
export class HighScore {

    constructor(public navCtrl: NavController) {}

    ngOnInit() {}

    public back() {
        this.navCtrl.pop();
    }
}
