import type { IView3DConfig, IView3D } from "../View3D";
export declare class View3D implements IView3D {
    private _canvas;
    private _ctx;
    private _midHeight;
    private _rays;
    private readonly _columnsNumber;
    distances: Array<number>;
    hitWhat: Array<number>;
    groundColor: string;
    ceilColor: string;
    private _blockStyles;
    constructor(cfg: IView3DConfig);
    drawGround(): void;
    drawCeil(): void;
    drawWalls(): void;
    draw(): void;
}
export default View3D;
