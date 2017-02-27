import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'level-complete',
    template: `
        <div class="level-complete-wrapper">
            <div class="message">{{ 'LEVEL COMPLETED' }}</div>
            <button ion-button (click)="nextLevel()">Next level</button>
        </div>
        <div class="overlay-background"></div>`
})
export class LevelCompleteComponent {

    @Output("nextLevel") nextLevelEvent = new EventEmitter();

    constructor() {}

    public nextLevel() {
        this.nextLevelEvent.emit();
    }
}
