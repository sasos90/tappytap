/**
 * Created by saso on 3/8/17.
 */
export class ScoreModel {

    private _last: number = 0;
    private _total: number = 0;

    constructor() {}

    get last(): number {
        return this._last;
    }

    set last(value: number) {
        this._last = value;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }
}
