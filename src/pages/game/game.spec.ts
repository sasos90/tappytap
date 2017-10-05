import {ComponentFixture, TestBed} from "@angular/core/testing";
import {GameModel} from "../../models/GameModel";
import {Dimension} from "../../models/Dimension";
import {Game} from "./game";
import {BoxList} from "../../models/BoxList";
import {BoxModel} from "../../models/BoxModel";
import {MyApp} from "../../app/app.component";
import {BoxComponent} from "../../components/box/box";
import {Page2} from "../page2/page2";
import {ReadySetGoComponent} from "../../components/ReadySetGo/ReadySetGoComponent";
import {FinalResultComponent} from "../../components/FinalResult/FinalResultComponent";
import {MainMenu} from "../mainmenu/mainmenu";
import {Instructions} from "../instructions/instructions";
import {HighScore} from "../highscore/highscore";
import {Settings} from "../settings/settings";
import {MoreGames} from "../moregames/moregames";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {NativeAudio} from "@ionic-native/native-audio";
import {Firebase} from "@ionic-native/firebase";
import {AdMob} from "@ionic-native/admob";
import {Device} from "@ionic-native/device";
import {Backend} from "../../services/Backend";
import {ErrorHandler} from "@angular/core";
import {IonicErrorHandler, IonicModule, NavController} from "ionic-angular";
import {MyHammerConfig} from "../../app/app.module";
import {BrowserModule, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

fdescribe('Testing the game engine', () => {

    let gameModel: GameModel;
    let gameComponent: Game;
    let fixture: ComponentFixture<Game>;

    beforeEach(() => {
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
                NavController,
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
        fixture = TestBed.createComponent(Game);
        gameComponent = fixture.componentInstance;

        gameModel = new GameModel(3, Dimension.DIM_2X2, gameComponent);
        // create target
        gameModel.targetBox = new BoxModel('red');
        // create boxes
        gameModel.boxList = new BoxList();
        gameModel.boxList.push(new BoxModel('red', true));
        gameModel.boxList.push(new BoxModel('red', true));
        gameModel.boxList.push(new BoxModel('red', false));
        gameModel.boxList.push(new BoxModel('red', true));
    });

    it('should check if all boxes are hit', () => {
        expect(gameModel.allBoxesAreHit()).toBe(false);
        makeAllBoxesHit();
        expect(gameModel.allBoxesAreHit()).toBe(true);
    });

    it('should generate 9 boxes for 3rd level, with exactly 3 targets', () => {
        gameModel = new GameModel(3, Dimension.DIM_3X3, gameComponent);
        const targetColor = gameModel.targetBox.color;
        expect(gameModel.boxList.length).toBe(9);
        const targetBoxes = gameModel.boxList.filter(b => b.color === targetColor);
        expect(targetBoxes.length).toBe(3);
    });

    let makeAllBoxesHit = () => {
        gameModel.boxList.forEach(b => {
            b.isHit = true;
        });
    };
});
