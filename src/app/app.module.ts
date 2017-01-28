import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import {Game} from "../pages/game/game";
import {BoxComponent} from "../components/box/box";
import {ReadySetGoComponent} from "../components/ReadySetGo/ReadySetGoComponent";
import {LevelCompleteComponent} from "../components/LevelComplete/LevelCompleteComponent";

@NgModule({
    declarations: [
        MyApp,
        Game,
        BoxComponent,
        Page2,
        ReadySetGoComponent,
        LevelCompleteComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Game,
        Page2,
        ReadySetGoComponent,
        LevelCompleteComponent
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
