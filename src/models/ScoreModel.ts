/**
 * Created by saso on 3/8/17.
 */
export class ScoreModel {

    private _total: number = 0;
    private _streak: number = 0;

    constructor() {}

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

    public add(points: number) {
        this.total += points;
    }

    public reset() {
        this.total = 0;
        this.streak = 0;
    }
}
