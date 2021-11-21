export class Point {
    constructor(opts) {
        this._ctx = opts.canvas.getContext("2d", { alpha: false });
        this._x = opts.x;
        this._y = opts.y;
        this._angle = opts.angle;
        this.couleur = opts.couleur;
        this.deltaPivotGauche = 0;
        this.deltaPivotDroite = 0;
        this.deltaAvance = 0;
        this.deltaRecule = 0;
    }
    get x() { return this._x; }
    set x(_value) { }
    get y() { return this._y; }
    set y(_value) { }
    get angle() { return this._angle; }
    set angle(_value) { }
    calculeDeplacement(deltaT) {
        const normeV = Point._vTranslation * deltaT * 0.001 * (this.deltaAvance - this.deltaRecule);
        const x = Math.cos(this._angle) * normeV;
        const y = Math.sin(this._angle) * normeV;
        return [x, y];
    }
    deplace(deltaT) {
        const deltaAngle = (this.deltaPivotGauche - this.deltaPivotDroite) * Point._vPivot * deltaT * -0.001;
        this._angle = (this._angle + deltaAngle + Math.PI * 2) % (Math.PI * 2);
        const v = this.calculeDeplacement(deltaT);
        this._x += v[0];
        this._y += v[1];
    }
    dessine() {
        this._ctx.strokeStyle = this.couleur;
        this._ctx.beginPath();
        this._ctx.moveTo(this._x, this._y);
        this._ctx.arc(this._x, this._y, 10, this._angle + Math.PI * .25, this._angle + Math.PI * 1.75, false);
        this._ctx.closePath();
        this._ctx.stroke();
    }
}
Point._vPivot = 5;
Point._vTranslation = 100;
//# sourceMappingURL=Point.js.map