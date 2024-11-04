import { StackPanel, Button } from "@babylonjs/gui";
import { setValues, UIManager } from "./UIManager";

//const buttonPanel = new StackPanel();

/**
 * Initializes the ButtonsManager with a given scene.
 */
export class ButtonsManager {
  private buttonPanel: StackPanel;

  constructor() {
    // Access the shared advancedTexture from UIManager
    const advancedTexture = UIManager.advancedTexture;

    // Initialize a stack panel to hold buttons
    this.buttonPanel = new StackPanel();
    setValues(this.buttonPanel, "500px", "70px", "10px", "0px", "10px");
    this.buttonPanel.isVertical = false;
    advancedTexture.addControl(this.buttonPanel);

    // Create buttons
    this.createImageButton("Slime", "assets/images/slime.png");
    this.createImageButton("Knight", "assets/images/knight.png");
    this.createImageButton("Archer", "assets/images/archer.png");
    this.createTextButton("Accelerator", "X1");
  }

  /**
   * Creates an image button and adds it to the button panel.
   * @param name - The name of the button.
   * @param imageUrl - The URL of the image to be used for the button.
   */
  private createImageButton(name: string, imageUrl: string) {
    const button = Button.CreateImageOnlyButton(name, imageUrl);
    this.setupButton(button, name);
    this.buttonPanel.addControl(button);
  }

  /**
   * Creates a text button and adds it to the button panel.
   * @param name - The name of the button.
   * @param buttonText - The text to be displayed on the button.
   */
  private createTextButton(name: string, buttonText: string) {
    const button = Button.CreateSimpleButton(name, buttonText);
    button.color = "white";
    button.fontSize = 24;
    button.fontWeight = "700";
    button.paddingLeft = "5px";
    this.setupButton(button, name);
    this.buttonPanel.addControl(button);
  }

  /**
   * Sets up common properties and animations for buttons.
   * @param button - The button to set up.
   * @param name - The name of the button.
   */
  private setupButton(button: Button, name: string) {
    setValues(button, "80px", "60px", "10px", "0px", "0px");
    button.background = "#7c746a";
    button.cornerRadius = 16;
    button.onPointerClickObservable.add(() => this.onButtonClick(name));

    // Define hover animations
    button.pointerEnterAnimation = () => {
      button.background = "#292723";
    };
    button.pointerOutAnimation = () => {
      button.background = "#7c746a";
    };
  }

  /**
   * Handles button click events.
   * @param buttonName - The name of the button that was clicked.
   */
  private onButtonClick(buttonName: string) {
    console.log(`${buttonName} has been clicked`);
  }
}
