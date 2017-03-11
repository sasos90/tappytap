import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ScoreModel} from "../../models/ScoreModel";

@Component({
    selector: 'final-result',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="headline">{{ 'GAME COMPLETED!' }}</div>
            <div class="result-wrapper">
                <div class="last-score">{{ 'Score:' }} {{ scoreModel.last }}</div>
                <div class="total-score">{{ 'Total score:' }} {{ scoreModel.total }}</div>
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

    constructor() {
        setTimeout(() => {
            // show the result after 1 second
            this.shown = true;
        }, 1000);
    }

    public replay() {
        this.replayEvent.emit();
    }
}
