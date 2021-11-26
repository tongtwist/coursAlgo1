import type { Position } from "../Rays";
import type { IPointConfig, IPoint } from "../Point";
export declare class Point implements IPoint {
    private static _vRotation;
    private static _vTranslation;
    private _ctx;
    private _x;
    private _y;
    private _angle;
    color: string;
    deltaLeftRotation: number;
    deltaRightRotation: number;
    deltaGoForward: number;
    deltaGoBackward: number;
    private _rays;
    constructor(opts: IPointConfig);
    get x(): number;
    set x(_value: number);
    get y(): number;
    set y(_value: number);
    get angle(): number;
    set angle(_value: number);
    computeMove(deltaT: number): Position;
    move(deltaT: number): void;
    draw(): void;
}
export default Point;
