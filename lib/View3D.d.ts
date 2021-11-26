import type { IRays } from "./Rays";
export interface IView3DConfig {
    readonly canvas: HTMLCanvasElement;
    readonly couleurSol: string;
    readonly couleurPlafond: string;
    readonly blockStyles: {
        [blockValue: number]: string;
    };
    readonly rays: IRays;
}
export interface IView3D {
    couleurSol: string;
    couleurPlafond: string;
    distances: Array<number>;
    hitWhat: Array<number>;
    dessineSol(): void;
    dessinePlafond(): void;
    dessineMurs(): void;
    dessine(): void;
}
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
