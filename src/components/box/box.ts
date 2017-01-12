import {Component, Input} from '@angular/core';

@Component({
    selector: 'box',
    template: `
        <div class="box-wrapper">
            <div class="box front" [ngStyle]="{'background': color}" (click)="tap(color)" [ngClass]="{hit: hit}"></div>
        </div>`
})
export class BoxComponent {

    @Input("color") color: string = "";
    @Input("target") target: string = "";
    public hit: boolean = false;
    private missed: boolean = false;
    text: string;

    constructor() {}

    public tap(hitColor: string) {

        console.debug(hitColor);
        if (hitColor === this.target) {

            console.debug("HIT!");
            // HIT SUCCESSED
            this.hit = true;
        } else if (hitColor !== this.target) {

            if (!this.missed) {
                console.debug("1. miss");
                this.missed = true;
            } else {
                console.debug("2. HIT!");
            }
        } else if (this.hit === false) {

            console.debug("2. HIT!");
            // for sure the second hit, which is right!
        }
    }
}
