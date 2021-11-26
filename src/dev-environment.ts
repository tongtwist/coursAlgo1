import type {
	IRays,
	IPoint,
	IGrille,
	IView3D,
	IKeyboardController,
	IRayCaster
} from "."
import Grille from "./builtins/Grille.js"
import Point from "./builtins/Point.js"
import View3D from "./builtins/View3D.js"
import KeyboardController from "./builtins/KeyboardController.js"
import Rays from "./builtins/Rays.js"
import RayCaster from "./builtins/RayCaster.js"


/**
 * Function init.
 * This function setup the development application with some default parameters.
 *
 * @param mapCanvas { HTMLCanvasElement } HTML Canvas in which to render the world's map grid and to put or remove walls
 * @param viewCanvas { HTMLCanvasElement } HTML Canvas in which to render the "3D" view
 */
function init (
	mapCanvas: HTMLCanvasElement,
	viewCanvas: HTMLCanvasElement
): void {
	const rays: IRays = new Rays({
		angleWidth: Math.PI * .5,
		raysNumber: viewCanvas.width
	})
	const blockStyles = { 1: "#992200" }
	const grille: IGrille = new Grille({
		canvas: mapCanvas,
		data: [
			[1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1],
		],
		blockStyles,
		couleurFond: "#EEE",
		couleurGrille: "#333",
		rays
	})
	const point: IPoint = new Point({
		canvas: mapCanvas,
		x: 93,
		y: 417,
		angle: 0,
		couleur: "#20E",
		rays
	})
	
	const rayCaster: IRayCaster = new RayCaster({ grille, rays })
	const view3D: IView3D = new View3D({
		canvas: viewCanvas,
		blockStyles,
		couleurPlafond: "#223355",
		couleurSol: "#446644",
		rays
	})

	const keyboardController: IKeyboardController = new KeyboardController({
		target: window,
		keydownHandlers: {
			"ArrowUp": () => point.deltaAvance = 1,
			"ArrowDown": () => point.deltaRecule = 1,
			"ArrowLeft": () => point.deltaPivotGauche = 1,
			"ArrowRight": () => point.deltaPivotDroite = 1
		},
		keyupHandlers: {
			"ArrowUp": () => point.deltaAvance = 0,
			"ArrowDown": () => point.deltaRecule = 0,
			"ArrowLeft": () => point.deltaPivotGauche = 0,
			"ArrowRight": () => point.deltaPivotDroite = 0
		},
		preventDefaults: false
	})
	keyboardController.activate()

	const delay: number = Math.floor(1000 / 30)
	let lastTime: number = Date.now()
	function render () {
		const newTime: number = Date.now()
		const delay: number = newTime - lastTime
		point.deplace(delay)
		rayCaster.castAll( point.x, point.y )
		grille.dessine()
		point.dessine()
		view3D.dessine()
		lastTime = newTime
	}
	setInterval(render, delay)
}

init(
	document.getElementById("map") as HTMLCanvasElement,
	document.getElementById("view") as HTMLCanvasElement
)