/**
 * @module
 * Keyboard Controller interfaces
 */
/**
 * Keyboard Event Handler function
 */
export declare type KeyboardEventHandler = (evt: KeyboardEvent) => void;
/**
 * Interface of a configuration object given to the constructor of any class that implements [[IKeyboardController]]
 *
 * @export
 * @interface IKeyboardControllerConfig
 */
export interface IKeyboardControllerConfig {
    /**
     * Target element on which attach keyboard event listening.
     * It may be the global `window` object or any HTML Element
     *
     * @type {(Window | HTMLElement)}
     * @memberof IKeyboardControllerConfig
     */
    readonly target: Window | HTMLElement;
    /**
     * Event handlers to attach on given keys when they emit a *keydown* event
     *
     * @type {{ [key: string]: KeyboardEventHandler }}
     * @memberof IKeyboardControllerConfig
     */
    readonly keydownHandlers: {
        [key: string]: KeyboardEventHandler;
    };
    /**
     * Event handlers to attach on given keys when they emit a *keyup* event
     *
     * @type {{ [key: string]: KeyboardEventHandler }}
     * @memberof IKeyboardControllerConfig
     */
    readonly keyupHandlers: {
        [key: string]: KeyboardEventHandler;
    };
    /**
     * Whether or not does the KeyboardController have to prevent defaults event handlers
     *
     * @type {boolean}
     * @memberof IKeyboardControllerConfig
     */
    readonly preventDefaults: boolean;
}
/**
 * Interface of any keyboard controller object
 *
 * @export
 * @interface IKeyboardController
 */
export interface IKeyboardController {
    /**
     * Is the keyboard controller active ?
     *
     * @type {boolean}
     * @memberof IKeyboardController
     */
    readonly isActive: boolean;
    /**
     * Activate the keyboard controller
     *
     * @memberof IKeyboardController
     */
    activate(): void;
    /**
     * Deactivate the keyboard controller
     *
     * @memberof IKeyboardController
     */
    deactivate(): void;
}
