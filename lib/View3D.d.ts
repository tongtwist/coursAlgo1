import type { IRays } from "./Rays";
export interface IView3DConfig {
    readonly canvas: HTMLCanvasElement;
    readonly groundColor: string;
    readonly ceilColor: string;
    readonly blockStyles: {
        [blockValue: number]: string;
    };
    readonly rays: IRays;
}
export interface IView3D {
    groundColor: string;
    ceilColor: string;
    distances: Array<number>;
    hitWhat: Array<number>;
    drawGround(): void;
    drawCeil(): void;
    drawWalls(): void;
    draw(): void;
}
