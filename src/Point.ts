import type { IRays } from "./Rays"


export interface IPointConfig {
	readonly canvas: HTMLCanvasElement
	readonly x: number
	readonly y: number
	readonly angle: number
	readonly color: string
	readonly rays: IRays
}

export interface IPoint {
	readonly x: number
	readonly y: number
	readonly angle: number
	deltaLeftRotation: number
	deltaRightRotation: number
	deltaGoForward: number
	deltaGoBackward: number
	computeMove (deltaT: number): [ number, number ]
	move (deltaT: number): void
	draw (): void
}