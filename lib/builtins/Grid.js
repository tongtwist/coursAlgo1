export class Grid {
    constructor(opts) {
        this._canvas = opts.canvas;
        this._ctx = opts.canvas.getContext("2d", { alpha: false });
        this._data = opts.data;
        this._columnsNumber = opts.data[0].length;
        this._linesNumber = opts.data.length;
        this.blockStyles = opts.blockStyles;
        this.bgColor = opts.bgColor;
        this.color = opts.color;
        this._blockHeight = Math.round(this._canvas.height / this.data.length);
        this._blockWidth = Math.round(this._canvas.width / this.data[0].length);
        this._canvas.addEventListener("mouseup", (evt) => this._coordonneesSourisDansGrille(evt));
        this.segments = Array(opts.rays.raysNumber);
        this._rays = opts.rays;
        for (let i = 0; i < opts.rays.raysNumber; i++) {
            this.segments[i] = { x1: 0, y1: 0, x2: 0, y2: 0 };
        }
    }
    get data() { return this._data; }
    set data(value) {
        this._data = value;
        this._columnsNumber = value[0].length;
        this._linesNumber = value.length;
        this._blockHeight = Math.round(this._canvas.height / value.length);
        this._blockWidth = Math.round(this._canvas.width / value.length);
    }
    get columnsNumber() { return this._columnsNumber; }
    set columnsNumber(_value) { }
    get linesNumber() { return this._linesNumber; }
    set linesNumber(_value) { }
    get blockHeight() { return this._blockHeight; }
    set blockHeight(_value) { }
    get blockWidth() { return this._blockWidth; }
    set blockWidth(_value) { }
    drawGrid() {
        this._ctx.fillStyle = this.bgColor;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.strokeStyle = this.color;
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
    drawBlocks() {
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
    drawSegments() {
        for (const r of this._rays.data) {
            this._ctx.strokeStyle = `#00${(255 - Math.round(r.dist * 255 / 500)).toString(16)}00`;
            this._ctx.beginPath();
            this._ctx.moveTo(r.orig[0], r.orig[1]);
            this._ctx.lineTo(r.x, r.y);
            this._ctx.closePath();
            this._ctx.stroke();
        }
    }
    draw() {
        this.drawGrid();
        this.drawBlocks();
        this.drawSegments();
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
export default Grid;
//# sourceMappingURL=Grid.js.map