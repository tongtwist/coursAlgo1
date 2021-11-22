import {
	IGrille,
	Grille
} from "./Grille.js"
import {
	IPoint,
	Point
} from "./Point.js"
import {
	IView3D,
	View3D
} from "./View3D.js"
import {
	IKeyboardController,
	KeyboardController
} from "./KeyboardController.js"
import {
	IRays,
	Rays
} from "./Rays.js"
import {
	IRayCaster,
	RayCaster
} from "./RayCaster.js"


function init () {
	const mapCanvas: HTMLCanvasElement
		= document.getElementById("map") as HTMLCanvasElement
	const viewCanvas: HTMLCanvasElement
		= document.getElementById("view") as HTMLCanvasElement

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
		/*grille.lanceRayons(
			point.x,
			point.y,
			point.angle
		)*/
		grille.dessine()
		point.dessine()
		view3D.dessine()
		//console.log(delay)
		lastTime = newTime
	}
	setInterval(render, delay)
}

init();