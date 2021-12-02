/**
 * @module
 * Builtin IGrid implementation
 */
import type { IGridConfig, IGrid } from "../Grid";
/**
 * Builtin implementation of an IGrid
 *
 * @export
 * @class Grid
 * @implements {IGrid}
 */
export declare class Grid implements IGrid {
    /**
     * Stored reference to the canvas in which this grid have to be drawn
     *
     * @private
     * @type {HTMLCanvasElement}
     * @memberof Grid
     */
    private readonly _canvas;
    private readonly _ctx;
    private _data;
    private _columnsNumber;
    private _linesNumber;
    blockStyles: {
        [blockValue: number]: string;
    };
    bgColor: string;
    color: string;
    private _blockHeight;
    private _blockWidth;
    segments: Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }>;
    private _rays;
    constructor(opts: IGridConfig);
    get data(): Array<Array<number>>;
    set data(value: Array<Array<number>>);
    get columnsNumber(): number;
    set columnsNumber(_value: number);
    get linesNumber(): number;
    set linesNumber(_value: number);
    get blockHeight(): number;
    set blockHeight(_value: number);
    get blockWidth(): number;
    set blockWidth(_value: number);
    drawGrid(): void;
    drawBlocks(): void;
    drawSegments(): void;
    draw(): void;
    private _coordonneesSourisDansGrille;
    private _switchBlock;
}
export default Grid;
