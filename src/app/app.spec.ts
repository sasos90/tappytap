import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import {} from 'jasmine';
import {StatusBar} from '@ionic-native/status-bar';
import {MyHammerConfig} from "./app.module";
import {BrowserModule, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {ErrorHandler} from "@angular/core";
import {Device} from "@ionic-native/device";
import {AdMob} from "@ionic-native/admob";
import {Firebase} from "@ionic-native/firebase";
import {NativeAudio} from "@ionic-native/native-audio";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Backend} from "../services/Backend";
import {MoreGames} from "../pages/moregames/moregames";
import {HighScore} from "../pages/highscore/highscore";
import {Instructions} from "../pages/instructions/instructions";
import {MainMenu} from "../pages/mainmenu/mainmenu";
import {FinalResultComponent} from "../components/FinalResult/FinalResultComponent";
import {Game} from "../pages/game/game";
import {HttpModule} from "@angular/http";
import {BoxComponent} from "../components/box/box";
import {Page2} from "../pages/page2/page2";
import {ReadySetGoComponent} from "../components/ReadySetGo/ReadySetGoComponent";
import {Settings} from "../pages/settings/settings";

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

fdescribe('Component: Root Component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyApp,
                Game,
                BoxComponent,
                Page2,
                ReadySetGoComponent,
                FinalResultComponent,
                MainMenu,
                Instructions,
                HighScore,
                Settings,
                MoreGames
            ],
            providers: [
                StatusBar,
                SplashScreen,
                NativeAudio,
                Firebase,
                AdMob,
                Device,
                Backend,
                {provide: ErrorHandler, useClass: IonicErrorHandler},
                {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}
            ],
            imports: [
                IonicModule.forRoot(MyApp),
                BrowserModule,
                HttpModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
});
