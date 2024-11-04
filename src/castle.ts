import {
  Mesh,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import { scene } from "./app";
import { Projectile } from "./projectile"; // Import the Projectile class

export class Castle {
  private castleName: string;
  private castlePosition: Vector3;
  private team: number; // Property to associate the castle with a team
  private projectileSpawner: Projectile; // To spawn projectiles
  private range: number = 5; // Define the range within which characters are detected
  private castleMesh: Mesh; // Store the castle mesh for reference

  constructor(name: string, position: Vector3, team: number) {
    this.castleName = name;
    this.castlePosition = position;
    this.team = team;
    this.projectileSpawner = new Projectile(scene); // Initialize projectile spawner

    this.castleMesh = this.createCastleMesh(); // Create the castle mesh
    this.startSpawning(); // Start spawning projectiles
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

    // Set the position of the entire castle mesh once, to keep it static
    castleMesh.position = this.castlePosition;

    return castleMesh; // Return the complete castle mesh
  }

  private startSpawning() {
    // Spawn projectiles based on character proximity
    setInterval(() => {
      this.spawnProjectiles();
    }, 2000); // Every 2 seconds
  }

  private spawnProjectiles() {
    const nearbyCharacters = this.detectNearbyCharacters();

    // Spawn projectiles only if there are nearby characters
    if (nearbyCharacters.length > 0) {
      // Iterate over nearby characters
      nearbyCharacters.forEach((character) => {
        const startPosition = this.castlePosition.add(new Vector3(0, 1, 0)); // Starting slightly above the castle
        const targetPosition = character.position; // The target character's position

        if (this.team === 1) {
          // Spawn spheres for the enemy characters
          this.projectileSpawner.spawnSphere(startPosition, targetPosition);
        } else if (this.team === 0) {
          // Spawn arrows for the player's characters
          this.projectileSpawner.spawnArrow(startPosition, targetPosition);
        }
      });
    }
  }

  private detectNearbyCharacters() {
    const characters = global.arrUnits.flat(); // Assuming global.arrUnits contains all characters
    return characters.filter((character) => {
      const distance = Vector3.Distance(
        this.castlePosition,
        character.position
      );
      return distance <= this.range; // Filter characters within the range
    });
  }
}
