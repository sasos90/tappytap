/**
 * Created by saso on 3/8/17.
 */
export class ScoreModel {

    private _last: number = 0;
    private _total: number = 0;
    private _streak: number = 0;

    constructor() {}

    get last(): number {
        return this._last;
    }

    set last(value: number) {
        this._last = value;
        this.total += this.last;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }

    get streak(): number {
        return this._streak;
    }

    set streak(value: number) {
        this._streak = value;
    }

    public scoreReset() {
        this.last = 0;
        this.total = 0;
        this.streak = 0;
    }
}
