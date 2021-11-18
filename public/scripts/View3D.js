export class View3D {
    constructor(cfg) {
        this._canvas = cfg.canvas;
        this._ctx = cfg.canvas.getContext("2d");
        this._nbColonnes = cfg.canvas.width;
        this.distances = Array(this._nbColonnes);
        this.hitWhat = Array(this._nbColonnes);
        this.couleurPlafond = cfg.couleurPlafond;
        this.couleurSol = cfg.couleurSol;
        this._blockStyles = cfg.blockStyles;
    }
    dessineSol() {
        const h2 = Math.round(this._canvas.height / 2);
        this._ctx.fillStyle = this.couleurSol;
        this._ctx.fillRect(0, h2, this._canvas.width, h2);
        this._ctx.fill();
    }
    dessinePlafond() {
        this._ctx.fillStyle = this.couleurPlafond;
        this._ctx.fillRect(0, 0, this._canvas.width, Math.round(this._canvas.height / 2));
        this._ctx.fill();
    }
    dessineMurs() {
        let lastCouleur = "";
        for (let i = 0; i < this.distances.length; i++) {
            const block = this.hitWhat[i];
            const couleur = this._blockStyles[block];
            if (couleur !== lastCouleur) {
                if (lastCouleur !== "") {
                    this._ctx.closePath();
                    this._ctx.stroke();
                }
                lastCouleur = couleur;
                this._ctx.strokeStyle = couleur;
                this._ctx.globalAlpha = 1.0;
                this._ctx.beginPath();
            }
            const dist = this.distances[i];
            const hauteurLigne = Math.min(this._canvas.height, 50 * this._canvas.height / dist);
            const offset = (this._canvas.height - hauteurLigne) / 2;
            this._ctx.moveTo(i, offset);
            this._ctx.lineTo(i, offset + hauteurLigne);
        }
        if (lastCouleur !== "") {
            this._ctx.closePath();
            this._ctx.stroke();
        }
    }
    dessine() {
        this.dessineSol();
        this.dessinePlafond();
        this.dessineMurs();
    }
}
//# sourceMappingURL=View3D.js.map