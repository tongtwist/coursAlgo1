/**
 * @module
 * Grid interfaces
 */

import type { IRays } from "./Rays"


export interface IGridConfig {
	readonly canvas: HTMLCanvasElement
	readonly data: Array<Array<number>>
	readonly blockStyles: { [ blockValue: number]: string }
	readonly bgColor: string
	readonly color: string
	readonly rays: IRays
}

export interface IGrid {
	data: Array<Array<number>>
	readonly columnsNumber: number
	readonly linesNumber: number
	blockStyles: { [ blockValue: number]: string }
	bgColor: string
	color: string
	readonly blockHeight: number
	readonly blockWidth: number
	segments: Array<{x1: number, y1: number, x2: number, y2: number}>
	drawGrid (): void
	drawBlocks (): void
	drawSegments (): void
	draw (): void
}