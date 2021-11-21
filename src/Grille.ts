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
	lanceRayons (x: number, y: number, angle: number): void
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

	_lanceRayonH (
		x: number,
		y: number,
		centerAngle: number,
		a: number,
		nIntersection: number
	): void {
		let hit: boolean = false
		let mx: number = 0
		let my: number = 0
		let rx: number = x
		let ry: number = y
		let xo: number = 0
		let yo: number = 0
		const tan: number = Math.tan(a)
		const atan: number = -1 / tan
		if (a > Math.PI) {
			ry = Math.floor(y / this._blockHeight) * this._blockHeight - 0.0001
			rx = (y - ry) * atan + x
			yo = -this._blockHeight
			xo = -yo * atan
		}
		if (a < Math.PI) {
			ry = Math.floor(y / this._blockHeight) * this._blockHeight + this._blockHeight
			rx = (y - ry) * atan + x
			yo = this._blockHeight
			xo = -yo * atan
		}
		while (my >= 0 && my < this._data.length && !hit) {
			mx = Math.floor(rx / this._blockWidth)
			my = Math.floor(ry / this._blockHeight)
			hit = my >= 0 && my < this._data.length && mx >= 0 && mx < this._data[0].length && this._data[my][mx] > 0
			if (!hit) {
				rx += xo
				ry += yo
			}
		}
		const hhit: boolean = hit
		const hrx: number = rx
		const hry: number = ry
		const hmx: number = mx
		const hmy: number = my
		const hDist: number = Math.sqrt((hrx - x) * (hrx - x) + (hry - y) * (hry - y))
		hit = false
		mx = 0
		my = 0
		rx = x
		ry = y
		xo = 0
		yo = 0
		const ntan: number = -tan
		const pi2: number = Math.PI / 2
		const pi3: number = 3 * pi2
		if (a > pi2 && a < pi3) {
			rx = Math.floor(x / this._blockWidth) * this._blockWidth - 0.0001
			ry = (x - rx) * ntan + y
			xo = -this._blockWidth
			yo = -xo * ntan
		}
		if (a < pi2 || a > pi3) {
			rx = Math.floor(x / this._blockWidth) * this._blockWidth + this._blockWidth
			ry = (x - rx) * ntan + y
			xo = this._blockWidth
			yo = -xo * ntan
		}
		while (my >= 0 && my < this._data.length && !hit) {
			mx = Math.floor(rx / this._blockWidth)
			my = Math.floor(ry / this._blockHeight)
			hit = my >= 0 && my < this._data.length && mx >= 0 && mx < this._data[0].length && this._data[my][mx] > 0
			if (!hit) {
				rx += xo
				ry += yo
			}
		}
		const vDist: number = Math.sqrt((rx - x) * (rx - x) + (ry - y) * (ry - y))
		if (vDist < hDist) {
			this._rays.data[nIntersection].x = rx
			this._rays.data[nIntersection].y = ry
			this._rays.data[nIntersection].colBlock = mx
			this._rays.data[nIntersection].ligBlock = my
			this._rays.data[nIntersection].dist = vDist
		} else {
			this._rays.data[nIntersection].x = hrx
			this._rays.data[nIntersection].y = hry
			this._rays.data[nIntersection].colBlock = hmx
			this._rays.data[nIntersection].ligBlock = hmy
			this._rays.data[nIntersection].dist = hDist
		}
		let ca: number = centerAngle - a
		if (ca < 0) ca += Math.PI * 2
		if (ca > Math.PI * 2) ca -= Math.PI * 2
		//console.log(ca)
		this._rays.data[nIntersection].dist *= Math.cos(ca)
	}
	
	lanceRayons (
		x: number,
		y: number,
		angle: number
	): void {
		const angleStep: number = this._rays.angleWidth / this._rays.raysNumber
		let a: number = (angle - (this._rays.angleWidth / 2) + Math.PI * 2) % (Math.PI * 2)
		for (let i = 0; i < this.rayons.length; i++) {
			this._lanceRayonH(x, y, angle, a, i)
			this.rayons[i].x1 = x
			this.rayons[i].y1 = y
			this.rayons[i].x2 = this._rays.data[i].x
			this.rayons[i].y2 = this._rays.data[i].y
			//this._vue.distances[i] = this.intersections[i].dist
			//this._vue.hitWhat[i]
				= this._data[this._rays.data[i].ligBlock][this._rays.data[i].colBlock]
			a = (a + angleStep + Math.PI * 2) % (Math.PI * 2)
		}
		//console.log(this._vue.distances)
	}

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
		this._ctx.strokeStyle = "#0F0"
		this._ctx.beginPath()
		for (let i = 0; i < this._rays.data.length; i++) {
			const r = this._rays.data[i]
			this._ctx.moveTo(r.orig[0], r.orig[1])
			this._ctx.lineTo(r.x, r.y)
		}
		this._ctx.closePath()
		this._ctx.stroke()
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