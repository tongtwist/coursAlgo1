export class View3D {
    constructor(cfg) {
        this._canvas = cfg.canvas;
        this._ctx = cfg.canvas.getContext("2d", { alpha: false });
        this._midHeight = Math.round(this._canvas.height / 2) | 0;
        this._rays = cfg.rays;
        this._columnsNumber = cfg.canvas.width;
        this.distances = Array(this._columnsNumber);
        this.hitWhat = Array(this._columnsNumber);
        this.ceilColor = cfg.ceilColor;
        this.groundColor = cfg.groundColor;
        this._blockStyles = cfg.blockStyles;
    }
    drawGround() {
        const top = (this._midHeight + 1) | 0;
        this._ctx.fillStyle = this.groundColor;
        this._ctx.fillRect(0, top, this._canvas.width, this._canvas.height - top);
        this._ctx.fill();
    }
    drawCeil() {
        this._ctx.fillStyle = this.ceilColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._midHeight);
        this._ctx.fill();
    }
    drawWalls() {
        let lastcolor = "";
        let left = 0;
        const columnWidth = Math.round(this._canvas.width / this._rays.data.length) | 0;
        const txHeight = (50 * this._canvas.height) | 0;
        for (const ray of this._rays.data) {
            const block = ray.blockType;
            const color = ray.vhit
                ? this._blockStyles[block]
                : "#882211";
            if (color !== lastcolor) {
                if (lastcolor !== "") {
                    this._ctx.fill();
                }
                lastcolor = color;
                this._ctx.fillStyle = color;
            }
            const lineHeight = Math.min(this._canvas.height, Math.round(txHeight / ray.dist) | 0) | 0;
            const offset = Math.round((this._canvas.height - lineHeight) / 2) | 0;
            this._ctx.fillRect(left, offset, columnWidth, lineHeight);
            left += columnWidth;
        }
        if (lastcolor !== "") {
            this._ctx.fill();
        }
    }
    draw() {
        this.drawGround();
        this.drawCeil();
        this.drawWalls();
    }
}
export default View3D;
//# sourceMappingURL=View3D.js.map