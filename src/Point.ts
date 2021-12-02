/**
 * @module
 * Point interfaces
 */

import type { IRays } from "./Rays"


/**
 * Interface of a configuration object given to the constructor of any class that implements [[IPoint]]
 *
 * @export
 * @interface IPointConfig
 */
export interface IPointConfig {
	/**
	 * Canvas in which the point will be drawn
	 *
	 * @type {HTMLCanvasElement}
	 * @memberof IPointConfig
	 */
	readonly canvas: HTMLCanvasElement

	/**
	 * Horizontal coordinate of the point
	 *
	 * @type {number}
	 * @memberof IPointConfig
	 */
	readonly x: number

	/**
	 * Vertical coordinate of the point
	 *
	 * @type {number}
	 * @memberof IPointConfig
	 */
	readonly y: number

	/**
	 * Initial direction angle of the center of the view
	 *
	 * @type {number}
	 * @memberof IPointConfig
	 */
	readonly angle: number

	/**
	 * color of the point
	 *
	 * @type {string}
	 * @memberof IPointConfig
	 */
	readonly color: string

	/**
	 * Group of rays casted from this point
	 *
	 * @type {IRays}
	 * @memberof IPointConfig
	 */
	readonly rays: IRays
}

/**
 * Interface of any point object
 *
 * @export
 * @interface IPoint
 */
export interface IPoint {
	/**
	 * Horizontal coordinate of the point
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	readonly x: number

	/**
	 * Vertical coordinate of the point
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	readonly y: number

	/**
	 * Current direction angle of the center of the view
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	readonly angle: number

	/**
	 * Left rotation to apply on the view direction angle
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	deltaLeftRotation: number

	/**
	 * Right rotation to apply on the view direction angle
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	deltaRightRotation: number

	/**
	 * Norm to apply on the forward translation vector of the point
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	deltaGoForward: number

	/**
	 * Norm to apply on the backward translation vector of the point
	 *
	 * @type {number}
	 * @memberof IPoint
	 */
	deltaGoBackward: number

	/**
	 * Compute the translation to apply on the point since the last `deltaT` milliseconds
	 *
	 * @param {number} deltaT
	 * @returns {[ number, number ]}
	 * @memberof IPoint
	 */
	computeMove (deltaT: number): [ number, number ]

	/**
	 * Modify the point's position and direction view angle in order to make the point match its last `deltaT` milliseconds moves
	 *
	 * @param {number} deltaT
	 * @memberof IPoint
	 */
	move (deltaT: number): void

	/**
	 * Draw the point in its canvas
	 *
	 * @memberof IPoint
	 */
	draw (): void
}