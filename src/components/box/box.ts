import {Component, Input} from '@angular/core';

@Component({
    selector: 'box',
    template: `
        <div class="box-wrapper" [ngClass]="{hit: hit}">
            <div class="box front" [ngStyle]="{'background': color}" (click)="tap(color)"></div>
            <!-- Remove back figure if you don't want the whole flip but just 50% -->
            <div class="box back" [ngStyle]="{'background': target}" (click)="tap(target)"></div>
        </div>`
})
export class BoxComponent {

    @Input("color") color: string = "";
    @Input("target") target: string = "";
    public hit: boolean = false;
    private missed: boolean = false;

    constructor() {}

    public tap(hitColor: string) {

        console.debug(hitColor);
        if (hitColor === this.target) {

            console.debug("HIT!");
            // HIT SUCCESSED
            this.onSuccessHit();
        } else if (hitColor !== this.target) {

            if (!this.missed) {
                console.debug("1. miss");
                this.missed = true;
                this.color = this.target;
            } else {
                console.debug("2. HIT!");
                this.onSuccessHit();
            }
        } else if (this.hit === false) {

            console.debug("2. HIT!");
            // for sure the second hit, which is right!
        }
    }

    private onSuccessHit() {
        this.hit = true;
    }
}
