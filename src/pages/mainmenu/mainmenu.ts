import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Game} from "../game/game";
import {Instructions} from "../instructions/instructions";
import {HighScore} from "../highscore/highscore";
import {Settings} from "../settings/settings";
import {LocalStorage} from "../../services/LocalStorage";
import {LSK} from "../../models/LSK";

@Component({
    selector: 'main-menu',
    templateUrl: 'mainmenu.html'
})
export class MainMenu {

    public highscore: number;

    constructor(public navCtrl: NavController) {
        this.highscore = LocalStorage.get(LSK.HIGHSCORE);
    }

    ngOnInit() {}

    public startGameMenu() {
        this.navCtrl.setRoot(Game);
    }

    public instructionsMenu() {
        this.navCtrl.push(Instructions);
    }

    public highscoreMenu() {
        this.navCtrl.push(HighScore);
    }

    public settingsMenu() {
        this.navCtrl.push(Settings);
    }
}
