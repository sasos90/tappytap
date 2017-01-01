import {Component, Input} from '@angular/core';

@Component({
    selector: 'box',
    template: `<div class="box" [ngStyle]="{'background': color}"></div>`
})
export class BoxComponent {

    @Input("color") color: string = "";
    text: string;

    constructor() {
        console.log('Hello Box Component');
        this.text = 'Hello World';
    }

    ngOnInit() {

    }
}
