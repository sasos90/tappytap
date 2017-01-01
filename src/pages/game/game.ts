import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    // TODO: Create MODEL!
    public goalColor: string = "blue";

    constructor(public navCtrl: NavController) {

    }
}
