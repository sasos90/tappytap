import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";

@Component({
    selector: 'box',
    template: `
        <div class="box-wrapper" [ngClass]="{hit: hit}" *ngIf="!hideBox">
            <div class="box front" [ngStyle]="{'background': box.color}" (click)="tap(box)"></div>
            <!-- Remove back figure if you don't want the whole flip but just 50% -->
            <div class="box back" [ngStyle]="{'background': target.color}" (click)="tap(target)"></div>
        </div>`
})
export class BoxComponent {

    @Input() box: BoxModel;
    @Input() target: BoxModel;
    @Output() onHit = new EventEmitter();
    public hit: boolean = false;
    public missed: boolean = false;
    public hideBox: boolean = false;

    constructor() {}

    public tap(tappedBox: BoxModel) {

        console.log(tappedBox);
        if (this.target.doesMatch(tappedBox)) {
            console.debug("HIT!");
            // HIT SUCCESSED
            this.onSuccessHit();
        } else {
            console.debug("1. miss");
            this.box = this.target;
        }
    }

    private onSuccessHit() {
        // call output
        this.onHit.emit(this.box);

        // handle view
        this.hit = true;
        setTimeout(() => {
            this.hideBox = true;
        }, 500);
    }
}
