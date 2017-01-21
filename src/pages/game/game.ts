import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {BoxList} from "../../models/BoxList";
import {GameModel} from "../../models/GameModel";
import {CountdownTimer} from "../../models/CountdownTimer";

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
    public isLevelFinished: boolean = false;

    constructor(public navCtrl: NavController) {

        // game definitions.
        /** LEVEL 1 **/
        this.gameList.push(new GameModel(1, 1, 2000, (game: GameModel) => {
            this.gameInitialization(game);
        }, (game: GameModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 1 FINISHED");
                this.onLevelFinish();
            }
        }));
        /** LEVEL 2 **/
        this.gameList.push(new GameModel(2, 4, 3000, (game: GameModel) => {
            this.gameInitialization(game);
        }, (game: GameModel, boxClicked: BoxModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 2 DONE");
                this.onLevelFinish();
            }
        }));
        /** LEVEL 3 **/
        this.gameList.push(new GameModel(3, 9, 5000, (game: GameModel) => {
            this.gameInitialization(game);
        }, (game: GameModel, boxClicked: BoxModel) => {
            if (game.allBoxesAreHit()) {
                console.warn("LEVEL 3 DONE");
                // this.onLevelFinish();
            }
        }));
    }

    ngOnInit() {
        this.gameWrapper = window.document.getElementById("game-wrapper");
        this.gameElement = window.document.querySelectorAll(".game").item(0);

        // hide the game layout
        this.gameWrapper.classList.add("invisible");

        setTimeout(() => {
            this.setLayoutPosition();

            // simulate starting the game
            setTimeout(() => {
                this.startGame();
            }, 3000);
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
        // reset countdown timer
        this.lastFrame = null;
        this.timer.progress = this.gameList[this.getLevelForArray()].countDownTime;
        // run the game's init method
        this.gameList[this.getLevelForArray()].startTheGame();

        // run animation frame with countdown timers
        this.rafId = window.requestAnimationFrame((now) => this.animateTimer(now));

        // How to add TIME (add to starting countdown)
        /*setTimeout(() => {
             this.countDownStart += 1000;
             console.error(this.countDownStart);
         }, 3500);*/
    }

    public boxWasHit(box: BoxModel) {
        // console.log("was hit", boxModel);
        this.gameList[this.getLevelForArray()].handleBoxClick(box);
    }

    /**
     * Get true level number for array.
     * @return number -> Array index.
     */
    public getLevelForArray() : number {
        return this.level - 1;
    }

    /**
     * Each game frame
     * @param now
     */
    private animateTimer(now: number) {

        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        let progress: number = now - this.lastFrame;

        this.rafId = window.requestAnimationFrame((now) => this.animateTimer(now));
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
            console.debug("GAME FINISHED!");
            // totally hide progress bar was still visible sometimes
            this.timer.resetToZero();
            window.cancelAnimationFrame(this.rafId);
        }
    }

    private gameInitialization(game: GameModel) {
        this.timer = new CountdownTimer(game.countDownTime);
    }

    private onLevelFinish() {
        // this.gameList[this.getLevelForArray()].levelFinishedCallback();
        this.isLevelFinished = true;
        setTimeout(() => {
            // hide popup
            this.isLevelFinished = false;
            // new level
            this.level++;
            // run new level
            this.startGame();
            // if we cancel the animation frame we can not start it again.. wtf?
            // window.cancelAnimationFrame(this.rafId);

        }, 2000);
    }
}
