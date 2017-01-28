import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'ready-set-go',
    template: `<div class="ready-set-go-wrapper">Ready!</div>`
})
export class ReadySetGoComponent {

    @Input() targetBox: BoxModel;
    @Output() countdownFinished = new EventEmitter();

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.countdownFinished.emit();
        }, 2000);
    }
}
