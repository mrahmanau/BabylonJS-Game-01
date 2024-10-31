import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  FreeCamera,
} from "@babylonjs/core";
import { HUD } from "./UI/hud";
import { Castle } from "./castle";
import { GoldMine } from "./gold-mine";
import { Map } from "./map";
import { ButtonsManager } from "./UI/buttons-manager";

let canvas: HTMLCanvasElement;
let engine: Engine;
export let scene: Scene;

class App {
  constructor() {
    // Create the canvas html element and attach it to the webpage
    canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    // Initialize babylon scene and engine
    engine = new Engine(canvas);
    scene = new Scene(engine);

    // Create a basic camera
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(true);

    // Create a basic light
    const light = new HemisphericLight("light", new Vector3(0, 1, 0.5), scene);
    light.intensity = 0.7;

    // Instantiate the map
    new Map();

    // Instantiate the HUD
    new HUD();

    // Instantiate the player's castle
    new Castle("playersCastle", new Vector3(-14, 0, 14), 0);

    // Instantiate the gold mine next to the player's castle
    new GoldMine("goldMine", new Vector3(-8, 0, 30));

    // Instantiate the enemy's castle
    new Castle("enemiesCastle", new Vector3(14, 0, -14), 1);

    // Instantiate the buttons manager
    new ButtonsManager(scene);

    // Run the render loop to continuously render the scene
    engine.runRenderLoop(function () {
      scene.render();
    });

    return scene;
  }
}

// Resize the engine on window resize
window.addEventListener("resize", function () {
  engine.resize();
});

new App();
