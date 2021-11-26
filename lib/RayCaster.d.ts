import type { IGrille } from "./Grille";
import { IRay, IRays } from "./Rays.js";
export interface IRayCasterConfig {
    readonly grille: IGrille;
    readonly rays: IRays;
}
export interface IRayCaster {
    readonly rays: IRays;
    cast(x: number, y: number, ray: IRay): void;
    castAll(x: number, y: number): void;
}
export declare class RayCaster implements IRayCaster {
    private readonly _grille;
    private _rays;
    constructor(cfg: IRayCasterConfig);
    get rays(): IRays;
    set rays(_v: IRays);
    castAll(x: number, y: number): void;
    cast(x: number, y: number, ray: IRay): void;
}
