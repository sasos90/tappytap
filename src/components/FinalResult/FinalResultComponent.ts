import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ScoreModel} from "../../models/ScoreModel";
import {NavController} from "ionic-angular";
import {MainMenu} from "../../pages/mainmenu/mainmenu";
import {Firebase} from "@ionic-native/firebase";
import {FBKey} from "../../models/FBKey";

@Component({
    selector: 'final-result',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="headline">{{ 'GAME OVER' }}</div>
            <div class="result-wrapper">
                <div class="level result">
                    <div class="label">{{ 'LEVEL REACHED' }}</div>
                    <div class="value-wrapper"><span class="value-left">{{ scoreModel.levelReached }}</span></div>
                </div>
                <div class="combo result">
                    <div class="label">{{ 'MAX COMBO' }}</div>
                    <div class="value-wrapper"><span class="value-left">{{ scoreModel.maxStreak }}</span><span class="value">(× {{ comboMultiplier }})</span></div>
                </div>
            </div>
            <div class="total-score">
                <div class="new-highscore" *ngIf="newHighscore">
                    <span class="text">NEW HIGHSCORE!</span>
                </div>
                <div class="score">
                    <span class="label">{{ 'SCORE' }}</span>
                    <span class="value">{{ scoreModel.total }}</span>
                </div>
            </div>
            <div class="action-wrapper">
                <button class="tappy-button btn-replay" ion-button (click)="replay()">Replay</button>
                <button class="tappy-button btn-main-menu" ion-button (click)="mainMenu()">Main menu</button>
            </div>
        </div>
        <div class="overlay-background"></div>`
})
export class FinalResultComponent {

    @Input() scoreModel: ScoreModel;
    @Output("replayClick") replayEvent = new EventEmitter();
    public shown: boolean = false;

    // scores
    private rafId: number;
    private lastFrame: number;
    private scoreStored: number = 0;
    private levelBonus: number = 0;
    private comboStored: number = 0;
    private comboMultiplier: number = 0;
    private comboMultiplierStored: number = 0;

    // highlighting
    private scoreSummarizing: boolean = true;
    private newHighscore: boolean = false;
    private comboBonusPointsHighlight: boolean = false;
    private comboBonusRowShow: boolean = false;
    private levelBonusPointsHighlight: boolean = false;
    private levelBonusRowShow: boolean = false;

    constructor(
        protected nav: NavController,
        protected firebase: Firebase
    ) {}

    ngOnInit() {
        // set and store score values
        this.scoreStored = this.scoreModel.total;
        this.levelBonus = this.sumLevelBonus();
        this.comboStored = this.scoreModel.maxStreak;
        if (this.scoreModel.total > 0) {
            this.comboMultiplier = parseFloat((Math.log(this.comboStored) + 1).toFixed(2));
            this.comboMultiplierStored = this.comboMultiplier;
        }

        // start timeout to show the final score wrapper
        setTimeout(() => {
            if (this.scoreModel.saveScoreIfBest()) {
                // TOP SCORE
                this.newHighscore = true;
                this.firebase.logEvent(FBKey.FINAL_RESULT.BEST_SCORE, {
                    score: this.scoreModel.total
                });
            }
            // show the result after 1 second
            this.shown = true;
            /*setTimeout(() => {
                // turn off every animation
                /!*this.levelBonusRowShow = true;
                this.levelBonusPointsHighlight = true;
                this.rafId = window.requestAnimationFrame((now) => this.updateLevelFrame(now));*!/
            }, 1000);*/
        }, 500);
    }

    /*private updateComboFrame(now) {
        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        let progress: number = now - this.lastFrame;
        this.rafId = window.requestAnimationFrame((now) => this.updateComboFrame(now));
        this.comboFrame(progress);
    }

    private comboFrame(progress: number) {
        let duration: number = 1000;
        let durationPercentage: number = progress * 100 / duration;
        if (durationPercentage > 100) {
            // so it does not exceede 100%
            durationPercentage = 100;
        }

        let comboMultiplierProgress: number = this.comboMultiplierStored * durationPercentage / 100;
        if (comboMultiplierProgress >= 1) {
            // so it shows only the values above (above score total)
            // this.comboMultiplier = parseFloat((this.comboMultiplierStored - comboMultiplierProgress).toFixed(2));
            this.scoreModel.total = Math.round(this.scoreStored * comboMultiplierProgress);
        }
        // let comboPart: number = Math.round(this.scoreModel.maxStreak * durationPercentage / 100);
        // so it shows only the values above (above score total)
        // this.scoreModel.total = this.scoreStored + comboPart;
        // this.scoreModel.maxStreak = this.totalCombo - comboPart;
        if (progress > duration) {
            window.cancelAnimationFrame(this.rafId);

            this.comboBonusPointsHighlight = false;
            this.enableActionButtons();
        }
    }*/

    public enableActionButtons() {
        this.scoreSummarizing = false;
    }

    public replay() {
        // store to firebase
        this.firebase.logEvent("FINAL_RESULT_replay_the_game", {});
        this.replayEvent.emit();
    }

    public mainMenu() {
        // store to firebase
        this.firebase.logEvent("FINAL_RESULT_to_mainmenu", {});
        this.nav.setRoot(MainMenu);
    }

    /*private updateLevelFrame(now: number) {
        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        let progress: number = now - this.lastFrame;
        this.rafId = window.requestAnimationFrame((now) => this.updateLevelFrame(now));
        this.levelFrame(progress);
    }

    private levelFrame(progress: number) {
        let duration: number = 1000;
        let durationPercentage: number = progress * 100 / duration;
        if (durationPercentage > 100) {
            // so it does not exceede 100%
            durationPercentage = 100;
        }

        let levelPart: number = Math.round(this.levelBonus * durationPercentage / 100);
        // so it shows only the values above (above score total)
        this.scoreModel.total = this.scoreStored + levelPart;
        // this.scoreModel.maxStreak = this.totalCombo - comboPart;
        if (progress > duration) {
            window.cancelAnimationFrame(this.rafId);

            setTimeout(() => {
                // start level bonus highlighting and summing up
                this.scoreStored = this.scoreModel.total;
                this.levelBonusPointsHighlight = false;
                this.comboBonusRowShow = true;
                this.comboBonusPointsHighlight = true;
                this.lastFrame = null;
                this.rafId = window.requestAnimationFrame((now) => this.updateComboFrame(now));
            }, 500);
        }
    }*/

    private sumLevelBonus() : number {
        let levelReached: number = this.scoreModel.levelReached;
        let bonus: number = 0;
        while (levelReached > 0) {
            bonus += levelReached;
            levelReached--;
        }
        return bonus;
    }
}