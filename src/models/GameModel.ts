import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
import {ColorHelper} from "../helpers/ColorHelper";
import {ArrayHelper} from "../helpers/ArrayHelper";
import {Dimension} from "./Dimension";
import {Game} from "../pages/game/game";
import {ScoreModel} from "./ScoreModel";
import {CountdownTimer} from "./CountdownTimer";
/**
 * Created by saso on 1/17/17.
 */
export class GameModel {

    private _targetBox: BoxModel;
    private _boxList: BoxList;
    /**
     * Game data
     */
    private score: ScoreModel;
    private timer: CountdownTimer;
    private boxClickImplementations: Array<(game: GameModel, boxHit: BoxModel) => void> = [
        (game: GameModel, box: BoxModel) => {
            if (box.isHit) {
                this.handleBoxHit(box);
                if (game.allBoxesAreHit()) {
                    // set another target
                    let untouchedBox: BoxModel = game.boxList.findUntouchedBox();
                    if (untouchedBox) {
                        game.targetBox = untouchedBox;
                    } else {
                        // everything was hit
                        this.gameInstance.onLevelFinish();
                    }
                }
            } else {
                this.handleBoxMiss(box);
                console.error("MISSED");
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
        // TODO: Needs logic for that.
        switch(level) {
            case 1:
                return Dimension.DIM_1X1;
            case 2:
                return Dimension.DIM_2X2;
            case 3:
                return Dimension.DIM_3X3;
            case 4:
                return Dimension.DIM_4X4;
            case 5:
                return Dimension.DIM_5X5;
            default:
                return Dimension.DIM_6X6;
        }
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
        this.timer = this.gameInstance.timer;
    }

    /**
     * Action when the box is hit.
     */
    private handleBoxHit(box: BoxModel) {
        this.score.streak++;
        console.log("Streak: ", this.score.streak);
    }

    /**
     * Penalty when the box is missed.
     */
    private handleBoxMiss(box: BoxModel) {
        this.score.streak = 0;
        this.score.total -= 1000;
        this.timer.addTime(-2000);
    }
}
