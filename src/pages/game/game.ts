import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    // style elements
    private gameWrapper: HTMLElement;
    private gameElement: any;

    // objects
    /**
     * Reference ID for requestAnimationFrame javascript function, so we can cancel it later
     */
    private rafId: any;
    /**
     * Miliseconds when last frame was executed.
     */
    private lastFrame: number = null;
    /**
     * 5 seconds countdown hardcoded for now.
     */
    private countDownStart: number = 5000;
    public countDownProgress: number = this.countDownStart;
    public countDownPercentage: number = 100;

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
            this.startGame();
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

    public startGame() {
        // GAME
        console.debug("GAME STARTED!");
        this.rafId = window.requestAnimationFrame((now) => this.rafCallback(now));
    }

    /**
     * Each game frame
     * @param now
     */
    private rafCallback(now: number) {

        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        let progress: number = now - this.lastFrame;

        this.rafId = window.requestAnimationFrame((now) => this.rafCallback(now));
        this.step(progress);
    }

    /**
     * Logic of the game with animations.
     * After 5 seconds the game is done.
     *
     * @param progress Miliseconds for actual progress
     */
    private step(progress: number) {
        this.countDownProgress = this.getCountDownProgress(progress);
        this.countDownPercentage = this.getCountDownPercentage();
        console.log(this.countDownProgress, this.countDownPercentage);

        if (this.countDownProgress <= 0) {
            console.debug("GAME FINISHED!");
            window.cancelAnimationFrame(this.rafId);
        }
    }

    private getCountDownProgress(progress: number) : number {
        return (Math.round(progress) - this.countDownStart) * -1;
    }

    private getCountDownPercentage() : number {
        return this.countDownProgress * 100 / this.countDownStart;
    }
}
