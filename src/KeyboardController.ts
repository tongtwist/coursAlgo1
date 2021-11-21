export type KeyboardEventHandler = (evt: KeyboardEvent) => void

export interface IKeyboardControllerConfig {
	readonly target: Window | HTMLElement
	readonly keydownHandlers: { [key: string]: KeyboardEventHandler }
	readonly keyupHandlers: { [key: string]: KeyboardEventHandler }
	readonly preventDefaults: boolean
}

export interface IKeyboardController {
	readonly isActive: boolean
	activate(): void
	deactivate(): void
}

export class KeyboardController implements IKeyboardController {
	private _target: Window | HTMLElement
	private _keydownHandlers: { [key: string]: KeyboardEventHandler }
	private _keyupHandlers: { [key: string]: KeyboardEventHandler }
	private _keydownHandler: KeyboardEventHandler
	private _keyupHandler: KeyboardEventHandler
	private _preventDefaults: boolean
	private _active: boolean

	constructor (cfg: IKeyboardControllerConfig) {
		this._target = cfg.target
		this._keydownHandlers = cfg.keydownHandlers
		this._keyupHandlers = cfg.keyupHandlers
		this._keydownHandler = (evt: KeyboardEvent) => {
			if (evt.key in this._keydownHandlers) {
				this._keydownHandlers[evt.key](evt)
				this._preventDefaults && evt.preventDefault()
			}
		}
		this._keyupHandler = (evt: KeyboardEvent) => {
			if (evt.key in this._keyupHandlers) {
				this._keyupHandlers[evt.key](evt)
				this._preventDefaults && evt.preventDefault()
			}
		}
		this._preventDefaults = cfg.preventDefaults
		this._active = false
	}

	get isActive (): boolean { return this._active }
	set isActive (_value: boolean) {}

	activate (): void {
		if (!this._active) {
			this._target.addEventListener("keyup", this._keyupHandler.bind(this) as EventListener)
			this._target.addEventListener("keydown", this._keydownHandler.bind(this) as EventListener)
			this._active = true
		}
	}

	deactivate (): void {
		if (this._active) {
			this._target.removeEventListener("keydown", this._keydownHandler.bind(this) as EventListener)
			this._target.removeEventListener("keyup", this._keyupHandler.bind(this) as EventListener)
			this._active = false
		}
	}
}

