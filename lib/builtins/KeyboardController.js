export class KeyboardController {
    constructor(cfg) {
        this._target = cfg.target;
        this._keydownHandlers = cfg.keydownHandlers;
        this._keyupHandlers = cfg.keyupHandlers;
        this._keydownHandler = (evt) => {
            if (evt.key in this._keydownHandlers) {
                this._keydownHandlers[evt.key](evt);
                this._preventDefaults && evt.preventDefault();
            }
        };
        this._keyupHandler = (evt) => {
            if (evt.key in this._keyupHandlers) {
                this._keyupHandlers[evt.key](evt);
                this._preventDefaults && evt.preventDefault();
            }
        };
        this._preventDefaults = cfg.preventDefaults;
        this._active = false;
    }
    get isActive() { return this._active; }
    set isActive(_value) { }
    activate() {
        if (!this._active) {
            this._target.addEventListener("keyup", this._keyupHandler.bind(this));
            this._target.addEventListener("keydown", this._keydownHandler.bind(this));
            this._active = true;
        }
    }
    deactivate() {
        if (this._active) {
            this._target.removeEventListener("keydown", this._keydownHandler.bind(this));
            this._target.removeEventListener("keyup", this._keyupHandler.bind(this));
            this._active = false;
        }
    }
}
export default KeyboardController;
//# sourceMappingURL=KeyboardController.js.map