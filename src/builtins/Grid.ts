import type { IRays} from "../Rays"
import type {
	IGridConfig,
	IGrid
} from "../Grid"


export class Grid implements IGrid {
	private readonly _canvas: HTMLCanvasElement
	private readonly _ctx: CanvasRenderingContext2D
	private _data: Array<Array<number>>
	private _columnsNumber: number
	private _linesNumber: number
	blockStyles: { [ blockValue: number ]: string }
	bgColor: string
	color: string
	private _blockHeight: number
	private _blockWidth: number
	segments: Array<{x1: number, y1: number, x2: number, y2: number}>
	private _rays: IRays

	constructor (opts: IGridConfig) {
		this._canvas = opts.canvas
		this._ctx = opts.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
		this._data = opts.data
		this._columnsNumber = opts.data[0].length
		this._linesNumber = opts.data.length
		this.blockStyles = opts.blockStyles
		this.bgColor = opts.bgColor
		this.color = opts.color
		this._blockHeight = Math.round(this._canvas.height / this.data.length)
		this._blockWidth = Math.round(this._canvas.width / this.data[0].length)
		this._canvas.addEventListener("mouseup", (evt: MouseEvent) => this._coordonneesSourisDansGrille(evt))
		this.segments = Array(opts.rays.raysNumber)
		this._rays = opts.rays
		for (let i = 0; i < opts.rays.raysNumber; i++) {
			this.segments[i] = { x1: 0, y1: 0, x2: 0, y2: 0 }
		}
	}

	get data () { return this._data }
	set data (value: Array<Array<number>>) {
		this._data = value
		this._columnsNumber = value[0].length
		this._linesNumber = value.length
		this._blockHeight = Math.round(this._canvas.height / value.length)
		this._blockWidth = Math.round(this._canvas.width / value.length)
	}
	
	get columnsNumber () { return this._columnsNumber }
	set columnsNumber (_value: number) {}

	get linesNumber () { return this._linesNumber }
	set linesNumber (_value: number) {}
	
	get blockHeight () { return this._blockHeight }
	set blockHeight (_value: number) {}

	get blockWidth () { return this._blockWidth }
	set blockWidth (_value: number) {}

	drawGrid () {
		this._ctx.fillStyle = this.bgColor
		this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
		this._ctx.strokeStyle = this.color
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

	drawBlocks () {
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

	drawSegments() {
		for (const r of this._rays.data) {
			this._ctx.strokeStyle = `#00${(255-Math.round(r.dist * 255 / 500)).toString(16)}00`
			this._ctx.beginPath()
			this._ctx.moveTo(r.orig[0], r.orig[1])
			this._ctx.lineTo(r.x, r.y)
			this._ctx.closePath()
			this._ctx.stroke()
		}
	}

	draw () {
		this.drawGrid()
		this.drawBlocks()
		this.drawSegments()
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

export default Grid