import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ScoreModel} from "../../models/ScoreModel";

@Component({
    selector: 'final-result',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="headline">{{ 'GAME COMPLETED!' }}</div>
            <div class="result-wrapper">
                <div class="combo result">
                    <span class="label">{{ 'Max combo:' }}</span>
                    <span class="value">{{ scoreModel.combo }}</span>
                </div>
                <div class="combo-bonus result">
                    <span class="label">{{ 'Combo bonus:' }}</span>
                    <span class="value">X{{ comboMultiplier }}</span>
                </div>
            </div>
            <div class="total-score">
                <div class="wrapper">
                    <span class="label">{{ 'Total score:' }}</span>
                    <span class="value">{{ scoreStored }}</span>
                </div>
            </div>
            <div class="navigation-wrapper">
                <button class="btn-replay" ion-button (click)="replay()">Replay</button>
            </div>
        </div>
        <div class="overlay-background"></div>`
})
export class FinalResultComponent {

    @Input() scoreModel: ScoreModel;
    @Output("replayClick") replayEvent = new EventEmitter();
    public shown: boolean = false;

    private rafId: number;
    private lastFrame: number;
    private scoreStored: number = 0;
    private comboStored: number = 0;
    private comboMultiplier: number = 0;
    private comboMultiplierStored: number = 0;

    constructor() {
        setTimeout(() => {
            this.scoreStored = this.scoreModel.total;
            this.comboStored = this.scoreModel.combo;
            if (this.scoreModel.total > 0) {
                this.comboMultiplier = parseFloat((Math.log10(this.comboStored) + 1).toFixed(2));
                this.comboMultiplierStored = this.comboMultiplier;
            }
            // show the result after 1 second
            this.shown = true;
            setTimeout(() => {
                this.rafId = window.requestAnimationFrame((now) => this.updateComboFrame(now));
            }, 1000);
        }, 500);
    }

    private updateComboFrame(now) {
        if (!this.lastFrame) {
            this.lastFrame = now;
        }
        let progress: number = now - this.lastFrame;
        this.rafId = window.requestAnimationFrame((now) => this.updateComboFrame(now));
        this.comboFrame(progress);
    }

    private comboFrame(progress: number) {
        let duration: number = 1500;
        let durationPercentage: number = progress * 100 / duration;
        if (durationPercentage > 100) {
            // so it does not exceede 100%
            durationPercentage = 100;
        }

        let comboMultiplierProgress: number = this.comboMultiplierStored * durationPercentage / 100;
        if (comboMultiplierProgress >= 1) {
            // so it shows only the values above (above score total)
            this.comboMultiplier = parseFloat((this.comboMultiplierStored - comboMultiplierProgress).toFixed(2));
            this.scoreStored = Math.round(this.scoreModel.total * comboMultiplierProgress);
        }
        // this.scoreModel.combo = this.totalCombo - comboPart;
        if (progress > duration) {
            window.cancelAnimationFrame(this.rafId);
        }
    }

    public replay() {
        this.replayEvent.emit();
    }
}
