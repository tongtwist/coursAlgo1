export interface IRaysConfig {
	readonly angleWidth: number
	readonly raysNumber: number
}

export type Position = [ number, number ]

export interface IRay {
	da: number
	orig: Position
	x: number
	y: number
	dist: number
	blockType: number
	colBlock: number
	ligBlock: number
}

export interface IRays {
	angleWidth: number
	raysNumber: number
	readonly data: Array<IRay>
}

export class Rays implements IRays {
	private _angleWidth: number
	private _raysNumber: number
	private _rays: Array<IRay>

	constructor (cfg: IRaysConfig) {
		this._angleWidth = this._fixAngleWidth(cfg.angleWidth)
		this._raysNumber = this._fixRaysNumber(cfg.raysNumber)
		this._rays = this._computeEmptyRays()
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

	private _fixAngleWidth (valueToFix: number): number {
		return Math.max(Math.PI / 8, Math.abs(valueToFix))
	}
	
	private _fixRaysNumber (valueToFix: number): number {
		return Math.max(1, Math.round(valueToFix))
	}

	private _computeEmptyRays (): Array<IRay> {
		const ret: Array<IRay> = Array<IRay>(this._raysNumber)
		let da: number = -this._angleWidth / 2
		const angleStep: number = this._angleWidth / this._raysNumber
		for (let i = 0; i < this._raysNumber; i++) {
			ret[i] = {
				da,
				orig: [0, 0],
				x: 0,
				y: 0,
				dist: 0,
				blockType: 0,
				colBlock: 0,
				ligBlock: 0
			}
			da = (da + angleStep + Math.PI * 2) % (Math.PI * 2)
		}
		return ret
	}
}