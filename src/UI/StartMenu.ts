import * as GUI from "@babylonjs/gui";

/**
 * Manages the start menu
 */

import { setTitles, setupButton, setValues, UIManager } from "./UIManager";

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

  setTitles(title, "Babylon Game");

  startMenu.addControl(title);

  // Create and add the start button

  const startButton = GUI.Button.CreateSimpleButton(
    "startButton",
    "Start Game"
  );

  setupButton(startButton);

  startMenu.addControl(startButton);

  startButton.onPointerClickObservable.add(() => {
    onButtonClick("startButton");
  });

  // Create and add the exit button

  const exitButton = GUI.Button.CreateSimpleButton("exitButton", "Exit");

  setupButton(exitButton);

  startMenu.addControl(exitButton);

  exitButton.onPointerClickObservable.add(() => {
    onButtonClick("exitButton");
  });

  advancedTexture.addControl(startMenu);
}

/**

 * Handles button click events

 * @param buttonName - The name of the button that was clicked

 */

function onButtonClick(buttonName: string) {
  if (buttonName === "startButton") {
    console.log(`${buttonName} has been clicked`);
  } else if (buttonName === "exitButton") {
    console.log(`${buttonName} has been clicked`);

    window.close();
  }
}
