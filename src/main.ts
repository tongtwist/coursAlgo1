import {
//	IGrilleConfig,
	IGrille,
	Grille
} from "./Grille.js"
import {
//	IPointConfig,
	IPoint,
	Point
} from "./Point.js"
import {
	IView3D,
	View3D
} from "./View3D.js"


function init () {
	const mapCanvas: HTMLCanvasElement
		= document.getElementById("map") as HTMLCanvasElement
	const viewCanvas: HTMLCanvasElement
		= document.getElementById("view") as HTMLCanvasElement

	const blockStyles = { 1: "rgba(238,68,0,1.0)" }
	const view3D: IView3D = new View3D({
		canvas: viewCanvas,
		blockStyles,
		couleurPlafond: "#223344",
		couleurSol: "#448844"
	})
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
		nbRayons: viewCanvas.width,
		angleRayons: Math.PI * .5,
		vue: view3D
	})
	const point: IPoint = new Point({
		canvas: mapCanvas,
		x: 93,
		y: 417,
		angle: 0,
		couleur: "#20E"
	})

	window.addEventListener("keyup", (evt: KeyboardEvent) => {
		switch (evt.key) {
			case "ArrowUp": point.deltaAvance = 0;break;
			case "ArrowDown": point.deltaRecule = 0;break;
			case "ArrowLeft": point.deltaPivotGauche = 0;break;
			case "ArrowRight": point.deltaPivotDroite = 0;break;
		}
		//evt.preventDefault()
	})
	window.addEventListener("keydown", (evt: KeyboardEvent) => {
		switch (evt.key) {
			case "ArrowUp": point.deltaAvance = 1;break;
			case "ArrowDown": point.deltaRecule = 1;break;
			case "ArrowLeft": point.deltaPivotGauche = 1;break;
			case "ArrowRight": point.deltaPivotDroite = 1;break;
		}
		//evt.preventDefault()
	})

	const delay: number = Math.floor(1000 / 30)
	let lastTime: number = Date.now()
	function render () {
		const newTime: number = Date.now()
		const delay: number = newTime - lastTime
		point.deplace(delay)
		grille.lanceRayons(
			point.x,
			point.y,
			point.angle
		)
		grille.dessine()
		point.dessine()
		view3D.dessine()
		
		//console.log(delay)
		lastTime = newTime
	}
	setInterval(render, delay)
}

init();