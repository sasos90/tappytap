import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {BoxList} from "../../models/BoxList";
import {GameModel} from "../../models/GameModel";

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
    /**
     * Games list implementations
     * @type {BoxModel}
     */
    private gameList: Array<GameModel> = [];

    // TODO: Create MODEL!
    public targetColor: BoxModel = new BoxModel("#2196F3");
    public boxList: BoxList = new BoxList();

    constructor(public navCtrl: NavController) {

        // this.boxList.push(new BoxModel("#f44336"));
        // this.boxList.push(new BoxModel("#607D8B"));
        // this.boxList.push(new BoxModel("#9E9E9E"));
        // this.boxList.push(new BoxModel("#2196F3"));
        // this.boxList.push(new BoxModel("#4CAF50"));
        // this.boxList.push(new BoxModel("#2196F3"));
        // this.boxList.push(new BoxModel("#FFEB3B"));
        // this.boxList.push(new BoxModel("#FF9800"));
        // this.boxList.push(new BoxModel("#795548"));
        // this.boxList.push(new BoxModel("#3F51B5"));
        // this.boxList.push(new BoxModel("#2196F3"));

        // TODO: how to init this.boxList with game boxes
        this.gameList.push(new GameModel(1, 1, new BoxModel("#2196F3"), [
            new BoxModel("#2196F3")
        ], 5000, (box: BoxModel) => {

        }));
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
        // How to add TIME (add to starting countdown)
        /*setTimeout(() => {
             this.countDownStart += 1000;
             console.error(this.countDownStart);
         }, 3500);*/
    }

    public boxWasHit(ev) {
        console.log("was hit", ev);
        ev.isHit = true;
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
        this.setCountDownTimer(progress);
        console.log(this.countDownProgress, this.countDownPercentage);

        if (this.countDownProgress <= 0) {
            console.debug("GAME FINISHED!");
            // reset timer to zero so the progress bar is not visible anymore
            this.setCountDownTimer(this.countDownStart);
            window.cancelAnimationFrame(this.rafId);
        }
    }

    private setCountDownTimer(progress: number) {
        this.countDownProgress = this.getCountDownProgress(progress);
        this.countDownPercentage = this.getCountDownPercentage();
    }

    private getCountDownProgress(progress: number) : number {
        return (Math.round(progress) - this.countDownStart) * -1;
    }

    private getCountDownPercentage() : number {
        return this.countDownProgress * 100 / this.countDownStart;
    }
}
