/**
 * Interface that must match a configuration object given to the constructor of any class that implements [[IRay]]
 *
 * @export
 * @interface IRaysConfig
 */
export interface IRaysConfig {
	/**
	 * The angle width of the point of vue expressed in Radians.
	 * Any value lower than PI/8 or greater than 0.95*PI will be bounded to the closest of these limits.
	 *
	 * @type {number}
	 * @memberof IRaysConfig
	 */
	readonly angleWidth: number

	/**
	 * The number of horizontal rays to cast.
	 *
	 * @type {number}
	 * @memberof IRaysConfig
	 */
	readonly raysNumber: number
}

/**
 * A type alias defining a 2D position
 */
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