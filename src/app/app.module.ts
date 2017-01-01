import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import {Game} from "../pages/game/game";

@NgModule({
    declarations: [
        MyApp,
        Game,
        Page2
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Game,
        Page2
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
