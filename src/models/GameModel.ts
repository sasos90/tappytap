import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
import {ColorHelper} from "../helpers/ColorHelper";
/**
 * Created by saso on 1/17/17.
 */
export class GameModel {

    private _targetBox: BoxModel;
    private _boxList: BoxList;

    constructor(
        private level: number,
        private numberOfBoxes: number,
        private _countDownTime: number,
        private onGameInit: (game: GameModel) => any,
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

    public startTheGame() {
        this.onGameInit(this);
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

    private generateBoxes() {
        this.boxList = new BoxList();
        // populate number of target colors
        for (let i = 0; i < this.level; i++) {
            this.boxList.push(new BoxModel(this.targetBox.color));
        }
        // add missing colors
        while (this.boxList.length < this.numberOfBoxes) {
            let randomColor = ColorHelper.getRandomColor();
            if (randomColor !== this.targetBox.color) {
                this.boxList.push(new BoxModel(randomColor));
            }
        }
    }
}
