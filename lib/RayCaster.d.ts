import type { IGrille } from "./Grille";
import type { IRay, IRays } from "./Rays";
export interface IRayCasterConfig {
    readonly grille: IGrille;
    readonly rays: IRays;
}
export interface IRayCaster {
    readonly rays: IRays;
    cast(x: number, y: number, ray: IRay): void;
    castAll(x: number, y: number): void;
}
