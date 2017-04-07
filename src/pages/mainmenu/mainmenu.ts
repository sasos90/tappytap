import { Component } from '@angular/core';

import {NavController, ToastController} from 'ionic-angular';
import {Game} from "../game/game";
import {Instructions} from "../instructions/instructions";
import {HighScore} from "../highscore/highscore";
import {Settings} from "../settings/settings";
import {LocalStorage} from "../../services/LocalStorage";
import {LSK} from "../../models/LSK";
import {Config} from "../../services/Config";
import {IHighScore} from "../../models/IHighScore";

@Component({
    selector: 'main-menu',
    templateUrl: 'mainmenu.html'
})
export class MainMenu {

    public highscore: IHighScore = {
        best: 0,
        sync: true
    };
    public synchronizingBestScore: boolean = false;
    public version: string = Config.VERSION;

    constructor(
        public navCtrl: NavController,
        public toast: ToastController
    ) {
        this.highscore = JSON.parse(LocalStorage.get(LSK.HIGHSCORE));
        console.log("HIGHSCORE:", this.highscore);
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

    public rankingsMenu() {
        this.toast.create({
            message: "Rankings are comming soon!",
            duration: 3000
        }).present();
    }

    public settingsMenu() {
        this.navCtrl.push(Settings);
    }
}
