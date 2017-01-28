/**
 * Created by saso on 1/21/17.
 *
 * requestFrameAnimation JS feature.
 * rafId: Reference ID for requestAnimationFrame javascript function, so we can cancel it later
 */
export class CountdownAnimation {

    private _requestAnimationFrameId: any;
    private _lastFrameTimestamp: number = null;

    constructor() {}

    get rafId(): any {
        return this._requestAnimationFrameId;
    }

    set rafId(value: any) {
        this._requestAnimationFrameId = value;
    }

    get lastFrame(): number {
        return this._lastFrameTimestamp;
    }

    set lastFrame(value: number) {
        this._lastFrameTimestamp = value;
    }

    public cancelAnimation() {
        window.cancelAnimationFrame(this.rafId);
    }
}
