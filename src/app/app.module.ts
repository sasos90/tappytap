import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import {Game} from "../pages/game/game";
import {BoxComponent} from "../components/box/box";
import {ReadySetGoComponent} from "../components/ReadySetGo/ReadySetGoComponent";
import {FinalResultComponent} from "../components/FinalResult/FinalResultComponent";
import {BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";

export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        "tap": {
            time: 1000,
            threshold: 999
        } // override default settings
    }
}

@NgModule({
    declarations: [
        MyApp,
        Game,
        BoxComponent,
        Page2,
        ReadySetGoComponent,
        FinalResultComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Game,
        Page2,
        ReadySetGoComponent,
        FinalResultComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}
    ]
})
export class AppModule {}
