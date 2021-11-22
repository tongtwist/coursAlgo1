import type { IRays } from "./Rays"


export interface IView3DConfig {
	readonly canvas: HTMLCanvasElement
	readonly couleurSol: string
	readonly couleurPlafond: string
	readonly blockStyles: { [ blockValue: number]: string }
	readonly rays: IRays
}

export interface IView3D {
	couleurSol: string
	couleurPlafond: string
	distances: Array<number>
	hitWhat: Array<number>
	dessineSol (): void
	dessinePlafond (): void
	dessineMurs (): void
	dessine (): void
}

export class View3D implements IView3D {
	private _canvas: HTMLCanvasElement
	private _ctx: CanvasRenderingContext2D
	private _midHeight: number
	private _rays: IRays
	private readonly _nbColonnes: number
	distances: Array<number>
	hitWhat: Array<number>
	couleurSol: string
	couleurPlafond: string
	private _blockStyles: { [k: number]: string }

	constructor (cfg: IView3DConfig) {
		this._canvas = cfg.canvas
		this._ctx = cfg.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
		this._midHeight = Math.round(this._canvas.height / 2) | 0
		this._rays = cfg.rays
		this._nbColonnes = cfg.canvas.width
		this.distances = Array(this._nbColonnes)
		this.hitWhat = Array(this._nbColonnes)
		this.couleurPlafond = cfg.couleurPlafond
		this.couleurSol = cfg.couleurSol
		this._blockStyles = cfg.blockStyles
	}

	dessineSol () {
		const top: number = (this._midHeight + 1) | 0
		this._ctx.fillStyle = this.couleurSol
		this._ctx.fillRect(0, top, this._canvas.width, this._canvas.height - top)
		this._ctx.fill()
	}

	dessinePlafond () {
		this._ctx.fillStyle = this.couleurPlafond
		this._ctx.fillRect(0, 0, this._canvas.width, this._midHeight)
		this._ctx.fill()
	}

	dessineMurs () {
		let lastCouleur: string = ""
		let left = 0
		const largeurColonne: number = Math.round(this._canvas.width / this._rays.data.length) | 0
		const txHeight: number = (50 * this._canvas.height) | 0
		for (const ray of this._rays.data) {
			const block: number = ray.blockType
			const couleur: string
				= ray.vhit
				? this._blockStyles[block]
				: "#882211"
			if (couleur !== lastCouleur) {
				if (lastCouleur !== "") {
					this._ctx.fill()
				}
				lastCouleur = couleur
				this._ctx.fillStyle = couleur
			}
			const hauteurLigne: number = Math.min(this._canvas.height, Math.round(txHeight / ray.dist) | 0) | 0
			const offset: number = Math.round((this._canvas.height - hauteurLigne) / 2) | 0
			this._ctx.fillRect(left, offset, largeurColonne, hauteurLigne)
			left += largeurColonne
		}
		if (lastCouleur !== "") {
			this._ctx.fill()
		}
	}

	dessine () {
		this.dessineSol()
		this.dessinePlafond()
		this.dessineMurs()
	}
}