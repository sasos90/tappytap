import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    public goalColor: string = "blue";

    constructor(public navCtrl: NavController) {

    }
}
