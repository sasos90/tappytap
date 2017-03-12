import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {BoxModel} from "../../models/BoxModel";
import {GameModel} from "../../models/GameModel";
import {CountdownTimer} from "../../models/CountdownTimer";
import {CountdownAnimation} from "../../models/CountdownAnimation";
import {ScoreModel} from "../../models/ScoreModel";

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

    public gameModel: GameModel;
    private gameInitImplementations: Array<any> = [
        (game: GameModel) => {
            this.gameSpecificInit(game);
        }
    ];
    private boxClickImplementations: Array<any> = [
        (game: GameModel) => {
            if (game.allBoxesAreHit()) {
                // set another target
                let untouchedBox: BoxModel = game.boxList.findUntouchedBox();
                if (untouchedBox) {
                    game.targetBox = untouchedBox;
                } else {
                    // everything was hit
                    this.onLevelFinish();
                }
            }
        }
    ];

    constructor(public navCtrl: NavController) {}

    ngOnInit() {
        this.generateGameModel();
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
        // Stop the countdown timer
        this.frameAnimation.cancelAnimation();
        // Timer progress is the remaining miliseconds - which is the score to add eventually
        let lastScore: number = this.timer.progress;
        console.warn("Result: " + lastScore);
        this.score.last = lastScore;
        // Open the component with scores
        this.finalResult = true;
    }

    /**
     * Prepare everything to run next level and start counting down (ready set go)
     */
    private startNextLevel() {

        // new level (increase)
        this.level++;
        // Handle view
        // Hide level complete
        this.finalResult = false;
        // Set game in progress flag to hide progress bar and boxes
        this.gameInProgress = false;
        // Start counting down READY SET GO for next level
        this.readySetGo = true;
        // generate new level game
        this.generateGameModel();
    }

    public replayGame() {
        console.warn("Replay the game - implementation missing");
    }

    private gameFinished() {
        // Method for showing the final score result of the game
        console.error("baaah.. game lost -> just temporary until it's implemented");
    }

    private getGameInitImplementation(level: number) : () => void {
        // TODO: Needs logic for that.
        return this.gameInitImplementations[0];
    }

    private getBoxClickImplementation(level: number) : () => void {
        // TODO: Needs logic for that.
        return this.boxClickImplementations[0];
    }

    private generateGameModel() {
        this.gameModel = new GameModel(
            this.level,
            GameModel.generateDimensionForGame(this.level),
            GameModel.generateCountDownTimeForGame(this.level),
            this.getGameInitImplementation(this.level),
            this.getBoxClickImplementation(this.level)
        );
    }

    public getLevelClassSuffix() : number|string {
        if (this.level < 6) {
            return this.level;
        }
        return "max";
    }
}
