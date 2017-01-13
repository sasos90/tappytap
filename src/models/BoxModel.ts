/**
 * Created by saso on 1/12/17.
 */
export class BoxModel {

    constructor(
        private _color: string,
        private _isHit: boolean = false
    ) {}

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get isHit(): boolean {
        return this._isHit;
    }

    set isHit(value: boolean) {
        this._isHit = value;
    }

    public doesMatch(box: BoxModel) : boolean {
        return this.color === box.color;
    }
}
