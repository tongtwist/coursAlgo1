export interface IRaysConfig {
	readonly angleWidth: number
	readonly raysNumber: number
}

export type Position = [ number, number ]

export interface IRay {
	da: number
	a: number
	tan: number,
	atan: number,
	orig: Position
	x: number
	y: number
	dist: number
	blockType: number
	colBlock: number
	ligBlock: number
	vhit: boolean
}

export interface IRays {
	angleWidth: number
	raysNumber: number
	readonly data: Array<IRay>
	centerAngle: number
}

export class Rays implements IRays {
	private _angleWidth: number
	private _raysNumber: number
	private _rays: Array<IRay>
	private _centerAngle: number

	constructor (cfg: IRaysConfig) {
		this._angleWidth = this._fixAngleWidth(cfg.angleWidth)
		this._raysNumber = this._fixRaysNumber(cfg.raysNumber)
		this._rays = this._computeEmptyRays()
		this._centerAngle = 0
	}

	get angleWidth () { return this._angleWidth }
	set angleWidth (newValue: number) {
		this._angleWidth = this._fixAngleWidth(newValue)
		this._rays = this._computeEmptyRays()
	}

	get raysNumber () { return this._raysNumber }
	set raysNumber (newValue: number) {
		this._raysNumber = this._fixRaysNumber(newValue)
		this._rays = this._computeEmptyRays()
	}

	get data () { return this._rays }
	set data (_v: Array<IRay>) {}

	get centerAngle () { return this._centerAngle }
	set centerAngle (newValue: number) {
		this._centerAngle = Rays.fixAngle(newValue)
		for (const r of this._rays) {
			const a: number = Rays.fixAngle(newValue + r.da)
			const tan: number = Math.tan(a)
			r.a = Rays.fixAngle(a)
			r.tan = tan
			r.atan = -1 / tan
		}
	}

	private _fixAngleWidth (valueToFix: number): number {
		return Math.max(Math.PI / 8, Math.abs(valueToFix))
	}
	
	private _fixRaysNumber (valueToFix: number): number {
		return Math.max(1, Math.round(valueToFix))
	}

	private _computeEmptyRays (): Array<IRay> {
		const ret: Array<IRay> = Array<IRay>(this._raysNumber)
		let da: number = this._angleWidth / 2
		const angleStep: number = this._angleWidth / this._raysNumber
		for (let i = 0; i < this._raysNumber; i++) {
			const a: number = Rays.fixAngle(da)
			const tan: number = Math.tan(a)
			ret[i] = {
				da,
				a,
				tan,
				atan: -1 / tan,
				orig: [0, 0],
				x: 0,
				y: 0,
				dist: 0,
				blockType: 0,
				colBlock: 0,
				ligBlock: 0,
				vhit: false
			}
			da -= angleStep
		}
		return ret.reverse()
	}

	static fixAngle (angle: number): number {
		return (angle + Math.PI * 2) % (Math.PI * 2)
	}
}