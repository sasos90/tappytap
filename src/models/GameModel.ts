import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
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

    private generateTarget() {
        this.targetBox = new BoxModel("#2196F3");
    }

    private generateBoxes() {
        this.boxList = new BoxList();
        // TODO Generate proper number of boxes
        this.boxList.push(new BoxModel("#f44336"));
        this.boxList.push(new BoxModel("#607D8B"));
        this.boxList.push(new BoxModel("#9E9E9E"));
        this.boxList.push(new BoxModel("#2196F3"));
        // this.boxList.push(new BoxModel("#4CAF50"));
        // this.boxList.push(new BoxModel("#2196F3"));
        // this.boxList.push(new BoxModel("#FFEB3B"));
        // this.boxList.push(new BoxModel("#FF9800"));
        // this.boxList.push(new BoxModel("#795548"));
        // this.boxList.push(new BoxModel("#3F51B5"));
        // this.boxList.push(new BoxModel("#2196F3"));
    }
}
