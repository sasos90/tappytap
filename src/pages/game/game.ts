import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {GameModel} from "../../models/GameModel";
import {CountdownTimer} from "../../models/CountdownTimer";
import {CountdownAnimation} from "../../models/CountdownAnimation";
import {Dimension} from "../../models/Dimension";

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
     * Games list implementations
     * @type {BoxModel}
     */
    public gameList: Array<GameModel> = [];
    /**
     * Actual level.
     */
    public level: number = 1;
    public readySetGo: boolean = false;
    public gameInProgress: boolean = false;
    public levelComplete: boolean = false;

    constructor(public navCtrl: NavController) {

        // Game implementations.
        /*************/
        /** LEVEL 1 **/
        /*************/
        let onGameInitLvl1 = (game: GameModel) => {
            this.gameSpecificInit(game);
        };
        let boxClickImplementationLvl1 = (game: GameModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 1 FINISHED");
                this.onLevelFinish();
            }
        };
        this.gameList.push(new GameModel(1, Dimension.DIM_1X1, 2000, onGameInitLvl1, boxClickImplementationLvl1));

        /*************/
        /** LEVEL 2 **/
        /*************/
        let onGameInitLvl2 = (game: GameModel) => {
            this.gameSpecificInit(game);
        };
        let boxClickImplementationLvl2 = (game: GameModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 2 FINISHED");
                this.onLevelFinish();
            }
        };
        this.gameList.push(new GameModel(2, Dimension.DIM_2X2, 3000, onGameInitLvl2, boxClickImplementationLvl2));

        /*************/
        /** LEVEL 3 **/
        /*************/
        let onGameInitLvl3 = (game: GameModel) => {
            this.gameSpecificInit(game);
        };
        let boxClickImplementationLvl3 = (game: GameModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 3 FINISHED");
                this.onLevelFinish();
            }
        };
        this.gameList.push(new GameModel(3, Dimension.DIM_3X3, 5000, onGameInitLvl3, boxClickImplementationLvl3));
    }

    ngOnInit() {
        this.gameWrapper = window.document.getElementById("game-wrapper");
        this.gameElement = window.document.querySelectorAll(".game").item(0);

        // hide the game layout
        this.gameWrapper.classList.add("invisible");

        setTimeout(() => {
            this.setLayoutPosition();

            // simulate starting the game
            this.readySetGo = true;
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

        // run the game's init method
        this.getGame().startTheGame();
        console.debug("GAME STARTED!");

        // run animation frame with countdown timers
        this.frameAnimation.rafId = window.requestAnimationFrame((now) => this.animateTimer(now));
    }

    private beforeGame() {
        this.readySetGo = false;
        this.gameInProgress = true;
        // reset countdown timer
        this.frameAnimation.lastFrame = null;
        this.timer.progress = this.getGame().countDownTime;
    }

    public boxWasHit(box: BoxModel) {
        // console.log("was hit", boxModel);
        this.getGame().handleBoxClick(box);
    }

    /**
     * Get true level number for array.
     * @return number -> Array index.
     */
    public getLevelForArray() : number {
        return this.level - 1;
    }

    public getGame() : GameModel {
        return this.gameList[this.getLevelForArray()];
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
        console.log(this.timer.progress, this.timer.percentage);

        if (this.timer.progress <= 0) {
            // game is finished - countdown timer elapsed
            console.debug("GAME FINISHED!");
            // totally hide progress bar because it was still visible sometimes
            this.timer.resetToZero();
            this.frameAnimation.cancelAnimation();
            this.gameFinished();
        }
    }

    private gameSpecificInit(game: GameModel) {
        this.timer = new CountdownTimer(game.countDownTime);
    }

    /**
     * Handle stuff after level is finished. Should not start the game here.
     */
    private onLevelFinish() {
        // Show score after level complete
        this.levelComplete = true;

        // -- Temporary simulate next level start.
        setTimeout(() => {
            // Handle view
            // Hide level complete
            this.levelComplete = false;
            // Set game in progress flag to hide progress bar and boxes
            this.gameInProgress = false;
            // Start counting down READY SET GO for next level
            this.readySetGo = true;
            this.nextLevel();
        }, 2000);
    }

    private nextLevel() {
        // new level (increase)
        this.level++;
    }

    private gameFinished() {
        // method for showing the final score result of the game
    }
}
