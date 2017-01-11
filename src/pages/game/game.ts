import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    private gameWrapper: HTMLElement;
    private gameElement: any;

    // TODO: Create MODEL!
    public goalColor: string = "blue";

    constructor(public navCtrl: NavController) {

    }

    ngAfterViewInit() {
        this.gameWrapper = window.document.getElementById("game-wrapper");
        this.gameElement = window.document.querySelectorAll(".game").item(0);
        setTimeout(() => {
            this.setLayoutPosition();
        }, 50);
        window.onresize = (event) => {
            this.setLayoutPosition();
        };
    }

    private setLayoutPosition() {

        let width = this.gameWrapper.offsetWidth;
        let height = this.gameWrapper.offsetHeight - 50;
        console.debug("w=" + width + " h=" + height);
        if (width >= height) {
            this.gameElement.style.width = height + "px";
        } else {
            this.gameElement.style.width = "100%";
        }
    }
}
