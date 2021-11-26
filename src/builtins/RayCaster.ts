import type { IGrid } from "../Grid"
import type {
	IRay,
	IRays
} from "../Rays"
import type {
	IRayCasterConfig,
	IRayCaster
} from "../RayCaster"
import { Rays } from "./Rays.js"


export class RayCaster implements IRayCaster {
	private readonly _grid: IGrid
	private _rays: IRays

	constructor (cfg: IRayCasterConfig) {
		this._grid = cfg.grid
		this._rays = cfg.rays
	}

	get rays () { return this._rays }
	set rays (_v: IRays) {}

	castAll ( x: number, y: number ): void {
		for (const ray of this._rays.data) {
			this.cast(x, y, ray)
		}
	}

	cast ( x: number, y: number, ray: IRay ): void {
		const a: number = ray.a
		let hit: boolean = false
		let i: number = 0
		let j: number = 0
		let rx: number = x
		let ry: number = y
		let xo: number = 0
		let yo: number = 0
		const tan: number = ray.tan
		const atan: number = ray.atan
		if (a > Math.PI) {
			ry = Math.floor(y / this._grid.blockHeight) * this._grid.blockHeight - 0.0000001
			rx = (y - ry) * atan + x
			yo = -this._grid.blockHeight
			xo = -yo * atan
		}
		if (a < Math.PI) {
			ry = Math.floor(y / this._grid.blockHeight) * this._grid.blockHeight + this._grid.blockHeight
			rx = (y - ry) * atan + x
			yo = this._grid.blockHeight
			xo = -yo * atan
		}
		while (j >= 0 && j < this._grid.linesNumber && !hit) {
			i = Math.floor(rx / this._grid.blockWidth)
			j = Math.floor(ry / this._grid.blockHeight)
			hit = j >= 0 && j < this._grid.linesNumber && i >= 0 && i < this._grid.columnsNumber && this._grid.data[j][i] > 0
			if (!hit) {
				rx += xo
				ry += yo
			}
		}
		const hrx: number = rx
		const hry: number = ry
		const hi: number = i
		const hj: number = j
		const hDist: number = (hrx - x) * (hrx - x) + (hry - y) * (hry - y)
		hit = false
		i = 0
		j = 0
		rx = x
		ry = y
		xo = 0
		yo = 0
		const ntan: number = -ray.tan
		const piSur2: number = Math.PI / 2
		const pi3: number = 3 * piSur2
		if (a > piSur2 && a < pi3) {
			rx = Math.floor(x / this._grid.blockWidth) * this._grid.blockWidth - 0.0001
			ry = (x - rx) * ntan + y
			xo = -this._grid.blockWidth
			yo = -xo * ntan
		}
		if (a < piSur2 || a > pi3) {
			rx = Math.floor(x / this._grid.blockWidth) * this._grid.blockWidth + this._grid.blockWidth
			ry = (x - rx) * ntan + y
			xo = this._grid.blockWidth
			yo = -xo * ntan
		}
		while (j >= 0 && j < this._grid.linesNumber && !hit) {
			i = Math.floor(rx / this._grid.blockWidth)
			j = Math.floor(ry / this._grid.blockHeight)
			hit = j >= 0 && j < this._grid.linesNumber && i >= 0 && i < this._grid.columnsNumber && this._grid.data[j][i] > 0
			if (!hit) {
				rx += xo
				ry += yo
			}
		}
		const vDist: number = (rx - x) * (rx - x) + (ry - y) * (ry - y)
		const fishEyeFix: number = Math.cos(Rays.fixAngle(this._rays.centerAngle - a))
		ray.vhit = vDist < hDist
		if (ray.vhit) {
			ray.x = rx
			ray.y = ry
			ray.dist = Math.sqrt(vDist) * fishEyeFix
			ray.colBlock = i
			ray.ligBlock = j
		} else {
			ray.x = hrx
			ray.y = hry
			ray.dist = Math.sqrt(hDist) * fishEyeFix
			ray.colBlock = hi
			ray.ligBlock = hj
		}
		ray.blockType = this._grid.data[ray.ligBlock][ray.colBlock]
		ray.orig[0] = x
		ray.orig[1] = y
	}

}

export default RayCaster