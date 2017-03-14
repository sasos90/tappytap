import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {GameModel} from "../../models/GameModel";
import {CountdownTimer} from "../../models/CountdownTimer";
import {CountdownAnimation} from "../../models/CountdownAnimation";
import {ScoreModel} from "../../models/ScoreModel";
import {HeaderStatusAnimation} from "../../models/HeaderStatusAnimation";
import {HeaderStatus} from "../../models/HeaderStatus";
import {NativeAudio} from "ionic-native";

@Component({
    selector: 'game',
    templateUrl: 'game.html'
})
export class Game {

    // style elements
    private gameWrapper: HTMLElement;
    private gameElement: any;

    /**
     * Model for requestAnimationFrame - countdown animation.
     */
    private frameAnimation = new CountdownAnimation();
    /**
     * Countdown timer object
     */
    public timer: CountdownTimer = new CountdownTimer(0);
    /**
     * Actual level.
     */
    public level: number = 1;
    public readySetGo: boolean = false;
    public gameInProgress: boolean = false;
    public finalResult: boolean = false;
    public score: ScoreModel = new ScoreModel();

    /**
     * Game data
     */
    public gameModel: GameModel;
    private exposedTimeout: number;
    public exposed: boolean = false;
    public headerStatus: HeaderStatus = new HeaderStatus("HIT");

    constructor(public navCtrl: NavController) {
        this.preloadSounds();
    }

    ngOnInit() {
        this.generateGameModel();
        this.gameWrapper = window.document.getElementById("game-wrapper");
        this.gameElement = window.document.querySelectorAll(".game").item(0);

        // hide the game layout
        this.gameWrapper.classList.add("invisible");

        setTimeout(() => {
            this.setLayoutPosition();

            // simulate starting the game
            this.showReadySetGo();
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
        this.beforeGame();
        console.debug("GAME STARTED!");
        // run animation frame with countdown timers
        this.frameAnimation.rafId = window.requestAnimationFrame((now) => this.animateTimer(now));
    }

    private beforeGame() {
        this.hideReadySetGo();
        this.headerStatus.clear();
        this.gameInProgress = true;
        // reset countdown timer
        this.frameAnimation.lastFrame = null;
        this.timer = new CountdownTimer(10000);
        // expose the boxes
        this.exposeBoxes();
    }

    public exposeBoxes() {
        clearTimeout(this.exposedTimeout);
        this.exposed = true;
        this.exposedTimeout = setTimeout(() => {
            this.exposed = false;
        }, 500);
    }

    public boxWasTapped(box: BoxModel) {
        this.getGame().handleBoxClick(box);
    }

    public getGame() : GameModel {
        return this.gameModel;
    }

    /**
     * Each game frame
     * @param now
     */
    private animateTimer(now: number) {

        if (!this.frameAnimation.lastFrame) {
            this.frameAnimation.lastFrame = now;
        }
        let progress: number = now - this.frameAnimation.lastFrame;

        this.frameAnimation.rafId = window.requestAnimationFrame((now) => this.animateTimer(now));
        this.step(progress);
    }

    /**
     * Logic of the game with animations.
     * After 5 seconds the game is done.
     *
     * @param progress Miliseconds for actual progress
     */
    private step(progress: number) {
        this.timer.progress = progress;
        // console.log(this.timer.progress, this.timer.percentage);
        console.log(this.score.total);

        if (this.timer.progress <= 0) {
            // game is finished - countdown timer elapsed
            console.debug("GAME FINISHED!");
            // totally hide progress bar because it was still visible sometimes
            this.timer.resetToZero();
            this.frameAnimation.cancelAnimation();
            this.gameFinished();
        }
    }

    /**
     * Handle stuff after level is finished. Should not start the game here.
     */
    public onLevelFinish() {
        // go to next level
        this.level++;
        // generate new level game
        this.generateGameModel();
        // expose the boxes
        this.exposeBoxes();
        // Stop the countdown timer
        // this.frameAnimation.cancelAnimation();
        // Timer progress is the remaining miliseconds - which is the score to add eventually
        let lastScore: number = this.timer.progress;
        console.warn("Result: " + lastScore);
        this.score.last = Math.round(lastScore / 100);
        // Open the component with scores
        // this.finalResult = true;
    }

    /**
     * Prepare everything to run next level and start counting down (ready set go)
     */
    private replayTheGame() {
        // 1. show instructions
        this.headerStatus.text = "HIT";
        // new level (increase)
        this.level = 1;
        this.generateGameModel();
        // Handle view
        // Hide final result wrapper
        this.hideFinalResult();
        this.score.scoreReset();
        // Set game in progress flag to hide progress bar and boxes
        this.gameInProgress = false;
        // Start counting down READY SET GO for next level
        this.showReadySetGo();
    }

    private gameFinished() {
        // Method for showing the final score result of the game
        this.showFinalResult();
    }

    private generateGameModel() {
        this.gameModel = GameModel.generateNewGame(this.level, this);
    }

    private showFinalResult() {
        this.finalResult = true;
    }

    private hideFinalResult() {
        this.finalResult = false;
    }

    private showReadySetGo() {
        this.readySetGo = true;
    }

    private hideReadySetGo() {
        this.readySetGo = false;
    }

    public getLevelClassSuffix() : number|string {
        if (this.level < 6) {
            return this.level;
        }
        return "max";
    }

    private preloadSounds() {
        // preload sounds
        NativeAudio.preloadSimple("hit", "assets/sounds/hit.mp3");
        NativeAudio.preloadSimple("miss", "assets/sounds/miss.wav");
    }
}
