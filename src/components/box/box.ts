import { Component } from '@angular/core';

@Component({
    selector: 'box',
    template: `<div class="box"></div>`
})
export class BoxComponent {

    text: string;

    constructor() {
        console.log('Hello Box Component');
        this.text = 'Hello World';
    }

}
