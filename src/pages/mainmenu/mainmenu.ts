import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {GameModel} from "../../models/GameModel";
import {CountdownTimer} from "../../models/CountdownTimer";
import {ScoreModel} from "../../models/ScoreModel";
import {HeaderStatus} from "../../models/HeaderStatus";
import {NativeAudio} from "ionic-native";

@Component({
    selector: 'main-menu',
    templateUrl: 'mainmenu.html'
})
export class MainMenu {

    constructor(public navCtrl: NavController) {}

    ngOnInit() {}
}
