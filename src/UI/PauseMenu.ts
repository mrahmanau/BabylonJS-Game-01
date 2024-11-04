import * as GUI from "@babylonjs/gui";
import { setTitles, setupButton, setValues, UIManager } from "./UIManager";

/**

 * Manages the pause menu

 */

export class PauseMenu {
  constructor() {
    // Use the shared advancedTexture from UIManager

    const advancedTexture = UIManager.advancedTexture;

    createPauseMenu(advancedTexture);
  }
}

function createPauseMenu(advancedTexture: GUI.AdvancedDynamicTexture) {
  const pauseMenu = new GUI.StackPanel();

  pauseMenu.background = "#454747";

  setValues(
    pauseMenu,
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

  setTitles(title, "Game Paused");

  pauseMenu.addControl(title);

  // Create and add the resume button

  const resumeButton = GUI.Button.CreateSimpleButton("resumeButton", "Resume");

  setupButton(resumeButton);

  pauseMenu.addControl(resumeButton);

  resumeButton.onPointerClickObservable.add(() => {
    onButtonClick("resumeButton");
  });

  // Create and add the exit button

  const exitButton = GUI.Button.CreateSimpleButton("exitButton", "Exit");

  setupButton(exitButton);

  pauseMenu.addControl(exitButton);

  exitButton.onPointerClickObservable.add(() => {
    onButtonClick("exitButton");
  });

  advancedTexture.addControl(pauseMenu);
}

/**

 * Handles button click events

 * @param buttonName - The name of the button that was clicked

 */

function onButtonClick(buttonName: string) {
  if (buttonName === "resumeButton") {
    console.log(`${buttonName} has been clicked`);
  } else if (buttonName === "exitButton") {
    console.log(`${buttonName} has been clicked`);
  }
}
