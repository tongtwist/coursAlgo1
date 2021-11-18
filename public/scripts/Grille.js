export class Grille {
    constructor(opts) {
        this._canvas = opts.canvas;
        this._ctx = opts.canvas.getContext("2d");
        this._data = opts.data;
        this._nbColonnes = opts.data[0].length;
        this._nbLignes = opts.data.length;
        this.blockStyles = opts.blockStyles;
        this.couleurFond = opts.couleurFond;
        this.couleurGrille = opts.couleurGrille;
        this._blockHeight = Math.round(this._canvas.height / this.data.length);
        this._blockWidth = Math.round(this._canvas.width / this.data[0].length);
        this._canvas.addEventListener("mouseup", (evt) => this._coordonneesSourisDansGrille(evt));
        this.rayons = Array(opts.nbRayons);
        this.intersections = Array(opts.nbRayons);
        for (let i = 0; i < opts.nbRayons; i++) {
            this.rayons[i] = { x1: 0, y1: 0, x2: 0, y2: 0 };
            this.intersections[i] = { x: 0, y: 0, colBlock: 0, ligBlock: 0, dist: 0 };
        }
        this.angleRayons = opts.angleRayons;
        this._vue = opts.vue;
    }
    get data() { return this._data; }
    set data(value) {
        this._data = value;
        this._nbColonnes = value[0].length;
        this._nbLignes = value.length;
        this._blockHeight = Math.round(this._canvas.height / value.length);
        this._blockWidth = Math.round(this._canvas.width / value.length);
    }
    get nbColonnes() { return this._nbColonnes; }
    set nbColonnes(_value) { }
    get nbLignes() { return this._nbLignes; }
    set nbLignes(_value) { }
    get blockHeight() { return this._blockHeight; }
    set blockHeight(_value) { }
    get blockWidth() { return this._blockWidth; }
    set blockWidth(_value) { }
    _lanceRayonH(x, y, centerAngle, a, nIntersection) {
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
            ry = Math.floor(y / this._blockHeight) * this._blockHeight - 0.0001;
            rx = (y - ry) * atan + x;
            yo = -this._blockHeight;
            xo = -yo * atan;
        }
        if (a < Math.PI) {
            ry = Math.floor(y / this._blockHeight) * this._blockHeight + this._blockHeight;
            rx = (y - ry) * atan + x;
            yo = this._blockHeight;
            xo = -yo * atan;
        }
        while (my >= 0 && my < this._data.length && !hit) {
            mx = Math.floor(rx / this._blockWidth);
            my = Math.floor(ry / this._blockHeight);
            hit = my >= 0 && my < this._data.length && mx >= 0 && mx < this._data[0].length && this._data[my][mx] > 0;
            if (!hit) {
                rx += xo;
                ry += yo;
            }
            //console.log(mx, my, hit)
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
            rx = Math.floor(x / this._blockWidth) * this._blockWidth - 0.0001;
            ry = (x - rx) * ntan + y;
            xo = -this._blockWidth;
            yo = -xo * ntan;
        }
        if (a < pi2 || a > pi3) {
            rx = Math.floor(x / this._blockWidth) * this._blockWidth + this._blockWidth;
            ry = (x - rx) * ntan + y;
            xo = this._blockWidth;
            yo = -xo * ntan;
        }
        while (my >= 0 && my < this._data.length && !hit) {
            mx = Math.floor(rx / this._blockWidth);
            my = Math.floor(ry / this._blockHeight);
            hit = my >= 0 && my < this._data.length && mx >= 0 && mx < this._data[0].length && this._data[my][mx] > 0;
            if (!hit) {
                rx += xo;
                ry += yo;
            }
            //console.log(mx, my, hit)
        }
        const vDist = Math.sqrt((rx - x) * (rx - x) + (ry - y) * (ry - y));
        if (vDist < hDist) {
            this.intersections[nIntersection].x = rx;
            this.intersections[nIntersection].y = ry;
            this.intersections[nIntersection].colBlock = mx;
            this.intersections[nIntersection].ligBlock = my;
            this.intersections[nIntersection].dist = vDist;
        }
        else {
            this.intersections[nIntersection].x = hrx;
            this.intersections[nIntersection].y = hry;
            this.intersections[nIntersection].colBlock = hmx;
            this.intersections[nIntersection].ligBlock = hmy;
            this.intersections[nIntersection].dist = hDist;
        }
        let ca = centerAngle - a;
        if (ca < 0)
            ca += Math.PI * 2;
        if (ca > Math.PI * 2)
            ca -= Math.PI * 2;
        this.intersections[nIntersection].dist *= Math.cos(ca);
    }
    lanceRayons(x, y, angle) {
        const angleStep = this.angleRayons / this.intersections.length;
        let a = (angle - (this.angleRayons / 2) + Math.PI * 2) % (Math.PI * 2);
        for (let i = 0; i < this.intersections.length; i++) {
            this._lanceRayonH(x, y, angle, a, i);
            this.rayons[i].x1 = x;
            this.rayons[i].y1 = y;
            this.rayons[i].x2 = this.intersections[i].x;
            this.rayons[i].y2 = this.intersections[i].y;
            this._vue.distances[i] = this.intersections[i].dist;
            this._vue.hitWhat[i]
                = this._data[this.intersections[i].ligBlock][this.intersections[i].colBlock];
            a = (a + angleStep + Math.PI * 2) % (Math.PI * 2);
        }
        //console.log(this._vue.distances)
    }
    dessineGrille() {
        this._ctx.fillStyle = this.couleurFond;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.strokeStyle = this.couleurGrille;
        this._ctx.beginPath();
        for (let i = 1; i < this.data.length; i++) {
            const y = i * this.blockHeight;
            this._ctx.moveTo(0, y);
            this._ctx.lineTo(this._canvas.width, y);
        }
        for (let i = 1; i < this.data[0].length; i++) {
            const x = i * this._blockWidth;
            this._ctx.moveTo(x, 0);
            this._ctx.lineTo(x, this._canvas.height);
        }
        this._ctx.closePath();
        this._ctx.stroke();
    }
    dessineBlocks() {
        let top = 1;
        const heightBlock = this._blockHeight - 2;
        const widthBlock = this._blockWidth - 2;
        this._data.forEach((blocks) => {
            let left = 1;
            blocks.forEach((block) => {
                if (block in this.blockStyles) {
                    this._ctx.fillStyle = this.blockStyles[block];
                    this._ctx.fillRect(left, top, widthBlock, heightBlock);
                }
                left += this._blockWidth;
            });
            top += this._blockHeight;
        });
    }
    dessineRayons() {
        this._ctx.strokeStyle = "#0F0";
        this._ctx.beginPath();
        for (let i = 0; i < this.rayons.length; i++) {
            const r = this.rayons[i];
            this._ctx.moveTo(r.x1, r.y1);
            this._ctx.lineTo(r.x2, r.y2);
        }
        this._ctx.closePath();
        this._ctx.stroke();
    }
    dessine() {
        this.dessineGrille();
        this.dessineBlocks();
        this.dessineRayons();
    }
    _coordonneesSourisDansGrille(evt) {
        const x = evt.offsetX;
        const y = evt.offsetY;
        if (evt.button > 0) {
            const i = Math.floor(x / this._blockWidth);
            const j = Math.floor(y / this._blockHeight);
            this._switchBlock(i, j);
        }
    }
    _switchBlock(i, j) {
        const value = this._data[j][i];
        const newValue = value === 1
            ? 0
            : value + 1;
        this._data[j][i] = newValue;
    }
}
//# sourceMappingURL=Grille.js.map