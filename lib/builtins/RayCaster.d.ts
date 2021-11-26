import type { IRay, IRays } from "../Rays";
import type { IRayCasterConfig, IRayCaster } from "../RayCaster";
export declare class RayCaster implements IRayCaster {
    private readonly _grille;
    private _rays;
    constructor(cfg: IRayCasterConfig);
    get rays(): IRays;
    set rays(_v: IRays);
    castAll(x: number, y: number): void;
    cast(x: number, y: number, ray: IRay): void;
}
