/**
 * Created by saso on 3/8/17.
 */
export class ScoreModel {

    private _total: number = 0;
    private _streak: number = 0;
    private _combo: number = 0;
    private _comboLog: number = 1;
    private _levelReached: number = 0;

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
        // log the highest streak
        if (this.streak > this.combo) {
            this.combo = this.streak;
        }
        this.comboLog = this.streak > 0 ? parseFloat((Math.log(this.streak + 1) + 1).toFixed(2)) : 1;
    }

    get combo(): number {
        return this._combo;
    }

    set combo(value: number) {
        this._combo = value;
    }

    get comboLog(): number {
        return this._comboLog;
    }

    set comboLog(value: number) {
        this._comboLog = value;
    }

    get levelReached(): number {
        return this._levelReached;
    }

    set levelReached(value: number) {
        this._levelReached = value;
    }

    public add(points: number) {
        this.total += points;
    }

    public reset() {
        this.total = 0;
        this.streak = 0;
        this.combo = 0;
        this.comboLog = 1;
    }
}
