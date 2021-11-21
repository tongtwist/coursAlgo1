import type { IGrille } from "./Grille"
import type { IRay, IRays } from "./Rays"


export interface IRayCasterConfig {
	readonly grille: IGrille
	readonly rays: IRays
}

export interface IRayCaster {
	readonly rays: IRays
	cast (x: number, y: number, centerAngle: number, a: number, ray: IRay): void
	castAll (x: number, y: number, centerAngle: number): void
}

export class RayCaster implements IRayCaster {
	private readonly _grille: IGrille
	private _rays: IRays

	constructor (cfg: IRayCasterConfig) {
		this._grille = cfg.grille
		this._rays = cfg.rays
	}

	get rays () { return this._rays }
	set rays (_v: IRays) {}

	castAll (
		x: number,
		y: number,
		centerAngle: number
	): void {
		let i = 0
		for (const ray of this._rays.data) {
			this.cast(x, y, centerAngle, centerAngle + ray.da, ray)
			/*this._vue.distances[i] = this.rays[i].dist
			this._vue.hitWhat[i]
				= this._data[this.rays[i].ligBlock][this.rays[i].colBlock]
			a = (a + angleStep + Math.PI * 2) % (Math.PI * 2)*/
			i++
		}
		//console.log(this._vue.distances)
	}

	cast (
		x: number,
		y: number,
		centerAngle: number,
		a: number,
		ray: IRay
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
			ry = Math.floor(y / this._grille.blockHeight) * this._grille.blockHeight - 0.0001
			rx = (y - ry) * atan + x
			yo = -this._grille.blockHeight
			xo = -yo * atan
		}
		if (a < Math.PI) {
			ry = Math.floor(y / this._grille.blockHeight) * this._grille.blockHeight + this._grille.blockHeight
			rx = (y - ry) * atan + x
			yo = this._grille.blockHeight
			xo = -yo * atan
		}
		while (my >= 0 && my < this._grille.nbLignes && !hit) {
			mx = Math.floor(rx / this._grille.blockWidth)
			my = Math.floor(ry / this._grille.blockHeight)
			hit = my >= 0 && my < this._grille.nbLignes && mx >= 0 && mx < this._grille.nbColonnes && this._grille.data[my][mx] > 0
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
			rx = Math.floor(x / this._grille.blockWidth) * this._grille.blockWidth - 0.0001
			ry = (x - rx) * ntan + y
			xo = -this._grille.blockWidth
			yo = -xo * ntan
		}
		if (a < pi2 || a > pi3) {
			rx = Math.floor(x / this._grille.blockWidth) * this._grille.blockWidth + this._grille.blockWidth
			ry = (x - rx) * ntan + y
			xo = this._grille.blockWidth
			yo = -xo * ntan
		}
		while (my >= 0 && my < this._grille.nbLignes && !hit) {
			mx = Math.floor(rx / this._grille.blockWidth)
			my = Math.floor(ry / this._grille.blockHeight)
			hit = my >= 0 && my < this._grille.nbLignes && mx >= 0 && mx < this._grille.nbColonnes && this._grille.data[my][mx] > 0
			if (!hit) {
				rx += xo
				ry += yo
			}
		}
		const vDist: number = Math.sqrt((rx - x) * (rx - x) + (ry - y) * (ry - y))
		if (vDist < hDist) {
			ray.x = rx
			ray.y = ry
			ray.colBlock = mx
			ray.ligBlock = my
			ray.dist = vDist
		} else {
			ray.x = hrx
			ray.y = hry
			ray.colBlock = hmx
			ray.ligBlock = hmy
			ray.dist = hDist
		}
		let ca: number = centerAngle - a
		if (ca < 0) ca += Math.PI * 2
		if (ca > Math.PI * 2) ca -= Math.PI * 2
		//console.log(ca)
		ray.dist *= Math.cos(ca)
		ray.orig[0] = x
		ray.orig[1] = y
	}

}