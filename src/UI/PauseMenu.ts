import { setTitles, setupButton, setValues, UIManager } from "./UIManager";
import * as GUI from "@babylonjs/gui";

/**
 * Manages the pause menu.
 */
export class PauseMenu {
  constructor() {
    const advancedTexture = UIManager.advancedTexture;
    this.createMenu(advancedTexture, "Game Paused", [
      { name: "Resume", onClick: handleResumeClick },
      { name: "Exit", onClick: handleExitClick },
    ]);
  }

  /**
   * Creates the pause menu UI.
   * @param advancedTexture - The advanced texture to add the pause menu to.
   * @param titleText - The title text for the menu.
   * @param buttons - The array of buttons to create.
   */
  createMenu(
    advancedTexture: GUI.AdvancedDynamicTexture,
    titleText: string,
    buttons: { name: string; onClick: () => void }[]
  ) {
    const panel = new GUI.StackPanel();
    panel.background = "#454747";
    setValues(
      panel,
      "500px",
      "300px",
      "0px",
      "0px",
      "0px",
      GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
      GUI.Control.VERTICAL_ALIGNMENT_CENTER
    );

    const title = new GUI.TextBlock();
    setTitles(title, titleText);
    panel.addControl(title);

    buttons.forEach(({ name, onClick }) => {
      const button = GUI.Button.CreateSimpleButton(name, name);
      setupButton(button, onClick); // Use the shared setupButton function
      panel.addControl(button);
    });

    advancedTexture.addControl(panel);
  }
}

/**
 * Handles the Resume button click event.
 */
function handleResumeClick() {
  console.log("Resume clicked");
  // Logic to resume the game goes here
}

/**
 * Handles the Exit button click event.
 */
function handleExitClick() {
  console.log("Exit clicked");
  // Logic to exit the game goes here
}
