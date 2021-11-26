import type { IRaysConfig, IRay, IRays } from "../Rays";
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
export default Rays;
