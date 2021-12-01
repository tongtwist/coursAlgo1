/**
 * @module
 * Rays interfaces
 */
/**
 * Interface of a configuration object given to the constructor of any class that implements [[IRay]]
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
    readonly angleWidth: number;
    /**
     * The number of horizontal rays to cast.
     *
     * @type {number}
     * @memberof IRaysConfig
     */
    readonly raysNumber: number;
}
/**
 * A type alias defining a 2D position
 */
export declare type Position = [number, number];
/**
 * Interface of any ray object
 *
 * @export
 * @interface IRay
 */
export interface IRay {
    /**
     * Horizontal delta angle from the center of the FOV for this ray
     *
     * @type {number}
     * @memberof IRay
     */
    da: number;
    /**
     * Horizontal angle in the FOV of this ray
     *
     * @type {number}
     * @memberof IRay
     */
    a: number;
    /**
     * Pre-computed tangent of the angle of this ray
     *
     * @type {number}
     * @memberof IRay
     */
    tan: number;
    /**
     * Pre-computed arc-tangent of the angle of this ray
     *
     * @type {number}
     * @memberof IRay
     */
    atan: number;
    /**
     * 2D position of the FOV, and origin of this ray
     *
     * @type {Position}
     * @memberof IRay
     */
    orig: Position;
    /**
     * Horizontal component of the position of the end of the ray
     *
     * @type {number}
     * @memberof IRay
     */
    x: number;
    /**
     * Vertical component of the position of the end of the ray
     *
     * @type {number}
     * @memberof IRay
     */
    y: number;
    /**
     * Euclidian distance between the origin and the end of the ray
     *
     * @type {number}
     * @memberof IRay
     */
    dist: number;
    /**
     * Block type this ray intersect, if any
     *
     * @type {number}
     * @memberof IRay
     */
    blockType: number;
    /**
     * Horizontal component of the grid position of the intersected block
     *
     * @type {number}
     * @memberof IRay
     */
    colBlock: number;
    /**
     * Vertical component of the grid position of the intersected block
     *
     * @type {number}
     * @memberof IRay
     */
    ligBlock: number;
    /**
     * Does the intersection is a vertical one ?
     *
     * @type {boolean}
     * @memberof IRay
     */
    vhit: boolean;
}
/**
 * Interface of any group of rays that can be used as a Field Of View
 *
 * @export
 * @interface IRays
 */
export interface IRays {
    /**
     * Total angle width of the group of rays
     *
     * @type {number}
     * @memberof IRays
     */
    angleWidth: number;
    /**
     * Total number of rays
     *
     * @type {number}
     * @memberof IRays
     */
    raysNumber: number;
    /**
     * Array of IRay representing the group of rays
     *
     * @type {Array<IRay>}
     * @memberof IRays
     */
    readonly data: Array<IRay>;
    /**
     * Center of the group of rays.
     * In the case of this group of rays represent a Field Of View, `centerAngle` represent the angle of the center of this FOV.
     *
     * @type {number}
     * @memberof IRays
     */
    centerAngle: number;
}
