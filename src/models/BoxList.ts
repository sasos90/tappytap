import {BoxModel} from "./BoxModel";
/**
 * Created by saso on 1/14/17.
 */
export class BoxList extends Array<BoxModel> {

    constructor() {
        super();
    }

    public allHit(boxTarget: BoxModel) : boolean {
        return this.findIndex(box => box.doesMatch(boxTarget) && !box.isHit) === -1;
    }
}
