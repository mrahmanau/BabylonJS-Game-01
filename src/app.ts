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
import { Castle } from "./castle";
import { GoldMine } from "./gold-mine";
import { UIManager } from "./UI/ui-manager";
import { Knight } from "./knight";
import { Archer } from "./archer";

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
    // new Map();

    // Instantiate the player's castle
    new Castle("playersCastle", new Vector3(-14, 0, 14), 0);

    // Instantiate the gold mine next to the player's castle
    new GoldMine("goldMine", new Vector3(-8, 0, 30));

    // Instantiate the enemy's castle
    new Castle("enemiesCastle", new Vector3(14, 0, -14), 1);

    // Instantiate the UI Manager
    new UIManager(scene);

    // Initialize arrUnits for both teams
    global.arrUnits = [[], []]; // Ensure this line is called before creating Knights

    // Initialize Knight characters for both teams
    // const knightTeam0Position = new Vector3(-12, 0, 12);
    // new Knight(0, knightTeam0Position, scene);

    // const knightTeam1Position = new Vector3(12, 0, -12);
    // new Knight(1, knightTeam1Position, scene);

    const archerTeam0Position = new Vector3(-12, 0, 12);
    new Archer(0, archerTeam0Position, scene);

    const archerTeam1Position = new Vector3(12, 0, -12);
    new Archer(1, archerTeam1Position, scene);

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
