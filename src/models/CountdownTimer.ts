/**
 * Created by saso on 1/21/17.
 */
export class CountdownTimer {

    public percentage: number;
    private _progress: number;

    constructor(
        private _start: number
    ) {}

    get start(): number {
        return this._start;
    }

    set start(value: number) {
        this._start = value;
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        // set progress
        this._progress = this.calculateProgress(value);
        // set percentage
        this.percentage = this.calculatePercentage();
    }

    public resetTimer() {
        this.percentage = 100;
        this.progress = this.start;
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
}
