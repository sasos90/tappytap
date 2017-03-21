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
                    <span class="value" [ngClass]="{highlighted: comboBonusHighlight}">{{ scoreModel.combo }}</span>
                </div>
            </div>
            <div class="total-score">
                <div class="wrapper">
                    <span class="label">{{ 'Total score:' }}</span>
                    <span class="value">{{ scoreModel.total }}</span>
                </div>
            </div>
            <div class="action-wrapper">
                <button class="btn-replay" ion-button [disabled]="scoreSummarizing" (click)="replay()">Replay</button>
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

    // highlighting
    private scoreSummarizing: boolean = true;
    private comboBonusHighlight: boolean = false;

    constructor() {
        setTimeout(() => {
            this.scoreStored = this.scoreModel.total;
            // show the result after 1 second
            this.shown = true;
            setTimeout(() => {
                this.comboBonusHighlight = true;
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

        let comboPart: number = Math.round(this.scoreModel.combo * durationPercentage / 100);
        // so it shows only the values above (above score total)
        this.scoreModel.total = this.scoreStored + comboPart;
        // this.scoreModel.combo = this.totalCombo - comboPart;
        if (progress > duration) {
            window.cancelAnimationFrame(this.rafId);
            this.comboBonusHighlight = false;
            this.enableActionButtons();
        }
    }

    public enableActionButtons() {
        this.scoreSummarizing = false;
    }

    public replay() {
        this.replayEvent.emit();
    }
}
