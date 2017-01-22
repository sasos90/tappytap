import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'level-starting',
    template: `<div class="countdown-wrapper">Level starting</div>`
})
export class LevelStartingComponent {

    @Input() targetBox: BoxModel;
    @Output() countdownFinished = new EventEmitter();

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.countdownFinished.emit();
        }, 2000);
    }
}
