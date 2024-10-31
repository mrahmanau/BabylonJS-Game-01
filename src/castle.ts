import {
  Mesh,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import { scene } from "./app";

export class Castle {
  private castleName: string;
  private castlePosition: Vector3;
  private team: number; // New property to associate the castle with a team

  constructor(name: string, position: Vector3, team: number) {
    this.castleName = name;
    this.castlePosition = position;
    this.team = team;

    this.createCastleMesh();
  }

  private createCastleMesh() {
    // Create a parent mesh to hold all parts of the castle
    const castleMesh = new Mesh(this.castleName);

    // Create the main building of the castle
    const mainBuilding = MeshBuilder.CreateBox(
      this.castleName + "_mainBuilding",
      {
        width: 3,
        height: 2,
        depth: 3,
      }
    );

    // Set the color based on the team
    const castleMaterial = new StandardMaterial("castleMaterial", scene);
    castleMaterial.diffuseColor =
      this.team === 0 ? new Color3(0.1, 0.5, 0.1) : new Color3(0.5, 0.1, 0.1);
    mainBuilding.material = castleMaterial;

    // Position the main building at the center
    mainBuilding.position = new Vector3(0, 1, 0);

    // Set the main building as a child of the castle mesh
    mainBuilding.parent = castleMesh;

    // Define the size of the towers
    const towerSize = { diameter: 1, height: 3 };

    // Define the positions for the towers at the corners of the main building
    const towerPositions = [
      new Vector3(-1.5, 1.5, -1.5),
      new Vector3(1.5, 1.5, -1.5),
      new Vector3(-1.5, 1.5, 1.5),
      new Vector3(1.5, 1.5, 1.5),
    ];

    // Create and position each tower
    towerPositions.forEach((pos, index) => {
      const tower = MeshBuilder.CreateCylinder(
        this.castleName + "_tower" + index,
        towerSize
      );
      tower.position = pos;
      tower.parent = castleMesh;
    });

    // Set the position of the entire castle
    castleMesh.position = this.castlePosition;

    // Return the complete castle mesh
    return castleMesh;
  }
}
