import * as GUI from "@babylonjs/gui";
import { setTitles, setupButton, setValues, UIManager } from "./UIManager";

/**
 * Manages the start menu
 */
export class StartMenu {
  constructor() {
    // Use the shared advancedTexture from UIManager
    const advancedTexture = UIManager.advancedTexture;

    createStartMenu(advancedTexture);
  }
}

/**
 * Creates the start menu UI
 * @param advancedTexture - The advanced texture to add the start menu to
 */
function createStartMenu(advancedTexture: GUI.AdvancedDynamicTexture) {
  const startMenu = new GUI.StackPanel();

  // Specific styling for startMenu
  startMenu.background = "#454747";
  setValues(
    startMenu,
    "500px",
    "300px",
    "0px",
    "0px",
    "0px",
    GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
    GUI.Control.VERTICAL_ALIGNMENT_CENTER
  );

  // Create and add the title
  const title = new GUI.TextBlock();
  setTitles(title, "Babylon Game"); // Assuming you have a setTitles function defined elsewhere
  startMenu.addControl(title);

  // Create and add the start button
  const startButton = GUI.Button.CreateSimpleButton(
    "startButton",
    "Start Game"
  );
  setupButton(startButton, handleStartButtonClick); // Use the setupButton function
  startMenu.addControl(startButton);

  // Create and add the exit button using ButtonsManager
  const exitButton = GUI.Button.CreateSimpleButton("exitButton", "Exit");
  setupButton(exitButton, handleExitButtonClick); // Use the setupButton function
  startMenu.addControl(exitButton);

  // Add the start menu to the advanced texture
  advancedTexture.addControl(startMenu);
}

/**
 * Handles the start button click event
 */
function handleStartButtonClick() {
  console.log("startButton has been clicked");
}

/**
 * Handles the exit button click event
 */
function handleExitButtonClick() {
  console.log("exitButton has been clicked");
  window.close(); // This will attempt to close the window, which may not work in all browsers
}
