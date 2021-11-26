import Grille from "./builtins/Grid.js";
import Point from "./builtins/Point.js";
import View3D from "./builtins/View3D.js";
import KeyboardController from "./builtins/KeyboardController.js";
import Rays from "./builtins/Rays.js";
import RayCaster from "./builtins/RayCaster.js";
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
    const grid = new Grille({
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
        bgColor: "#EEE",
        color: "#333",
        rays
    });
    const point = new Point({
        canvas: mapCanvas,
        x: 93,
        y: 417,
        angle: 0,
        color: "#20E",
        rays
    });
    const rayCaster = new RayCaster({ grid, rays });
    const view3D = new View3D({
        canvas: viewCanvas,
        blockStyles,
        ceilColor: "#223355",
        groundColor: "#446644",
        rays
    });
    const keyboardController = new KeyboardController({
        target: window,
        keydownHandlers: {
            "ArrowUp": () => point.deltaGoForward = 1,
            "ArrowDown": () => point.deltaGoBackward = 1,
            "ArrowLeft": () => point.deltaLeftRotation = 1,
            "ArrowRight": () => point.deltaRightRotation = 1
        },
        keyupHandlers: {
            "ArrowUp": () => point.deltaGoForward = 0,
            "ArrowDown": () => point.deltaGoBackward = 0,
            "ArrowLeft": () => point.deltaLeftRotation = 0,
            "ArrowRight": () => point.deltaRightRotation = 0
        },
        preventDefaults: false
    });
    keyboardController.activate();
    const delay = Math.floor(1000 / 30);
    let lastTime = Date.now();
    function render() {
        const newTime = Date.now();
        const delay = newTime - lastTime;
        point.move(delay);
        rayCaster.castAll(point.x, point.y);
        grid.draw();
        point.draw();
        view3D.draw();
        lastTime = newTime;
    }
    setInterval(render, delay);
}
init(document.getElementById("map"), document.getElementById("view"));
//# sourceMappingURL=dev-environment.js.map