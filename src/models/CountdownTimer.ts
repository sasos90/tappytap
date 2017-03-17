/**
 * Created by saso on 1/21/17.
 */
export class CountdownTimer {

    public percentage: number = 0;
    private _progress: number = 0;
    private _startingPoint: number = 0;

    constructor(
        private _start: number
    ) {
        this.startingPoint = this.start;
    }

    get start(): number {
        return this._start;
    }

    set start(value: number) {
        this._start = value;
    }

    get startingPoint(): number {
        return this._startingPoint;
    }

    set startingPoint(value: number) {
        this._startingPoint = value;
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        // set progress
        /*this._progress = this.calculateProgress(value);
        // set percentage
        this.percentage = this.calculatePercentage();*/
    }

    public resetTimer() {
        this.percentage = 100;
        this.progress = this.start;
        this.start = this.startingPoint;
    }

    public resetToZero() {
        this.progress = this.start;
    }

    private calculateProgress(progress: number) : number {
        return (Math.round(progress) - this.start) * -1;
    }

    private calculatePercentage() : number {
        return this.progress * 100 / this.start;
    }

    public addTime(miliseconds: number) {
        this.start += miliseconds;
    }
}
