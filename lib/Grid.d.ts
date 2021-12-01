/**
 * @module
 * Grid interfaces
 */
import type { IRays } from "./Rays";
/**
 * Interface of a configuration object given to the constructor of any class that implements [[IGrid]]
 *
 * @export
 * @interface IGridConfig
 */
export interface IGridConfig {
    /**
     * HTML Canvas element in which the grid have to be drawn
     *
     * @type {HTMLCanvasElement}
     * @memberof IGridConfig
     */
    readonly canvas: HTMLCanvasElement;
    /**
     * Content of the Grid
     *
     * @type {Array<Array<number>>}
     * @memberof IGridConfig
     */
    readonly data: Array<Array<number>>;
    /**
     * Rendering styles of the grid blocks when they are drawn in the canvas
     *
     * @type {{ [ blockValue: number]: string }}
     * @memberof IGridConfig
     */
    readonly blockStyles: {
        [blockValue: number]: string;
    };
    /**
     * Background color of the grid in the canvas
     *
     * @type {string}
     * @memberof IGridConfig
     */
    readonly bgColor: string;
    /**
     * Color of the grid in the canvas
     *
     * @type {string}
     * @memberof IGridConfig
     */
    readonly color: string;
    /**
     * Rays group to render on top of the grid in the canvas
     *
     * @type {IRays}
     * @memberof IGridConfig
     */
    readonly rays: IRays;
}
/**
 * Interface of any Grid object
 *
 * @export
 * @interface IGrid
 */
export interface IGrid {
    /**
     * Content of this grid
     *
     * @type {Array<Array<number>>}
     * @memberof IGrid
     */
    data: Array<Array<number>>;
    /**
     * Number of columns in the Grid
     *
     * @type {number}
     * @memberof IGrid
     */
    readonly columnsNumber: number;
    /**
     * Number of lines in the Grid
     *
     * @type {number}
     * @memberof IGrid
     */
    readonly linesNumber: number;
    /**
     * Rendering styles of the grid blocks when they are drawn in the canvas
     *
     * @type {{ [ blockValue: number]: string }}
     * @memberof IGrid
     */
    blockStyles: {
        [blockValue: number]: string;
    };
    /**
     * Background color of the grid when rendered in its canvas
     *
     * @type {string}
     * @memberof IGrid
     */
    bgColor: string;
    /**
     * Color of the grid when rendered in its canvas
     *
     * @type {string}
     * @memberof IGrid
     */
    color: string;
    /**
     * Height of a block of this grid
     *
     * @type {number}
     * @memberof IGrid
     */
    readonly blockHeight: number;
    /**
     * Width of a block of this grid
     *
     * @type {number}
     * @memberof IGrid
     */
    readonly blockWidth: number;
    /**
     * Segments to draw in the canvas of this grid that represent rays
     *
     * @type {Array<{x1: number, y1: number, x2: number, y2: number}>}
     * @memberof IGrid
     */
    segments: Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }>;
    /**
     * Method that draw the grid in its canvas
     *
     * @memberof IGrid
     */
    drawGrid(): void;
    /**
     * Method that draw the blocks of the grid in its canvas
     *
     * @memberof IGrid
     */
    drawBlocks(): void;
    /**
     * Method that draw the rays segments on the canvas
     *
     * @memberof IGrid
     */
    drawSegments(): void;
    /**
     * Method that draw everything about the grid on its canvas
     *
     * @memberof IGrid
     */
    draw(): void;
}
