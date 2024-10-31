// knight.ts (similar for archer.ts)
import {
  SpriteManager,
  Vector3,
  StandardMaterial,
  Color3,
  Scene,
  Sprite,
  Mesh,
} from "@babylonjs/core";
import { Character } from "./character";

const maxHealth = 100;
const attackSpeed = 500; // 0.5sec
const moveSpeed = 0.03;
const attackRange = 1.5;
const animationCells = [16, 24];

export class Knight extends Character {
  weaponSprite: Sprite;
  enemyInRange: Mesh[] = [];
  destination: Vector3 = new Vector3(0, 0, 0);

  constructor(team: number, position: Vector3, scene: Scene) {
    super(team, maxHealth, scene);

    // Create Mesh shape
    this.createMesh(position);

    // Create sprite
    this.sprite = this.createSprite("assets/sprites/knight.png", 3, 32, scene);
    this.sprite.playAnimation(
      animationCells[team === 0 ? 1 : 0],
      animationCells[team === 0 ? 1 : 0] + 7,
      true,
      200
    );
    this.weaponSprite = this.createSprite(
      "assets/sprites/R3.png",
      5,
      100,
      scene
    );

    scene.onBeforeRenderObservable.add(() => {
      // Use isDead() method to check if the character is dead
      if (!this.isDead()) {
        // move and update direction
        const direction = this.move();
        this.updateSpritePosition(direction);
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
    const knightMaterial = new StandardMaterial(
      "knightMaterial",
      this.getScene()
    );
    knightMaterial.diffuseColor = new Color3(0.4, 0.3, 0.2);
    this.material = knightMaterial;
  }

  private createSprite(
    imageUrl: string,
    cellWidth: number,
    cellHeight: number,
    scene: Scene
  ): Sprite {
    const spriteManager = new SpriteManager(
      "knightManager",
      imageUrl,
      1,
      { width: cellWidth, height: cellHeight },
      scene
    );
    const sprite = new Sprite("knight", spriteManager);
    sprite.position = this.position;
    return sprite;
  }

  private move(): Vector3 {
    const direction = this.destination.subtract(this.position).normalize();
    this.position.addInPlace(direction.scale(moveSpeed));
    return direction;
  }

  private updateSpritePosition(direction: Vector3) {
    this.sprite.position = this.position;
    this.weaponSprite.position = this.position.add(direction.scale(0.5)); // Position weapon slightly ahead
  }

  protected attack(): void {
    this.enemyInRange.forEach((enemy) => {
      if (Vector3.Distance(this.position, enemy.position) <= attackRange) {
        (enemy as Knight).receiveDamage(10); // Example damage value
      }
    });
  }

  private updateEnemyInRange(): Mesh[] {
    const nearbyEnemies: Mesh[] = [];
    global.arrUnits.forEach((unitArray, index) => {
      if (index !== this.team) {
        unitArray.forEach((enemy) => {
          if (Vector3.Distance(this.position, enemy.position) <= 7) {
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
