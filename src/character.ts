// character.ts
import {
  Mesh,
  Sprite,
  StandardMaterial,
  Color3,
  MeshBuilder,
  Scene,
} from "@babylonjs/core";

export abstract class Character extends Mesh {
  team: number;
  healthBar: Mesh;
  sprite: Sprite;
  health: number;
  maxHealth: number;

  constructor(team: number, maxHealth: number, scene: Scene) {
    super("Character", scene);
    this.team = team;
    this.maxHealth = maxHealth;
    this.health = maxHealth;

    // Create health bar
    this.healthBar = this.createHealthBar(scene);
  }

  protected createHealthBar(scene: Scene): Mesh {
    const healthBar = MeshBuilder.CreateBox(
      "healthBar",
      { width: 1, height: 0.1, depth: 0.1 },
      scene
    );
    const healthMaterial = new StandardMaterial("healthMat", scene);
    healthMaterial.diffuseColor = Color3.Green();
    healthBar.material = healthMaterial;
    healthBar.parent = this;
    healthBar.position.y = 1.5; // Position it above the character's head
    return healthBar;
  }

  // Method to receive damage
  receiveDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.die(); // Call die() to handle death logic
    }
    this.updateHealthBar();
  }

  protected updateHealthBar() {
    const healthRatio = this.health / this.maxHealth;
    (this.healthBar.material as StandardMaterial).diffuseColor = Color3.Lerp(
      Color3.Red(),
      Color3.Green(),
      healthRatio
    );
    this.healthBar.scaling.x = healthRatio;
  }

  protected abstract attack(): void; // Abstract method to be implemented by derived classes

  // Change the return type of die() to boolean
  protected die(): boolean {
    this.dispose();
    this.sprite.dispose();
    this.healthBar.dispose();
    return true; // Indicate the character is dead
  }

  // Add a method to check if the character is dead
  public isDead(): boolean {
    return this.health <= 0;
  }
}
