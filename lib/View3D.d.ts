/**
 * @module
 * View3D interfaces
 */
import type { IRays } from "./Rays";
/**
 * Interface of a configuration object given to the constructor of any class that implements [[IView3D]]
 *
 * @export
 * @interface IView3DConfig
 */
export interface IView3DConfig {
    /**
     * Canvas element in which to draw the 3D view
     *
     * @type {HTMLCanvasElement}
     * @memberof IView3DConfig
     */
    readonly canvas: HTMLCanvasElement;
    /**
     * Ground color to use in the 3D view
     *
     * @type {string}
     * @memberof IView3DConfig
     */
    readonly groundColor: string;
    /**
     * Ceil color to use in the 3D view
     *
     * @type {string}
     * @memberof IView3DConfig
     */
    readonly ceilColor: string;
    /**
     * Block styles to use to render blocks
     *
     * @type {{ [ blockValue: number]: string }}
     * @memberof IView3DConfig
     */
    readonly blockStyles: {
        [blockValue: number]: string;
    };
    /**
     * Group of rays used to render the 3D view
     *
     * @type {IRays}
     * @memberof IView3DConfig
     */
    readonly rays: IRays;
}
/**
 * Interface of any View3D object
 *
 * @export
 * @interface IView3D
 */
export interface IView3D {
    /**
     * Property representing the ground color of the 3D view
     *
     * @type {string}
     * @memberof IView3D
     */
    groundColor: string;
    /**
     * Property representing the ceil color of the 3D view
     *
     * @type {string}
     * @memberof IView3D
     */
    ceilColor: string;
    /**
     * Array of each ray intersection distance from the POV origin
     *
     * @type {Array<number>}
     * @memberof IView3D
     */
    distances: Array<number>;
    /**
     * Array saying what each ray intersects
     *
     * @type {Array<number>}
     * @memberof IView3D
     */
    hitWhat: Array<number>;
    /**
     * Method that draw the ground
     *
     * @memberof IView3D
     */
    drawGround(): void;
    /**
     * Method that draw the ceil
     *
     * @memberof IView3D
     */
    drawCeil(): void;
    /**
     * Method that draw the walls
     *
     * @memberof IView3D
     */
    drawWalls(): void;
    /**
     * Method that draw all the 3D view
     *
     * @memberof IView3D
     */
    draw(): void;
}
