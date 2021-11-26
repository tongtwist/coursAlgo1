export declare type KeyboardEventHandler = (evt: KeyboardEvent) => void;
export interface IKeyboardControllerConfig {
    readonly target: Window | HTMLElement;
    readonly keydownHandlers: {
        [key: string]: KeyboardEventHandler;
    };
    readonly keyupHandlers: {
        [key: string]: KeyboardEventHandler;
    };
    readonly preventDefaults: boolean;
}
export interface IKeyboardController {
    readonly isActive: boolean;
    activate(): void;
    deactivate(): void;
}
export declare class KeyboardController implements IKeyboardController {
    private _target;
    private _keydownHandlers;
    private _keyupHandlers;
    private _keydownHandler;
    private _keyupHandler;
    private _preventDefaults;
    private _active;
    constructor(cfg: IKeyboardControllerConfig);
    get isActive(): boolean;
    set isActive(_value: boolean);
    activate(): void;
    deactivate(): void;
}
