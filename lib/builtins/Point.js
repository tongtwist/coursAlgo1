import { Rays } from "./Rays.js";
export class Point {
    constructor(opts) {
        this._ctx = opts.canvas.getContext("2d", { alpha: false });
        this._x = opts.x;
        this._y = opts.y;
        this._angle = opts.angle;
        this.color = opts.color;
        this.deltaLeftRotation = 0;
        this.deltaRightRotation = 0;
        this.deltaGoForward = 0;
        this.deltaGoBackward = 0;
        this._rays = opts.rays;
    }
    get x() { return this._x; }
    set x(_value) { }
    get y() { return this._y; }
    set y(_value) { }
    get angle() { return this._angle; }
    set angle(_value) { }
    computeMove(deltaT) {
        const normeV = Point._vTranslation * deltaT * 0.001
            * (this.deltaGoForward - this.deltaGoBackward);
        const x = Math.cos(this._angle) * normeV;
        const y = Math.sin(this._angle) * normeV;
        return [x, y];
    }
    move(deltaT) {
        const rotation = this.deltaLeftRotation - this.deltaRightRotation;
        if (rotation !== 0) {
            const deltaAngle = rotation * Point._vRotation * deltaT * -0.001;
            this._angle = Rays.fixAngle(this._angle + deltaAngle);
            this._rays.centerAngle = this._angle;
        }
        const v = this.computeMove(deltaT);
        this._x += v[0];
        this._y += v[1];
    }
    draw() {
        this._ctx.strokeStyle = this.color;
        this._ctx.beginPath();
        this._ctx.moveTo(this._x, this._y);
        this._ctx.arc(this._x, this._y, 10, this._angle + Math.PI * .25, this._angle + Math.PI * 1.75, false);
        this._ctx.closePath();
        this._ctx.stroke();
    }
}
Point._vRotation = 5;
Point._vTranslation = 100;
export default Point;
//# sourceMappingURL=Point.js.map