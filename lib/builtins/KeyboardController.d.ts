import type { IKeyboardControllerConfig, IKeyboardController } from "../KeyboardController";
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
export default KeyboardController;
