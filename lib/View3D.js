export class View3D {
    constructor(cfg) {
        this._canvas = cfg.canvas;
        this._ctx = cfg.canvas.getContext("2d", { alpha: false });
        this._midHeight = Math.round(this._canvas.height / 2) | 0;
        this._rays = cfg.rays;
        this._nbColonnes = cfg.canvas.width;
        this.distances = Array(this._nbColonnes);
        this.hitWhat = Array(this._nbColonnes);
        this.couleurPlafond = cfg.couleurPlafond;
        this.couleurSol = cfg.couleurSol;
        this._blockStyles = cfg.blockStyles;
    }
    dessineSol() {
        const top = (this._midHeight + 1) | 0;
        this._ctx.fillStyle = this.couleurSol;
        this._ctx.fillRect(0, top, this._canvas.width, this._canvas.height - top);
        this._ctx.fill();
    }
    dessinePlafond() {
        this._ctx.fillStyle = this.couleurPlafond;
        this._ctx.fillRect(0, 0, this._canvas.width, this._midHeight);
        this._ctx.fill();
    }
    dessineMurs() {
        let lastCouleur = "";
        let left = 0;
        const largeurColonne = Math.round(this._canvas.width / this._rays.data.length) | 0;
        const txHeight = (50 * this._canvas.height) | 0;
        for (const ray of this._rays.data) {
            const block = ray.blockType;
            const couleur = ray.vhit
                ? this._blockStyles[block]
                : "#882211";
            if (couleur !== lastCouleur) {
                if (lastCouleur !== "") {
                    this._ctx.fill();
                }
                lastCouleur = couleur;
                this._ctx.fillStyle = couleur;
            }
            const hauteurLigne = Math.min(this._canvas.height, Math.round(txHeight / ray.dist) | 0) | 0;
            const offset = Math.round((this._canvas.height - hauteurLigne) / 2) | 0;
            this._ctx.fillRect(left, offset, largeurColonne, hauteurLigne);
            left += largeurColonne;
        }
        if (lastCouleur !== "") {
            this._ctx.fill();
        }
    }
    dessine() {
        this.dessineSol();
        this.dessinePlafond();
        this.dessineMurs();
    }
}
//# sourceMappingURL=View3D.js.map