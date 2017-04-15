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
import {Backend} from "../../services/Backend";

@Component({
    selector: 'main-menu',
    templateUrl: 'mainmenu.html'
})
export class MainMenu {

    public highscore: number = parseInt(LocalStorage.get(LSK.HIGHSCORE));
    public levelReached: number = parseInt(LocalStorage.get(LSK.LEVEL_REACHED) || 1);
    public highscoreSynced: boolean = LocalStorage.get(LSK.HIGHSCORE_SYNCED) === "true" || false;
    public synchronizingBestScore: boolean = false;
    public rank: number;
    public retrievingRank: boolean = false;
    public version: string = Config.VERSION;

    constructor(
        public navCtrl: NavController,
        public toast: ToastController,
        public backend: Backend
    ) {}

    ngOnInit() {
        if (!this.highscoreSynced && this.highscore > 0) {
            console.debug("Sync score");
            this.synchronizingBestScore = true;
            this.retrievingRank = true;
            // sync the highscore and rank
            this.backend.sendScore(this.highscore, this.levelReached, (rank) => {
                this.rank = rank;
                this.highscoreSynced = true;
                LocalStorage.set(LSK.HIGHSCORE_SYNCED, true);

                this.retrievingRank = false;
                this.synchronizingBestScore = false;
            }, () => {
                this.retrievingRank = false;
                this.synchronizingBestScore = false;
            });
        } else {
            // just retrieve rank
            console.debug("Get rank");
            this.retrievingRank = true;
            this.backend.getRank((rank) => {
                this.rank = rank;

                this.retrievingRank = false;
            }, () => {
                this.retrievingRank = false;
            });
        }
    }

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
