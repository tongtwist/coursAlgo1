/**
 * @module
 * Raycaster interfaces
 */

import type { IGrid } from "./Grid"
import type {
	IRay,
	IRays
} from "./Rays"


/**
 * Interface of a configuration object given to the constructor of any class that implement [[IRayCaster]]
 *
 * @export
 * @interface IRayCasterConfig
 */
export interface IRayCasterConfig {
	/**
	 * IGrid object in which casting rays
	 *
	 * @type {IGrid}
	 * @memberof IRayCasterConfig
	 */
	readonly grid: IGrid

	/**
	 * Irays object owning rays to cast
	 *
	 * @type {IRays}
	 * @memberof IRayCasterConfig
	 */
	readonly rays: IRays
}

/**
 * Interface of any ray caster object
 *
 * @export
 * @interface IRayCaster
 */
export interface IRayCaster {
	/**
	 * Raycaster property owning the group of rays it cast
	 *
	 * @type {IRays}
	 * @memberof IRayCaster
	 */
	readonly rays: IRays

	/**
	 * Method to cast one `ray` from (`x`,`y`) position
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {IRay} ray
	 * @memberof IRayCaster
	 */
	cast (x: number, y: number, ray: IRay): void

	/**
	 * Method that cast all rays of the inner `rays` property from (`x`,`y`) position
	 *
	 * @param {number} x
	 * @param {number} y
	 * @memberof IRayCaster
	 */
	castAll (x: number, y: number): void
}