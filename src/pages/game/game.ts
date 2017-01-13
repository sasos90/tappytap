import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    private gameWrapper: HTMLElement;
    private gameElement: any;

    // TODO: Create MODEL!
    public targetColor: BoxModel = new BoxModel("blue");

    // some demo boxes
    public black: BoxModel = new BoxModel("black");
    public brown: BoxModel = new BoxModel("brown");
    public wheat: BoxModel = new BoxModel("wheat");
    public red: BoxModel = new BoxModel("red");
    public green: BoxModel = new BoxModel("green");
    public aqua: BoxModel = new BoxModel("aqua");
    public blue: BoxModel = new BoxModel("blue");
    public yellow: BoxModel = new BoxModel("yellow");

    constructor(public navCtrl: NavController) {

    }

    ngOnInit() {
        this.gameWrapper = window.document.getElementById("game-wrapper");
        this.gameElement = window.document.querySelectorAll(".game").item(0);

        // hide the game layout
        this.gameWrapper.classList.add("invisible");

        setTimeout(() => {
            this.setLayoutPosition();
        }, 200);
        window.onresize = (event) => {
            this.setLayoutPosition();
        };
    }

    private setLayoutPosition() {

        let width = this.gameWrapper.offsetWidth;
        let height = this.gameWrapper.offsetHeight;
        console.debug("w=" + width + " h=" + height);
        if (width >= height) {
            this.gameElement.style.width = height + "px";
        } else {
            this.gameElement.style.width = "100%";
        }

        // show the game layout
        this.gameWrapper.classList.remove("invisible");
    }
}
