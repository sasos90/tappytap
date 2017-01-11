import {Component, Input} from '@angular/core';

@Component({
    selector: 'box',
    template: `<div class="box" [ngStyle]="{'background': color}" (click)="tap()" [ngClass]="{hit: hit}"></div>`
})
export class BoxComponent {

    @Input("color") color: string = "";
    @Input("target") target: string = "";
    public hit: boolean = false;
    private missed: boolean = false;
    text: string;

    constructor() {
        console.log('Hello Box Component');
        this.text = 'Hello World';
    }

    ngOnInit() {

    }

    public tap() {
        console.debug(this.color);
        if (this.color === this.target) {
            console.debug("HIT!");
            // HIT SUCCESSED
            this.hit = true;
        } else if (this.color !== this.target) {
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
