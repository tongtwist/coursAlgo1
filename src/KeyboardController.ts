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