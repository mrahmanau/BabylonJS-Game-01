import {
  Vector3,
  Scene,
  Mesh,
  Sprite,
  SpriteManager,
  MeshBuilder,
} from "@babylonjs/core";
import { Character } from "./character";
import { CASTLE } from "./global";

export class Knight extends Character {
  constructor(team: number, position: Vector3, scene: Scene) {
    super(team, position, scene);

    // Create Mesh shape
    this.createMesh(position, scene);

    // Create sprite for the knight
    this.sprite = this.createSprite("assets/sprites/knight.png", 3, 32, scene);
    this.sprite.playAnimation(
      this.animationCells[team === 0 ? 1 : 0],
      this.animationCells[team === 0 ? 1 : 0] + 7,
      true,
      200
    );

    this.weaponSprite = this.createSprite(
      "assets/images/weapon_sprite.png", // Assuming knight's weapon
      5,
      100,
      scene
    );

    // Character behavior
    scene.onBeforeRenderObservable.add(() => {
      if (this.health <= 0) {
        this.die();
      } else {
        const direction = this.move(this.destination);
        this.updateSpritePosition(direction);
        this.updateHealthBar();
      }
    });

    setInterval(() => {
      this.attack();
      this.detectEnemies(global.arrUnits[this.team === 0 ? 1 : 0]);
      this.destination = this.updateDestination();
    }, this.attackSpeed);
  }

  // Specific methods for Knight

  createMesh(position: Vector3, scene: Scene) {
    // Create a new mesh for the Knight
    const mesh = MeshBuilder.CreateBox("knightMesh", { size: 0.5 }, scene);

    // Set mesh properties
    mesh.position = position;
    mesh.visibility = 0.1; // Make the mesh more transparent
    mesh.checkCollisions = true;
    mesh.ellipsoid = new Vector3(0.1, 0.1, 0.1);

    // Store the mesh in the Knight instance for reference
    this.mesh = mesh;
  }

  createSprite(
    spriteUrl: string,
    capacity: number,
    cellSize: number,
    scene: Scene
  ): Sprite {
    const spriteManagerPlayer = new SpriteManager(
      "knightManager",
      spriteUrl,
      capacity,
      cellSize,
      scene
    );
    return new Sprite("knightSprite", spriteManagerPlayer);
  }

  attack() {
    let curEnemy: Character | null = null;
    for (const enemy of this.enemyInRange) {
      const distance = Vector3.Distance(this.position, enemy.position);
      if (distance < this.attackRange) {
        enemy.takeDamage(10); // Simulate damage to the enemy
        curEnemy = enemy;
      }
    }

    // Play attack animation based on whether an enemy is in range
    if (curEnemy === null) {
      this.weaponSprite.playAnimation(0, 0, true, 200); // Idle animation
    } else {
      this.weaponSprite.playAnimation(3, 5, true, 200); // Attack animation
    }
  }

  takeDamage() {
    if (this.mesh.visibility > 0.5) {
      const damage = Math.ceil((this.mesh.visibility - 0.5) * 100);
      this.health = Math.max(0, this.health - damage);
      this.mesh.visibility = 0.5;
    }
  }

  die() {
    const index = global.arrUnits[this.team].indexOf(this);
    if (index !== -1) {
      global.arrUnits[this.team].splice(index, 1);
    }
    this.mesh.dispose();
    this.sprite.dispose();
    this.weaponSprite.dispose();
  }

  updateEnemyInRange(): Mesh[] {
    const enemyInRange: Mesh[] = [];
    for (const enemyMesh of global.arrUnits[this.team === 0 ? 1 : 0]) {
      const distance = Vector3.Distance(this.position, enemyMesh.position);
      if (distance < this.seeEnemyRange) {
        enemyInRange.push(enemyMesh);
      }
    }
    return enemyInRange;
  }

  updateDestination(): Vector3 {
    if (this.enemyInRange.length <= 0) {
      return CASTLE.positions[this.team === 0 ? 1 : 0];
    }
    return this.enemyInRange[0].position;
  }

  updateSpritePosition(direction: Vector3) {
    const xDirection = direction.x > 0 ? 1 : -1;
    this.sprite.invertU = xDirection <= 0;
    this.weaponSprite.invertU = xDirection <= 0;
    this.sprite.position = this.position;
    this.weaponSprite.position = this.position.subtract(
      new Vector3(-xDirection * 0.2, -0.1, 0)
    );
  }
}
