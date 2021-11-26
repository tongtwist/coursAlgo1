import type { IRays } from "../Rays"
import type {
	IView3DConfig,
	IView3D
} from "../View3D"


export class View3D implements IView3D {
	private _canvas: HTMLCanvasElement
	private _ctx: CanvasRenderingContext2D
	private _midHeight: number
	private _rays: IRays
	private readonly _columnsNumber: number
	distances: Array<number>
	hitWhat: Array<number>
	groundColor: string
	ceilColor: string
	private _blockStyles: { [k: number]: string }

	constructor (cfg: IView3DConfig) {
		this._canvas = cfg.canvas
		this._ctx = cfg.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
		this._midHeight = Math.round(this._canvas.height / 2) | 0
		this._rays = cfg.rays
		this._columnsNumber = cfg.canvas.width
		this.distances = Array(this._columnsNumber)
		this.hitWhat = Array(this._columnsNumber)
		this.ceilColor = cfg.ceilColor
		this.groundColor = cfg.groundColor
		this._blockStyles = cfg.blockStyles
	}

	drawGround () {
		const top: number = (this._midHeight + 1) | 0
		this._ctx.fillStyle = this.groundColor
		this._ctx.fillRect(0, top, this._canvas.width, this._canvas.height - top)
		this._ctx.fill()
	}

	drawCeil () {
		this._ctx.fillStyle = this.ceilColor
		this._ctx.fillRect(0, 0, this._canvas.width, this._midHeight)
		this._ctx.fill()
	}

	drawWalls () {
		let lastcolor: string = ""
		let left = 0
		const columnWidth: number = Math.round(this._canvas.width / this._rays.data.length) | 0
		const txHeight: number = (50 * this._canvas.height) | 0
		for (const ray of this._rays.data) {
			const block: number = ray.blockType
			const color: string
				= ray.vhit
				? this._blockStyles[block]
				: "#882211"
			if (color !== lastcolor) {
				if (lastcolor !== "") {
					this._ctx.fill()
				}
				lastcolor = color
				this._ctx.fillStyle = color
			}
			const lineHeight: number = Math.min(this._canvas.height, Math.round(txHeight / ray.dist) | 0) | 0
			const offset: number = Math.round((this._canvas.height - lineHeight) / 2) | 0
			this._ctx.fillRect(left, offset, columnWidth, lineHeight)
			left += columnWidth
		}
		if (lastcolor !== "") {
			this._ctx.fill()
		}
	}

	draw () {
		this.drawGround()
		this.drawCeil()
		this.drawWalls()
	}
}

export default View3D