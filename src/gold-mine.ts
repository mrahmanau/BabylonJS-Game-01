import {
  Color3,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

let goldMineName: string;

let goldMinePosition: Vector3;

export class GoldMine {
  /**

     * Creates an instance of GoldMine.

     * @param name - The name of the goldmine

     * @param position - The position of the gold mine in the scene.

     * @param scene - The Babylon.js scene where the gold mine will be added.

     */

  constructor(name: string, position: Vector3) {
    goldMineName = name;

    goldMinePosition = position;

    createGoldMineMesh();
  }
}

// Creates and adds the gold mine mesh to the scene.

function createGoldMineMesh() {
  const goldMineMaterial = new StandardMaterial("goldMineMat");

  goldMineMaterial.diffuseColor = new Color3(1, 0.84, 0);

  // Create a cylindrical mesh to represent the gold mine

  const goldMine = MeshBuilder.CreateCylinder(goldMineName, {
    diameter: 10,

    height: 1,
  });

  goldMine.material = goldMineMaterial;

  goldMine.position = goldMinePosition;
}
