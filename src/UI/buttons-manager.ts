import {
  AdvancedDynamicTexture,
  Button,
  Control,
  StackPanel,
} from "@babylonjs/gui";
import { Scene, Vector3 } from "@babylonjs/core";
import { Projectile } from "../projectile";

export class ButtonsManager {
  private ui: AdvancedDynamicTexture;
  private buttonPanel: StackPanel;
  private projectile: Projectile;

  constructor(scene: Scene) {
    // Initialize the Projectile class
    this.projectile = new Projectile(scene);
    // Create a full-screen UI texture to hold buttons
    this.ui = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    // Create a panel to hold buttons in a horizontal stack at the bottom left
    this.buttonPanel = new StackPanel();
    this.buttonPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.buttonPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.buttonPanel.width = "500px"; // Adjust width to fit buttons
    this.buttonPanel.height = "60px"; // Adjust height
    this.buttonPanel.paddingBottom = "10px";
    this.buttonPanel.isVertical = false; // Ensure the stack is horizontal
    this.ui.addControl(this.buttonPanel);

    // Create buttons
    this.createImageButton("Slime", "assets/images/archer.png");
    this.createImageButton("Knight", "assets/images/knight.png");
    this.createImageButton("Archer", "assets/images/archer.png");
    this.createTextButton("X1", () => this.onAcceleratorClick()); // X1 button
    this.createTextButton("Castle1", () => this.onCastleClick("Castle1")); // Castle1 button
    this.createTextButton("Castle2", () => this.onCastleClick("Castle2")); // Castle2 button
  }

  private createImageButton(name: string, imageUrl: string) {
    // Create a button with an image
    const button = Button.CreateImageOnlyButton(name, imageUrl);
    button.width = "80px";
    button.height = "60px";
    button.thickness = 0;
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.onPointerClickObservable.add(() => this.onButtonClick(name));

    // Add button to the panel
    this.buttonPanel.addControl(button);
  }

  private createTextButton(text: string, callback: () => void) {
    // Create a text button for the accelerator
    const button = Button.CreateSimpleButton("button-" + text, text); // Ensure unique IDs for buttons
    button.width = "60px";
    button.height = "60px";
    button.color = "white"; // Text color
    button.fontSize = 24; // Adjust font size for better visibility
    button.onPointerClickObservable.add(callback);
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    // Add button to the panel
    this.buttonPanel.addControl(button);
  }

  private onButtonClick(buttonName: string) {
    // Handle logic for each button click
    console.log(`${buttonName} button clicked`);
    // Add logic to spawn the corresponding character, etc.
  }

  private onAcceleratorClick() {
    // Handle logic for the accelerator (X1) button click
    console.log("Accelerator (X1) button clicked");
    // Implement logic to accelerate gameplay or effects here
  }

  private onCastleClick(castleName: string) {
    // Handle logic for Castle buttons click
    console.log(`${castleName} button clicked`);

    const spawnPosition = new Vector3(0, 1, 0); // Set a position where the projectile will spawn

    if (castleName === "Castle1") {
      this.projectile.spawnSphere(spawnPosition); // Spawn sphere for Castle1
    } else if (castleName === "Castle2") {
      this.projectile.spawnArrow(spawnPosition); // Spawn arrow for Castle2
    }
  }
}
