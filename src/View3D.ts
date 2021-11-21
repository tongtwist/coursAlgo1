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
		this._rays = cfg.rays
		this._nbColonnes = cfg.canvas.width
		this.distances = Array(this._nbColonnes)
		this.hitWhat = Array(this._nbColonnes)
		this.couleurPlafond = cfg.couleurPlafond
		this.couleurSol = cfg.couleurSol
		this._blockStyles = cfg.blockStyles
	}

	dessineSol () {
		const h2: number = Math.round(this._canvas.height / 2)
		this._ctx.fillStyle = this.couleurSol
		this._ctx.fillRect(0, h2, this._canvas.width, h2)
		this._ctx.fill()
	}

	dessinePlafond () {
		this._ctx.fillStyle = this.couleurPlafond
		this._ctx.fillRect(0, 0, this._canvas.width, Math.round(this._canvas.height / 2))
		this._ctx.fill()
	}

	dessineMurs () {
		let lastCouleur: string = ""
		let i = 0
		for (const ray of this._rays.data) {
			const block: number = ray.blockType
			const couleur: string = this._blockStyles[block]
			if (couleur !== lastCouleur) {
				if (lastCouleur !== "") {
					this._ctx.fill()
				}
				lastCouleur = couleur
				this._ctx.fillStyle = couleur
			}
			const dist: number = ray.dist
			const hauteurLigne: number = Math.min(this._canvas.height, 50 * this._canvas.height / dist)
			const offset: number = (this._canvas.height - hauteurLigne) / 2
			this._ctx.fillRect(i, offset, 1, hauteurLigne)
			i++
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
			this._ctx.fill()
		}
	}

	dessine () {
		this.dessineSol()
		this.dessinePlafond()
		this.dessineMurs()
	}
}