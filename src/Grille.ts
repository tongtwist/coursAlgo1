import type { IRays } from "./Rays"


export interface IGrilleConfig {
	readonly canvas: HTMLCanvasElement
	readonly data: Array<Array<number>>
	readonly blockStyles: { [ blockValue: number]: string }
	readonly couleurFond: string
	readonly couleurGrille: string
	readonly rays: IRays
}

export interface IGrille {
	data: Array<Array<number>>
	readonly nbColonnes: number
	readonly nbLignes: number
	blockStyles: { [ blockValue: number]: string }
	couleurFond: string
	couleurGrille: string
	readonly blockHeight: number
	readonly blockWidth: number
	rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
	dessineGrille (): void
	dessineBlocks (): void
	dessineRayons (): void
	dessine (): void
}