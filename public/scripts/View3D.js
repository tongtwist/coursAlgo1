export class View3D {
    constructor(cfg) {
        this._canvas = cfg.canvas;
        this._ctx = cfg.canvas.getContext("2d", { alpha: false });
        this._rays = cfg.rays;
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
        let i = 0;
        for (const ray of this._rays.data) {
            const block = ray.blockType;
            const couleur = this._blockStyles[block];
            if (couleur !== lastCouleur) {
                if (lastCouleur !== "") {
                    this._ctx.fill();
                }
                lastCouleur = couleur;
                this._ctx.fillStyle = couleur;
            }
            const dist = ray.dist;
            const hauteurLigne = Math.min(this._canvas.height, 50 * this._canvas.height / dist);
            const offset = (this._canvas.height - hauteurLigne) / 2;
            this._ctx.fillRect(i, offset, 1, hauteurLigne);
            i++;
        }
        /*for (let i = 0; i < this.distances.length; i++) {
            const block: number = this.hitWhat[i]
            const couleur: string = this._blockStyles[block]
            if (couleur !== lastCouleur) {
                if (lastCouleur !== "") {
                    this._ctx.fill()
                }
                lastCouleur = couleur
                this._ctx.fillStyle = couleur
            }
            const dist: number = this.distances[i]
            const hauteurLigne: number = Math.min(this._canvas.height, 50 * this._canvas.height / dist)
            const offset: number = (this._canvas.height - hauteurLigne) / 2
            this._ctx.fillRect(i, offset, 1, hauteurLigne)
        }*/
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