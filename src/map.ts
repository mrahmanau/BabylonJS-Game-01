import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { scene } from "./app";

export class Map {
  constructor() {
    buildGround(scene);
  }
}

/**
 * Function to create the ground.
 * @param scene - The Babylon.js scene where the ground will be added.
 */

function buildGround(scene: Scene) {
  // Create static meshes for the ground and obstacles
  createStaticMesh(scene);
  const groundMat = new StandardMaterial("groundMat");
  groundMat.diffuseColor = new Color3(0, 0.6, 0.1);

  // Create ground from height map
  const groundFromHM = MeshBuilder.CreateGroundFromHeightMap(
    "groundFromHM",
    "/assets/heightmap.png",
    {
      height: 50,
      width: 50,
      subdivisions: 13,
      minHeight: 0,
      maxHeight: 2,
    },
    scene
  );

  groundFromHM.material = groundMat;
  groundFromHM.material.wireframe = true;
  console.log("height map instantiated");
}

/**

 * Function to create walls.
 * @param width - The width of the wall.
 * @param height - The height of the wall.
 * @param position - The position of the wall in the scene.
 * @param rotation - The rotation of the wall.
 * @returns - The wall.
 */

function createWalls(
  width: number,
  height: number,
  position: Vector3,
  rotation: Vector3
) {
  const wall = MeshBuilder.CreateBox("wall", { width, height }, scene);
  wall.position = position;
  wall.rotation = rotation;
  return wall;
}

// Function to create obstacles
function createObstacles() {
  const waypoints = [
    new Vector3(-10, -1, 29),
    new Vector3(-15, 0, -1),
    new Vector3(11, 0, -11),
    new Vector3(13, 0, -12),
    new Vector3(14, -1, -15),
  ];

  const walls = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];
    const direction = end.subtract(start).normalize();
    const distance = Vector3.Distance(start, end);

    for (let j = 0; j < distance; j += 1) {
      const position = start.add(direction.scale(j));
      walls.push(
        createWalls(1, 1, position.add(new Vector3(6, 0.75, 1)), Vector3.Zero())
      );

      walls.push(
        createWalls(
          1,
          0.5,
          position.add(new Vector3(-2, 1.5, -1)),
          Vector3.Zero()
        )
      );
    }
  }

  return walls;
}

/**

 * Function to create static meshes for the ground and obstacles
 * @param scene - The Babylon.js scene where the static mesh will be added.
 * @returns - The static mesh
 */

function createStaticMesh(scene: Scene) {
  const groundMesh = Mesh.CreateGround("ground1", 100, 100, 0, scene);
  const obstacles = createObstacles();
  const mesh = Mesh.MergeMeshes([groundMesh, ...obstacles]);
  mesh.position = new Vector3(0, -0.5, 0);

  return mesh;
}
