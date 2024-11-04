import { StackPanel, Button } from "@babylonjs/gui";
import { setValues, UIManager } from "./ui-manager";

const buttonPanel = new StackPanel();

/**
 * Initializes the ButtonsManager with a given scene.
 */
export class ButtonsManager {
  constructor() {
    // Use the shared advancedTexture from UIManager
    const advancedTexture = UIManager.advancedTexture;

    // Create a stack panel for buttons
    setValues(buttonPanel, "500px", "70px", "10px", "0px", "10px");
    buttonPanel.isVertical = false;
    advancedTexture.addControl(buttonPanel);

    // Create buttons and add them to the panel
    createImageButton("Slime", "assets/images/slime.png");
    createImageButton("Knight", "assets/images/knight.png");
    createImageButton("Archer", "assets/images/archer.png");
    createTextButton("Accelerator", "X1");
  }
}

/**
 * Creates an image button and adds it to the button panel.
 * @param name - The name of the button.
 * @param imageUrl - The URL of the image to be used for the button.
 */
function createImageButton(name: string, imageUrl: string) {
  const button = Button.CreateImageOnlyButton(name, imageUrl);
  setupButton(button, name);
  buttonPanel.addControl(button);
}

/**
 * Creates a text button and adds it to the button panel.
 * @param name - The name of the button.
 * @param buttonText - The text to be displayed on the button.
 */
function createTextButton(name: string, buttonText: string) {
  const button = Button.CreateSimpleButton(name, buttonText);
  button.color = "white";
  button.fontSize = 24;
  button.fontWeight = "700";
  button.paddingLeft = "5px";
  setupButton(button, name);
  buttonPanel.addControl(button);
}

/**
 * Sets up common properties for buttons.
 * @param button - The button to set up.
 * @param name - The name of the button.
 */
function setupButton(button: Button, name: string) {
  setValues(button, "80px", "60px", "10px", "0px", "0px");
  button.background = "#7c746a";
  button.cornerRadius = 16;
  button.onPointerClickObservable.add(() => onButtonClick(name));

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
function onButtonClick(buttonName: string) {
  console.log(`${buttonName} has been clicked`);
}
