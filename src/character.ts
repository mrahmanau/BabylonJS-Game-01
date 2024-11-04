import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene,
  Sprite,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

// Constants
const maxHealth = 100;
const moveSpeed = 0.03;

// Base Character Class
export class Character {
  team: number;
  health: number = maxHealth;
  position: Vector3;
  destination: Vector3 = new Vector3(0, 0, 0);
  healthBar: Mesh;
  sprite: Sprite;
  weaponSprite: Sprite;
  enemyInRange: Mesh[] = [];
  animationCells = [16, 24];
  attackSpeed = 500; // 0.5 sec
  attackRange = 1.5;
  seeEnemyRange = 7;
  mesh: Mesh; // Add a mesh property

  constructor(team: number, position: Vector3, scene: Scene) {
    this.team = team;
    this.position = position;

    // Update global unit array
    global.arrUnits[team].push(this);

    // Create health bar
    this.healthBar = this.createHealthBar(scene);
  }

  createHealthBar(scene: Scene): Mesh {
    const greenMat = new StandardMaterial("hb1mat", scene);
    greenMat.diffuseColor = Color3.Green();
    greenMat.backFaceCulling = false;

    const grayMat = new StandardMaterial("hb2mat", scene);
    grayMat.diffuseColor = Color3.Gray();
    grayMat.backFaceCulling = false;

    const healthBar = MeshBuilder.CreatePlane(
      "hb1",
      { width: 0.5, height: 0.1 },
      scene
    );
    healthBar.material = greenMat;
    healthBar.position.z = 0.01; // Slightly offset in front

    const healthBarContainer = MeshBuilder.CreatePlane(
      "hb2",
      { width: 0.5, height: 0.1 },
      scene
    );
    healthBarContainer.material = grayMat;
    healthBarContainer.position = new Vector3(0, 1, 0); // Adjust height relative to character

    // Parent the health bar to the container
    healthBar.parent = healthBarContainer;
    // Parent the health bar container to the character mesh
    healthBarContainer.parent = this.mesh;
    this.healthBar = healthBarContainer; // Keep reference to the health bar container for updates
    return healthBarContainer; // Return the container
  }

  // Shared method to move character
  move(destination: Vector3) {
    const direction = destination
      .subtract(this.position)
      .normalize()
      .scale(moveSpeed);
    this.position.addInPlace(direction); // Update character position
    this.mesh.position.copyFrom(this.position); // Move the character mesh

    // Update health bar position relative to character
    if (this.healthBar) {
      this.healthBar.position.x = this.position.x; // Match x position
      this.healthBar.position.z = this.position.z; // Match z position
      this.healthBar.position.y = 0.5; // Keep height at 1 relative to the character
    }
    return direction;
  }

  // Shared method to update health bar
  updateHealthBar() {
    const percentage = this.health / maxHealth;
    this.healthBar.scaling.x = percentage; // Scale health bar based on health
    //this.healthBar.position.x = (1 - percentage) * 0.25; // Adjust position based on health
  }

  // Abstract methods for specific actions (can be overridden)
  attack() {}
  die() {}
  takeDamage() {}
}
