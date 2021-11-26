import type { IRays } from "./Rays"


export interface IPointConfig {
	readonly canvas: HTMLCanvasElement
	readonly x: number
	readonly y: number
	readonly angle: number
	readonly couleur: string
	readonly rays: IRays
}

export interface IPoint {
	readonly x: number
	readonly y: number
	readonly angle: number
	deltaPivotGauche: number
	deltaPivotDroite: number
	deltaAvance: number
	deltaRecule: number
	calculeDeplacement (deltaT: number): [ number, number ]
	deplace (deltaT: number): void
	dessine (): void
}