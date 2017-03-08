import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'level-complete',
    template: `
        <div class="level-complete-wrapper material-shadow" *ngIf="shown">
            <div class="message">{{ 'LEVEL COMPLETED' }}</div>
            <div class="navigation-wrapper">
                <button class="btn-next-level" ion-button (click)="nextLevel()">Next level</button>
            </div>
        </div>
        <div class="overlay-background"></div>`
})
export class LevelCompleteComponent {

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
