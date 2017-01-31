import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'ready-set-go',
    template: `
        <div class="ready-set-go-wrapper">
            <div class="relative-wrapper">
                <div class="step one" [ngClass]="{animation: readySetGo >= 0}">{{ 'Ready' }}</div>
                <div class="step two" [ngClass]="{animation: readySetGo >= 1}">{{ 'Set' }}</div>
                <div class="step-go" [ngClass]="{animation: readySetGo >= 2}">{{ 'GO!' }}</div>
            </div>
        </div>`
})
export class ReadySetGoComponent {

    @Input() targetBox: BoxModel;
    @Output() countdownFinished = new EventEmitter();

    public readySetGo: number = -1;

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            // initial timeout
            this.readySetGo++;
            setTimeout(() => {
                this.readySetGo++;
                // debugger;
                setTimeout(() => {
                    this.readySetGo++;
                    // debugger;
                    setTimeout(() => {
                        this.countdownFinished.emit();
                    }, 300);
                }, 1000);
            }, 1000);
        }, 500);
    }
}
