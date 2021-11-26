import type { IView3DConfig, IView3D } from "../View3D";
export declare class View3D implements IView3D {
    private _canvas;
    private _ctx;
    private _midHeight;
    private _rays;
    private readonly _nbColonnes;
    distances: Array<number>;
    hitWhat: Array<number>;
    couleurSol: string;
    couleurPlafond: string;
    private _blockStyles;
    constructor(cfg: IView3DConfig);
    dessineSol(): void;
    dessinePlafond(): void;
    dessineMurs(): void;
    dessine(): void;
}
export default View3D;
