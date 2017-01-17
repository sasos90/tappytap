import {BoxModel} from "./BoxModel";
import {BoxList} from "./BoxList";
/**
 * Created by saso on 1/17/17.
 */
export class GameModel {

    constructor(
        private level: number,
        private numberOfBoxes: number,
        private targetBox: BoxModel,
        private boxList: Array<BoxModel>,
        private countDownTime: number,
        private boxClickImplementation: (box: BoxModel) => any
    ) {
        this.boxList = new BoxList();
    }

    public handleBoxClick(box: BoxModel) {
        this.boxClickImplementation(box);
    }
}
