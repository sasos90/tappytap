import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Backend} from "../../services/Backend";
import {Device} from "@ionic-native/device";

@Component({
    selector: 'highscore',
    templateUrl: 'highscore.html'
})
export class HighScore {

    // TODO needs interface
    public allTimeHighscores: Array<any> = [];

    constructor(
        public navCtrl: NavController,
        public device: Device,
        public backend: Backend
    ) {}

    ngOnInit() {
        this.backend.getHighscores((highscores) => {
            this.allTimeHighscores = highscores.allTime;
        }, () => {

        });
    }

    public back() {
        this.navCtrl.pop();
    }
}
