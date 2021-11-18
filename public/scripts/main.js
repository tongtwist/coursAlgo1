import { Grille } from "./Grille.js";
import { Point } from "./Point.js";
import { View3D } from "./View3D.js";
function init() {
    const mapCanvas = document.getElementById("map");
    const viewCanvas = document.getElementById("view");
    const blockStyles = { 1: "rgba(238,68,0,1.0)" };
    const view3D = new View3D({
        canvas: viewCanvas,
        blockStyles,
        couleurPlafond: "#223344",
        couleurSol: "#448844"
    });
    const grille = new Grille({
        canvas: mapCanvas,
        data: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        blockStyles,
        couleurFond: "#EEE",
        couleurGrille: "#333",
        nbRayons: viewCanvas.width,
        angleRayons: Math.PI * .5,
        vue: view3D
    });
    const point = new Point({
        canvas: mapCanvas,
        x: 93,
        y: 417,
        angle: 0,
        couleur: "#20E"
    });
    window.addEventListener("keyup", (evt) => {
        switch (evt.key) {
            case "ArrowUp":
                point.deltaAvance = 0;
                break;
            case "ArrowDown":
                point.deltaRecule = 0;
                break;
            case "ArrowLeft":
                point.deltaPivotGauche = 0;
                break;
            case "ArrowRight":
                point.deltaPivotDroite = 0;
                break;
        }
        //evt.preventDefault()
    });
    window.addEventListener("keydown", (evt) => {
        switch (evt.key) {
            case "ArrowUp":
                point.deltaAvance = 1;
                break;
            case "ArrowDown":
                point.deltaRecule = 1;
                break;
            case "ArrowLeft":
                point.deltaPivotGauche = 1;
                break;
            case "ArrowRight":
                point.deltaPivotDroite = 1;
                break;
        }
        //evt.preventDefault()
    });
    const delay = Math.floor(1000 / 30);
    let lastTime = Date.now();
    function render() {
        const newTime = Date.now();
        const delay = newTime - lastTime;
        point.deplace(delay);
        grille.lanceRayons(point.x, point.y, point.angle);
        grille.dessine();
        point.dessine();
        view3D.dessine();
        //console.log(delay)
        lastTime = newTime;
    }
    setInterval(render, delay);
}
init();
//# sourceMappingURL=main.js.map