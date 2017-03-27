import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BoxModel} from "../../models/BoxModel";
import {NativeAudio} from "ionic-native";

@Component({
    selector: 'box',
    template: `
        <div class="box-wrapper" [ngClass]="{hit: hit}" *ngIf="!hideBox">
            <div class="box front" [ngStyle]="{'background': box.color}" (tap)="tap(box)" [ngClass]="{target: box.doesMatch(target) && exposed}"></div>
            <!-- Remove back figure if you don't want the whole flip but just 50% -->
            <div class="box back" [ngStyle]="{'background': box.color}" (tap)="tap(target)"></div>
        </div>`
})
export class BoxComponent {

    @Input() box: BoxModel;
    @Input() target: BoxModel;
    @Output() onBoxTap = new EventEmitter();
    public hit: boolean = false;
    @Input() exposed: boolean = false;
    public hideBox: boolean = false;

    constructor() {}

    ngOnInit() {}

    public tap(tappedBox: BoxModel) {
        if (this.target.doesMatch(tappedBox)) {
            // HIT SUCCESSED
            this.onSuccessHit();
        } else {
            NativeAudio.play("miss");
            this.onBoxTap.emit(this.box);
            this.box.color = this.target.color;
        }
    }

    private onSuccessHit() {
        // handle object data
        this.box.isHit = true;

        // call output
        this.onBoxTap.emit(this.box);

        // handle component view
        this.hit = true;
        setTimeout(() => {
            this.hideBox = true;
        }, 300);
    }
}
