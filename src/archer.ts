import {
  SpriteManager,
  Vector3,
  StandardMaterial,
  Color3,
  Scene,
  Mesh,
  Sprite,
} from "@babylonjs/core";
import { Character } from "./character";

const maxHealth = 80; // Archer has slightly less health
const attackSpeed = 1000; // 1 second for ranged attack
const moveSpeed = 0.02; // Slightly slower than knight
const attackRange = 5; // Longer range for archers
const animationCells = [32, 40]; // Example sprite animation cells

export class Archer extends Character {
  enemyInRange: Mesh[] = [];
  destination: Vector3 = new Vector3(0, 0, 0);

  constructor(team: number, position: Vector3, scene: Scene) {
    super(team, maxHealth, scene);

    // Create Mesh shape
    this.createMesh(position);

    // Create sprite
    this.sprite = this.createSprite("assets/sprites/archer.png", 3, 32, scene);
    this.sprite.playAnimation(
      animationCells[team === 0 ? 1 : 0],
      animationCells[team === 0 ? 1 : 0] + 7,
      true,
      200
    );

    scene.onBeforeRenderObservable.add(() => {
      // Check if the character is dead
      if (!this.isDead()) {
        // Move and update direction
        this.move();
        this.updateSpritePosition(); // Remove direction as it is not used now
      }
    });

    // Create abilities attack
    setInterval(() => {
      this.attack();
      this.enemyInRange = this.updateEnemyInRange();
      this.destination = this.updateDestination();
    }, attackSpeed);
  }

  private createMesh(position: Vector3) {
    this.position = position;
    const archerMaterial = new StandardMaterial(
      "archerMaterial",
      this.getScene()
    );
    archerMaterial.diffuseColor = new Color3(0.5, 0.2, 0.1); // Change color for archer
    this.material = archerMaterial;
  }

  private createSprite(
    imageUrl: string,
    cellWidth: number,
    cellHeight: number,
    scene: Scene
  ): Sprite {
    const spriteManager = new SpriteManager(
      "archerManager",
      imageUrl,
      1,
      { width: cellWidth, height: cellHeight },
      scene
    );
    const sprite = new Sprite("archer", spriteManager);
    sprite.position = this.position;
    return sprite;
  }

  private move(): Vector3 {
    const direction = this.destination.subtract(this.position).normalize();
    this.position.addInPlace(direction.scale(moveSpeed));
    return direction;
  }

  private updateSpritePosition() {
    this.sprite.position = this.position;
  }

  protected attack(): void {
    this.enemyInRange.forEach((enemy) => {
      if (Vector3.Distance(this.position, enemy.position) <= attackRange) {
        (enemy as Character).receiveDamage(8); // Example damage value
      }
    });
  }

  private updateEnemyInRange(): Mesh[] {
    const nearbyEnemies: Mesh[] = [];
    global.arrUnits.forEach((unitArray, index) => {
      if (index !== this.team) {
        unitArray.forEach((enemy) => {
          if (Vector3.Distance(this.position, enemy.position) <= attackRange) {
            nearbyEnemies.push(enemy);
          }
        });
      }
    });
    return nearbyEnemies;
  }

  private updateDestination(): Vector3 {
    if (this.enemyInRange.length > 0) {
      return this.enemyInRange[0].position;
    }
    return this.position;
  }
}
