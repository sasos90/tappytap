import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
import {ColorHelper} from "../helpers/ColorHelper";
import {ArrayHelper} from "../helpers/ArrayHelper";
import {Dimension} from "./Dimension";
/**
 * Created by saso on 1/17/17.
 */
export class GameModel {

    private _targetBox: BoxModel;
    private _boxList: BoxList;

    constructor(
        private level: number,
        private numberOfBoxes: Dimension,
        private _countDownTime: number,
        private boxClickImplementation: (game: GameModel, boxClicked: BoxModel) => any
    ) {
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

    get countDownTime(): number {
        return this._countDownTime;
    }

    /**
     * @deprecated NOT NEEDED ANYMORE
     */
    public startTheGame() {
        // this.onGameInit(this);
    }

    public handleBoxClick(boxClicked: BoxModel) {
        this.boxClickImplementation(this, boxClicked);
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

    static generateCountDownTimeForGame(level: number) {
        // TODO: Needs logic for that.
        return level * 1000;
    }

    public static generateNewGame(level: number, boxClickImplementations: Array<(game: GameModel) => any>) : GameModel {
        // TODO: needs logic and implementations for box click
        let boxClickImplementation: (game: GameModel) => any = boxClickImplementations[0];
        return new GameModel(
            level,
            GameModel.generateDimensionForGame(level),
            GameModel.generateCountDownTimeForGame(level),
            boxClickImplementation
        );
    }
}
