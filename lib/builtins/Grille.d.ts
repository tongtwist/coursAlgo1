import type { IGrilleConfig, IGrille } from "../Grille";
export declare class Grille implements IGrille {
    private readonly _canvas;
    private readonly _ctx;
    private _data;
    private _nbColonnes;
    private _nbLignes;
    blockStyles: {
        [blockValue: number]: string;
    };
    couleurFond: string;
    couleurGrille: string;
    private _blockHeight;
    private _blockWidth;
    rayons: Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }>;
    private _rays;
    constructor(opts: IGrilleConfig);
    get data(): Array<Array<number>>;
    set data(value: Array<Array<number>>);
    get nbColonnes(): number;
    set nbColonnes(_value: number);
    get nbLignes(): number;
    set nbLignes(_value: number);
    get blockHeight(): number;
    set blockHeight(_value: number);
    get blockWidth(): number;
    set blockWidth(_value: number);
    dessineGrille(): void;
    dessineBlocks(): void;
    dessineRayons(): void;
    dessine(): void;
    private _coordonneesSourisDansGrille;
    private _switchBlock;
}
export default Grille;
