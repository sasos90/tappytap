import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'level-starting',
    template: `<div>Level starting</div>`
})
export class LevelStartingComponent {

    @Input() targetBox: BoxModel;
    @Output() countdownFinish = new EventEmitter();

    constructor() {}
}
