import { Grille, Point, View3D, KeyboardController, Rays, RayCaster } from "./builtins";
/**
 * Function init.
 * This function setup the development application with some default parameters.
 *
 * @param mapCanvas { HTMLCanvasElement } HTML Canvas in which to render the world's map grid and to put or remove walls
 * @param viewCanvas { HTMLCanvasElement } HTML Canvas in which to render the "3D" view
 */
function init(mapCanvas, viewCanvas) {
    const rays = new Rays({
        angleWidth: Math.PI * .5,
        raysNumber: viewCanvas.width
    });
    const blockStyles = { 1: "#992200" };
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
        rays
    });
    const point = new Point({
        canvas: mapCanvas,
        x: 93,
        y: 417,
        angle: 0,
        couleur: "#20E",
        rays
    });
    const rayCaster = new RayCaster({ grille, rays });
    const view3D = new View3D({
        canvas: viewCanvas,
        blockStyles,
        couleurPlafond: "#223355",
        couleurSol: "#446644",
        rays
    });
    const keyboardController = new KeyboardController({
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
    });
    keyboardController.activate();
    const delay = Math.floor(1000 / 30);
    let lastTime = Date.now();
    function render() {
        const newTime = Date.now();
        const delay = newTime - lastTime;
        point.deplace(delay);
        rayCaster.castAll(point.x, point.y);
        grille.dessine();
        point.dessine();
        view3D.dessine();
        lastTime = newTime;
    }
    setInterval(render, delay);
}
init(document.getElementById("map"), document.getElementById("view"));
//# sourceMappingURL=dev-environment.js.map