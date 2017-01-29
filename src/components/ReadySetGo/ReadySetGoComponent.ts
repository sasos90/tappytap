import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'ready-set-go',
    template: `<div class="ready-set-go-wrapper">{{ text }}</div>`
})
export class ReadySetGoComponent {

    @Input() targetBox: BoxModel;
    @Output() countdownFinished = new EventEmitter();

    public text: string;

    constructor() {}

    ngOnInit() {
        this.text = "Ready!";
        setTimeout(() => {
            this.text = "Set!";
            setTimeout(() => {
                this.text = "GO!";
                setTimeout(() => {
                    this.countdownFinished.emit();
                }, 300);
            }, 1000);
        }, 1000);
    }
}
