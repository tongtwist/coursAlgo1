import { IRays } from "./Rays.js";
export interface IPointConfig {
    readonly canvas: HTMLCanvasElement;
    readonly x: number;
    readonly y: number;
    readonly angle: number;
    readonly couleur: string;
    readonly rays: IRays;
}
export interface IPoint {
    readonly x: number;
    readonly y: number;
    readonly angle: number;
    deltaPivotGauche: number;
    deltaPivotDroite: number;
    deltaAvance: number;
    deltaRecule: number;
    calculeDeplacement(deltaT: number): [number, number];
    deplace(deltaT: number): void;
    dessine(): void;
}
export declare class Point implements IPoint {
    private static _vPivot;
    private static _vTranslation;
    private _ctx;
    private _x;
    private _y;
    private _angle;
    couleur: string;
    deltaPivotGauche: number;
    deltaPivotDroite: number;
    deltaAvance: number;
    deltaRecule: number;
    private _rays;
    constructor(opts: IPointConfig);
    get x(): number;
    set x(_value: number);
    get y(): number;
    set y(_value: number);
    get angle(): number;
    set angle(_value: number);
    calculeDeplacement(deltaT: number): [number, number];
    deplace(deltaT: number): void;
    dessine(): void;
}
