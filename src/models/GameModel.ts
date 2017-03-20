import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
import {ColorHelper} from "../helpers/ColorHelper";
import {ArrayHelper} from "../helpers/ArrayHelper";
import {Dimension} from "./Dimension";
import {Game} from "../pages/game/game";
import {ScoreModel} from "./ScoreModel";
import {CountdownTimer} from "./CountdownTimer";
import {NativeAudio} from "ionic-native";
import {HeaderStatus} from "./HeaderStatus";
import {HeaderStatusAnimation} from "./HeaderStatusAnimation";
/**
 * Created by saso on 1/17/17.
 */
export class GameModel {

    private _targetBox: BoxModel;
    private _boxList: BoxList;
    /**
     * Definition of awarded streaks.
     */
    private static STREAK_AWARD = [5, 10, 20, 30, 50, 80, 100, 150, 200, 250, 300];
    /**
     * Game data
     */
    private score: ScoreModel;
    // private timer: CountdownTimer;
    private headerStatus: HeaderStatus;
    private boxClickImplementations: Array<(game: GameModel, boxHit: BoxModel) => void> = [
        (game: GameModel, box: BoxModel) => {
            if (box.isHit) {
                this.handleBoxHit(game, box);
                if (game.allBoxesAreHit()) {
                    NativeAudio.play("hit");
                    // set another target
                    let untouchedBox: BoxModel = game.boxList.findUntouchedBox();
                    if (untouchedBox) {
                        game.targetBox = untouchedBox;
                        this.gameInstance.exposeBoxes();
                    } else {
                        // everything was hit
                        this.sumScoreUp();
                        this.gameInstance.onLevelFinish();
                    }
                }
            } else {
                this.handleBoxMiss(box);
            }
        }
    ];

    constructor(
        private level: number,
        private numberOfBoxes: Dimension,
        private gameInstance: Game
    ) {
        this.initGameProperties();
        // setup game
        this.generateTarget();
        this.generateBoxes();
        this.headerStatus.text = "Level: " + this.level;
    }

    private sumScoreUp() {
        // Timer progress is the remaining miliseconds - which is the score to add eventually
        let points: number = Math.round(this.gameInstance.timer.progress / 100);
        console.debug(points + " points for LEVEL " + this.level);
        this.score.add(points);
    }

    get targetBox(): BoxModel {
        return this._targetBox;
    }

    set targetBox(value: BoxModel) {
        this._targetBox = value;
    }

    get boxList(): BoxList {
        return this._boxList;
    }

    set boxList(value: BoxList) {
        this._boxList = value;
    }

    public handleBoxClick(boxHit: BoxModel) {
        this.boxClickImplementations[0](this, boxHit);//this, boxClicked);
    }

    public allBoxesAreHit() : boolean {
        return this.boxList.allHit(this.targetBox);
    }

    private generateTarget() {
        this.targetBox = new BoxModel(ColorHelper.getRandomColor());
    }

    public generateBoxes(numberOfTargetColors?: number) {
        let nrTargetColors: number = numberOfTargetColors || this.level;
        if (nrTargetColors > 6) {
            nrTargetColors = 6;
        }
        this.boxList = new BoxList();
        // populate number of target colors
        for (let i = 0; i < nrTargetColors; i++) {
            this.boxList.push(new BoxModel(this.targetBox.color));
        }
        // add missing colors
        while (this.boxList.length < this.numberOfBoxes) {
            let randomColor = ColorHelper.getRandomColor();
            if (randomColor !== this.targetBox.color) {
                this.boxList.push(new BoxModel(randomColor));
            }
        }
        ArrayHelper.shuffleArray(this.boxList);
    }

    public static generateDimensionForGame(level: number) {
        if (level === 1 || level === 2) {
            return Dimension.DIM_2X2;
        } else if (level === 3) {
            return Dimension.DIM_3X3;
        } else if (level === 4) {
            return Dimension.DIM_4X4;
        } else if (level >= 5 && level < 30) {
            return Dimension.DIM_5X5;
        }
        return Dimension.DIM_6X6;
    }

    public static generateNewGame(level: number, gameInstance: Game) : GameModel {
        return new GameModel(
            level,
            GameModel.generateDimensionForGame(level),
            gameInstance
        );
    }

    private initGameProperties() {
        this.score = this.gameInstance.score;
        // this.timer = this.gameInstance.timer;
        this.headerStatus = this.gameInstance.headerStatus;
    }

    /**
     * Action when the box is hit.
     */
    private handleBoxHit(game: GameModel, box: BoxModel) {
        this.score.streak++;
        console.log("Streak: ", this.score.streak);

        this.levelSpecificBoxHit(game, box);
    }

    /**
     * Penalty when the box is missed.
     */
    private handleBoxMiss(box: BoxModel) {
        this.score.streak = 0;
        this.gameInstance.timer.addTime(-1000);
    }

    private levelSpecificBoxHit(game: GameModel, box: BoxModel) {
        this.generalBoxHit(game, box);
        if (game.allBoxesAreHit()) {
            this.gameInstance.timer.addTime(1000);
        }
    }

    private generalBoxHit(game: GameModel, box: BoxModel) {
        if (GameModel.STREAK_AWARD.indexOf(this.score.streak) !== -1) {
            this.headerStatus.text = "STREAK: " + this.score.streak;
            this.headerStatus.animation = HeaderStatusAnimation.FONT_EMBOSED;
            setTimeout(() => {
                this.headerStatus.clear();
            }, 1000);
        }
    }

    public static getCountDownTime(level: number) : number {
        if (level < 3) {
            return 5000;
        } else if (level >= 3 && level < 5) {
            return 7000;
        } else if (level >= 5 && level < 8) {
            return 8000;
        } else if (level >= 30) {
            let countDownTime: number = 10000;
            countDownTime -= (level * 10);
            return countDownTime;
        }
        return 10000;
    }
}
