import type { IRays } from "../Rays"
import type {
	IPointConfig,
	IPoint
} from "../Point"

import { Rays } from "./Rays"


export class Point implements IPoint {
	private static _vPivot: number = 5
	private static _vTranslation: number = 100
	private _ctx: CanvasRenderingContext2D
	private _x: number
	private _y: number
	private _angle: number
	couleur: string
	deltaPivotGauche: number
	deltaPivotDroite: number
	deltaAvance: number
	deltaRecule: number
	private _rays: IRays

	constructor (opts: IPointConfig) {
		this._ctx = opts.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
		this._x = opts.x
		this._y = opts.y
		this._angle = opts.angle
		this.couleur = opts.couleur
		this.deltaPivotGauche = 0
		this.deltaPivotDroite = 0
		this.deltaAvance = 0
		this.deltaRecule = 0
		this._rays = opts.rays
	}

	get x () { return this._x }
	set x (_value: number) {}

	get y () { return this._y }
	set y (_value: number) {}

	get angle () { return this._angle }
	set angle (_value: number) {}

	calculeDeplacement (deltaT: number): [ number, number ] {
		const normeV: number
			= Point._vTranslation * deltaT * 0.001
			* (this.deltaAvance - this.deltaRecule)
		const x: number = Math.cos(this._angle) * normeV
		const y: number = Math.sin(this._angle) * normeV
		return [x, y]
	}

	deplace (deltaT: number) {
		const totalPivot: number
			= this.deltaPivotGauche - this.deltaPivotDroite
		if (totalPivot !== 0) {
			const deltaAngle: number
				= totalPivot * Point._vPivot * deltaT * -0.001
			this._angle = Rays.fixAngle(this._angle + deltaAngle)
			this._rays.centerAngle = this._angle
		}
		const v: [ number, number ]
			= this.calculeDeplacement(deltaT)
		this._x += v[0]
		this._y += v[1]
	}
	
	dessine () {
		this._ctx.strokeStyle = this.couleur
		this._ctx.beginPath()
		this._ctx.moveTo(this._x, this._y)
		this._ctx.arc(this._x, this._y, 10, this._angle + Math.PI * .25, this._angle + Math.PI * 1.75, false)
		this._ctx.closePath()
		this._ctx.stroke()
	}
}

export default Point