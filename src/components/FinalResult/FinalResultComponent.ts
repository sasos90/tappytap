import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ScoreModel} from "../../models/ScoreModel";

@Component({
    selector: 'final-result',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="headline">{{ 'GAME COMPLETED!' }}</div>
            <div class="result-wrapper">
                <div class="total-score">{{ 'Total score:' }} {{ scoreModel.total }}</div>
                <div class="combo">{{ 'Combo:' }} {{ scoreModel.combo }}</div>
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
    private totalScore: number = 0;
    private totalCombo: number = 0;

    constructor() {
        setTimeout(() => {
            this.totalScore = this.scoreModel.total;
            this.totalCombo = this.scoreModel.combo;
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
        this.frame(progress);
    }

    private frame(progress: number) {
        let duration: number = 1500;
        let durationPercentage: number = progress * 100 / duration;
        if (durationPercentage > 100) {
            // so it does not exceede 100%
            durationPercentage = 100;
        }

        let comboPart: number = Math.round(this.totalCombo * durationPercentage / 100);
        console.log(comboPart);
        this.scoreModel.total = this.totalScore + comboPart;
        this.scoreModel.combo = this.totalCombo - comboPart;
        if (progress > duration) {
            window.cancelAnimationFrame(this.rafId);
        }
    }

    public replay() {
        this.replayEvent.emit();
    }
}
