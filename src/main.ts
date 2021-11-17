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


function init () {
	const mapCanvas: HTMLCanvasElement
		= document.getElementById("map") as HTMLCanvasElement

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
		blockStyles: { 1: "#E40" },
		couleurFond: "#EEE",
		couleurGrille: "#333",
		nbRayons: 10,
		angleRayons: Math.PI * .5
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
			case "ArrowUp": {
				point.deltaAvance = 0
				break
			}
			case "ArrowDown": {
				point.deltaRecule = 0
				break
			}
			case "ArrowLeft": {
				point.deltaPivotGauche = 0
				break
			}
			case "ArrowRight": {
				point.deltaPivotDroite = 0
				break
			}
		}
		evt.preventDefault()
	})
	window.addEventListener("keydown", (evt: KeyboardEvent) => {
		switch (evt.key) {
			case "ArrowUp": {
				point.deltaAvance = 1
				break
			}
			case "ArrowDown": {
				point.deltaRecule = 1
				break
			}
			case "ArrowLeft": {
				point.deltaPivotGauche = 1
				break
			}
			case "ArrowRight": {
				point.deltaPivotDroite = 1
				break
			}
		}
		evt.preventDefault()
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
			point.angle + Math.PI * .25,
			point.angle + Math.PI * 1.75
		)
		grille.dessine()
		point.dessine()
		//console.log(delay)
		lastTime = newTime
		setTimeout(render, delay)
	}

	render()
}

init();