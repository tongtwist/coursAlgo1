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
export interface IRay {
    da: number;
    a: number;
    tan: number;
    atan: number;
    orig: Position;
    x: number;
    y: number;
    dist: number;
    blockType: number;
    colBlock: number;
    ligBlock: number;
    vhit: boolean;
}
export interface IRays {
    angleWidth: number;
    raysNumber: number;
    readonly data: Array<IRay>;
    centerAngle: number;
}
export declare class Rays implements IRays {
    private _angleWidth;
    private _raysNumber;
    private _rays;
    private _centerAngle;
    constructor(cfg: IRaysConfig);
    get angleWidth(): number;
    set angleWidth(newValue: number);
    get raysNumber(): number;
    set raysNumber(newValue: number);
    get data(): Array<IRay>;
    set data(_v: Array<IRay>);
    get centerAngle(): number;
    set centerAngle(newValue: number);
    private _fixAngleWidth;
    private _fixRaysNumber;
    private _computeEmptyRays;
    static fixAngle(angle: number): number;
}
