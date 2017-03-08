import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ScoreModel} from "../../models/ScoreModel";

@Component({
    selector: 'level-complete',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="result-wrapper">
                <div class="message">{{ 'LEVEL COMPLETED' }}</div>
            </div>
            <div class="navigation-wrapper">
                <button class="btn-next-level" ion-button (click)="nextLevel()">Next level</button>
            </div>
        </div>
        <div class="overlay-background"></div>`
})
export class LevelCompleteComponent {

    @Input() scoreModel: ScoreModel;
    @Output("nextLevel") nextLevelEvent = new EventEmitter();
    public shown: boolean = false;

    constructor() {
        setTimeout(() => {
            // show the result after 1 second
            this.shown = true;
        }, 1000);
    }

    public nextLevel() {
        this.nextLevelEvent.emit();
    }
}
