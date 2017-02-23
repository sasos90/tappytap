import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'level-complete',
    template: `
        <div class="level-complete-wrapper">{{ 'LEVEL COMPLETED' }}</div>
        <div class="overlay-background"></div>`
})
export class LevelCompleteComponent {

    constructor() {}
}
