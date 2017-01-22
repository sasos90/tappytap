import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import {Game} from "../pages/game/game";
import {BoxComponent} from "../components/box/box";
import {LevelStartingComponent} from "../components/LevelStarting/LevelStartingComponent";

@NgModule({
    declarations: [
        MyApp,
        Game,
        BoxComponent,
        Page2,
        LevelStartingComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Game,
        Page2,
        LevelStartingComponent
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
