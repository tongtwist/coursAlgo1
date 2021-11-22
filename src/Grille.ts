import { IRay, IRays} from "./Rays"


export interface IGrilleConfig {
	readonly canvas: HTMLCanvasElement
	readonly data: Array<Array<number>>
	readonly blockStyles: { [ blockValue: number]: string }
	readonly couleurFond: string
	readonly couleurGrille: string
	readonly rays: IRays
}

export interface IGrille {
	data: Array<Array<number>>
	readonly nbColonnes: number
	readonly nbLignes: number
	blockStyles: { [ blockValue: number]: string }
	couleurFond: string
	couleurGrille: string
	readonly blockHeight: number
	readonly blockWidth: number
	rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
	dessineGrille (): void
	dessineBlocks (): void
	dessineRayons (): void
	dessine (): void
}

export class Grille implements IGrille {
	private readonly _canvas: HTMLCanvasElement
	private readonly _ctx: CanvasRenderingContext2D
	private _data: Array<Array<number>>
	private _nbColonnes: number
	private _nbLignes: number
	blockStyles: { [ blockValue: number ]: string }
	couleurFond: string
	couleurGrille: string
	private _blockHeight: number
	private _blockWidth: number
	rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
	private _rays: IRays

	constructor (opts: IGrilleConfig) {
		this._canvas = opts.canvas
		this._ctx = opts.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
		this._data = opts.data
		this._nbColonnes = opts.data[0].length
		this._nbLignes = opts.data.length
		this.blockStyles = opts.blockStyles
		this.couleurFond = opts.couleurFond
		this.couleurGrille = opts.couleurGrille
		this._blockHeight = Math.round(this._canvas.height / this.data.length)
		this._blockWidth = Math.round(this._canvas.width / this.data[0].length)
		this._canvas.addEventListener("mouseup", (evt: MouseEvent) => this._coordonneesSourisDansGrille(evt))
		this.rayons = Array(opts.rays.raysNumber)
		this._rays = opts.rays
		for (let i = 0; i < opts.rays.raysNumber; i++) {
			this.rayons[i] = { x1: 0, y1: 0, x2: 0, y2: 0 }
		}
	}

	get data () { return this._data }
	set data (value: Array<Array<number>>) {
		this._data = value
		this._nbColonnes = value[0].length
		this._nbLignes = value.length
		this._blockHeight = Math.round(this._canvas.height / value.length)
		this._blockWidth = Math.round(this._canvas.width / value.length)
	}
	
	get nbColonnes () { return this._nbColonnes }
	set nbColonnes (_value: number) {}

	get nbLignes () { return this._nbLignes}
	set nbLignes (_value: number) {}
	
	get blockHeight () { return this._blockHeight }
	set blockHeight (_value: number) {}

	get blockWidth () { return this._blockWidth }
	set blockWidth (_value: number) {}

	dessineGrille () {
		this._ctx.fillStyle = this.couleurFond
		this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
		this._ctx.strokeStyle = this.couleurGrille
		this._ctx.beginPath()
		for (let i = 1; i < this.data.length; i++) {
			const y = i * this.blockHeight
			this._ctx.moveTo(0, y)
			this._ctx.lineTo(this._canvas.width, y)
		}
		for (let i = 1; i < this.data[0].length; i++) {
			const x = i * this._blockWidth
			this._ctx.moveTo(x, 0)
			this._ctx.lineTo(x, this._canvas.height)
		}
		this._ctx.closePath()
		this._ctx.stroke()
	}

	dessineBlocks () {
		let top = 1
		const heightBlock = this._blockHeight - 2
		const widthBlock = this._blockWidth - 2
		this._data.forEach ((blocks: Array<number>) => {
			let left = 1
			blocks.forEach ((block: number) => {
				if (block in this.blockStyles) {
					this._ctx.fillStyle = this.blockStyles[block]
					this._ctx.fillRect (left, top, widthBlock, heightBlock)
				}
				left += this._blockWidth
			})
			top += this._blockHeight
		})
	}

	dessineRayons() {
		for (const r of this._rays.data) {
			this._ctx.strokeStyle = `#00${(255-Math.round(r.dist * 255 / 500)).toString(16)}00`
			this._ctx.beginPath()
			this._ctx.moveTo(r.orig[0], r.orig[1])
			this._ctx.lineTo(r.x, r.y)
			this._ctx.closePath()
			this._ctx.stroke()
		}
	}

	dessine () {
		this.dessineGrille()
		this.dessineBlocks()
		this.dessineRayons()
	}

	private _coordonneesSourisDansGrille (
		evt: MouseEvent
	): void {
		const x: number = evt.offsetX
		const y: number = evt.offsetY
		if (evt.button > 0) {
			const i: number = Math.floor(x / this._blockWidth)
			const j: number = Math.floor(y / this._blockHeight)
			this._switchBlock(i, j)
		}
	}

	private _switchBlock (i: number, j: number): void {
		const value: number = this._data[j][i]
		const newValue: number
			= value === 1
			? 0
			: value + 1
		this._data[j][i] = newValue
	}
}