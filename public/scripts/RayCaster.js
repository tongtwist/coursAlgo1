export class RayCaster {
    constructor(cfg) {
        this._grille = cfg.grille;
        this._rays = cfg.rays;
    }
    get rays() { return this._rays; }
    set rays(_v) { }
    castAll(x, y, centerAngle) {
        let i = 0;
        for (const ray of this._rays.data) {
            this.cast(x, y, centerAngle, centerAngle + ray.da, ray);
            /*this._vue.distances[i] = this.rays[i].dist
            this._vue.hitWhat[i]
                = this._data[this.rays[i].ligBlock][this.rays[i].colBlock]
            a = (a + angleStep + Math.PI * 2) % (Math.PI * 2)*/
            i++;
        }
        //console.log(this._vue.distances)
    }
    cast(x, y, centerAngle, a, ray) {
        let hit = false;
        let mx = 0;
        let my = 0;
        let rx = x;
        let ry = y;
        let xo = 0;
        let yo = 0;
        const tan = Math.tan(a);
        const atan = -1 / tan;
        if (a > Math.PI) {
            ry = Math.floor(y / this._grille.blockHeight) * this._grille.blockHeight - 0.0001;
            rx = (y - ry) * atan + x;
            yo = -this._grille.blockHeight;
            xo = -yo * atan;
        }
        if (a < Math.PI) {
            ry = Math.floor(y / this._grille.blockHeight) * this._grille.blockHeight + this._grille.blockHeight;
            rx = (y - ry) * atan + x;
            yo = this._grille.blockHeight;
            xo = -yo * atan;
        }
        while (my >= 0 && my < this._grille.nbLignes && !hit) {
            mx = Math.floor(rx / this._grille.blockWidth);
            my = Math.floor(ry / this._grille.blockHeight);
            hit = my >= 0 && my < this._grille.nbLignes && mx >= 0 && mx < this._grille.nbColonnes && this._grille.data[my][mx] > 0;
            if (!hit) {
                rx += xo;
                ry += yo;
            }
        }
        const hhit = hit;
        const hrx = rx;
        const hry = ry;
        const hmx = mx;
        const hmy = my;
        const hDist = Math.sqrt((hrx - x) * (hrx - x) + (hry - y) * (hry - y));
        hit = false;
        mx = 0;
        my = 0;
        rx = x;
        ry = y;
        xo = 0;
        yo = 0;
        const ntan = -tan;
        const pi2 = Math.PI / 2;
        const pi3 = 3 * pi2;
        if (a > pi2 && a < pi3) {
            rx = Math.floor(x / this._grille.blockWidth) * this._grille.blockWidth - 0.0001;
            ry = (x - rx) * ntan + y;
            xo = -this._grille.blockWidth;
            yo = -xo * ntan;
        }
        if (a < pi2 || a > pi3) {
            rx = Math.floor(x / this._grille.blockWidth) * this._grille.blockWidth + this._grille.blockWidth;
            ry = (x - rx) * ntan + y;
            xo = this._grille.blockWidth;
            yo = -xo * ntan;
        }
        while (my >= 0 && my < this._grille.nbLignes && !hit) {
            mx = Math.floor(rx / this._grille.blockWidth);
            my = Math.floor(ry / this._grille.blockHeight);
            hit = my >= 0 && my < this._grille.nbLignes && mx >= 0 && mx < this._grille.nbColonnes && this._grille.data[my][mx] > 0;
            if (!hit) {
                rx += xo;
                ry += yo;
            }
        }
        const vDist = Math.sqrt((rx - x) * (rx - x) + (ry - y) * (ry - y));
        if (vDist < hDist) {
            ray.x = rx;
            ray.y = ry;
            ray.colBlock = mx;
            ray.ligBlock = my;
            ray.dist = vDist;
        }
        else {
            ray.x = hrx;
            ray.y = hry;
            ray.colBlock = hmx;
            ray.ligBlock = hmy;
            ray.dist = hDist;
        }
        let ca = centerAngle - a;
        if (ca < 0)
            ca += Math.PI * 2;
        if (ca > Math.PI * 2)
            ca -= Math.PI * 2;
        //console.log(ca)
        ray.dist *= Math.cos(ca);
        ray.orig[0] = x;
        ray.orig[1] = y;
    }
}
//# sourceMappingURL=RayCaster.js.map