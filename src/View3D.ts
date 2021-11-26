import type { IRays } from "./Rays"


export interface IView3DConfig {
	readonly canvas: HTMLCanvasElement
	readonly couleurSol: string
	readonly couleurPlafond: string
	readonly blockStyles: { [ blockValue: number]: string }
	readonly rays: IRays
}

export interface IView3D {
	couleurSol: string
	couleurPlafond: string
	distances: Array<number>
	hitWhat: Array<number>
	dessineSol (): void
	dessinePlafond (): void
	dessineMurs (): void
	dessine (): void
}