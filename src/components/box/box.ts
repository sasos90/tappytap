import {Component, Input} from '@angular/core';

@Component({
    selector: 'box',
    template: `<div class="box" [ngStyle]="{'background': color}" (click)="hit()" [ngClass]="{missed: missed}"></div>`
})
export class BoxComponent {

    @Input("color") color: string = "";
    @Input("target") target: string = "";
    public missed: boolean = false;
    text: string;

    constructor() {
        console.log('Hello Box Component');
        this.text = 'Hello World';
    }

    ngOnInit() {

    }

    public hit() {
        console.debug(this.color);
        if (this.color === this.target) {
            console.debug("HIT!");
            // HIT SUCCESSED
        } else if (this.missed === true) {
            console.debug("2. HIT!");
            // for sure the second hit, which is right!
        } else if (this.color !== this.target) {
            console.debug("1. miss");
            // miss the target
            this.missed = true;
        }
    }
}
