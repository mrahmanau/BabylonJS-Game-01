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
  enemyInRange: Character[] = []; // Changed from Mesh[] to Character[]
  animationCells = [16, 24];
  attackSpeed = 500; // 0.5 sec
  attackRange = 1.5;
  seeEnemyRange = 7;
  mesh: Mesh;

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

    healthBar.parent = healthBarContainer;
    healthBarContainer.parent = this.mesh;
    this.healthBar = healthBarContainer;
    return healthBarContainer;
  }

  // Move character toward a destination
  move(destination: Vector3) {
    const direction = destination
      .subtract(this.position)
      .normalize()
      .scale(moveSpeed);
    this.position.addInPlace(direction);
    this.mesh.position.copyFrom(this.position);

    if (this.healthBar) {
      this.healthBar.position.x = this.position.x;
      this.healthBar.position.z = this.position.z;
      this.healthBar.position.y = 0.5;
    }
    return direction;
  }

  // Update health bar scaling based on health
  updateHealthBar() {
    const percentage = this.health / maxHealth;
    this.healthBar.scaling.x = percentage;
  }

  // Take damage and check if character should die
  takeDamage(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    } else {
      this.updateHealthBar();
    }
  }

  // Attack logic - checks if enemies are in range and deals damage
  attack() {
    if (this.enemyInRange.length > 0) {
      this.enemyInRange.forEach((enemy) => {
        enemy.takeDamage(10); // Deals 10 damage to each enemy in range
      });
    }
  }

  // Detects enemies within `seeEnemyRange`
  detectEnemies(enemies: Character[]) {
    this.enemyInRange = enemies.filter((enemy) => {
      const distance = Vector3.Distance(this.position, enemy.position);
      return distance <= this.seeEnemyRange;
    });
  }

  // Handle character death
  die() {
    const index = global.arrUnits[this.team].indexOf(this);
    if (index > -1) {
      global.arrUnits[this.team].splice(index, 1);
    }
    this.mesh.dispose();
    console.log("Character has died.");
  }
}
