export class Rays {
    constructor(cfg) {
        this._angleWidth = this._fixAngleWidth(cfg.angleWidth);
        this._raysNumber = this._fixRaysNumber(cfg.raysNumber);
        this._rays = this._computeEmptyRays();
    }
    get angleWidth() { return this._angleWidth; }
    set angleWidth(newValue) {
        this._angleWidth = this._fixAngleWidth(newValue);
        this._rays = this._computeEmptyRays();
    }
    get raysNumber() { return this._raysNumber; }
    set raysNumber(newValue) {
        this._raysNumber = this._fixRaysNumber(newValue);
        this._rays = this._computeEmptyRays();
    }
    get data() { return this._rays; }
    set data(_v) { }
    _fixAngleWidth(valueToFix) {
        return Math.max(Math.PI / 8, Math.abs(valueToFix));
    }
    _fixRaysNumber(valueToFix) {
        return Math.max(1, Math.round(valueToFix));
    }
    _computeEmptyRays() {
        const ret = Array(this._raysNumber);
        let da = -this._angleWidth / 2;
        const angleStep = this._angleWidth / this._raysNumber;
        for (let i = 0; i < this._raysNumber; i++) {
            ret[i] = {
                da,
                orig: [0, 0],
                x: 0,
                y: 0,
                dist: 0,
                blockType: 0,
                colBlock: 0,
                ligBlock: 0
            };
            da = (da + angleStep + Math.PI * 2) % (Math.PI * 2);
        }
        return ret;
    }
}
//# sourceMappingURL=Rays.js.map