import * as GUI from "@babylonjs/gui";
import { HUD } from "./hud";
import { ButtonsManager } from "./ButtonsManager";
import { PauseMenu } from "./PauseMenu";

export class UIManager {
  static advancedTexture: GUI.AdvancedDynamicTexture;

  constructor() {
    // Initialize the advanced texture for the UI
    UIManager.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true
    );

    // Create the HUD and ButtonsManager, both using the shared advancedTexture
    new HUD();
    new ButtonsManager();
    //new StartMenu();
    new PauseMenu();
  }
}

/**
 * Sets common properties for UI elements, such as width, height, and positioning.
 * @param control - The UI control to apply properties to.
 * @param width - Width of the control.
 * @param height - Height of the control.
 * @param left - Left offset of the control.
 * @param top - Top offset of the control.
 * @param bottom - Bottom offset of the control.
 * @param verticalAlignment - Optional vertical alignment.
 * @param horizontalAlignment - Optional horizontal alignment.
 */
export function setValues(
  control: GUI.Control,
  width: string,
  height: string,
  left: string,
  top: string,
  bottom: string,
  verticalAlignment: number = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
  horizontalAlignment: number = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
) {
  control.width = width;
  control.height = height;
  control.left = left;
  control.top = top;
  control.paddingBottom = bottom;
  control.verticalAlignment = verticalAlignment;
  control.horizontalAlignment = horizontalAlignment;
}

/**

 * Sets the properties of a GUI TextBlock element.

 * 

 * @param {GUI.TextBlock} title - The TextBlock element to be styled.

 * @param {string} text - The text content to be set for the TextBlock.

 */

export function setTitles(title: GUI.TextBlock, text: string) {
  title.text = text;

  title.color = "#94577f";

  title.fontSize = 56;

  title.fontWeight = "700";

  title.height = "100px";

  title.paddingTop = "16px";

  title.paddingBottom = "16px";

  title.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
}

/**

 * Sets up a button with common properties and event handlers.

 * @param button - The button to set up.

 * @param name - The name of the button.

 */

export function setupButton(button: GUI.Button) {
  setValues(
    button,
    "200px",
    "50px",
    "0px",
    "0px",
    "0px",
    GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
    GUI.Control.VERTICAL_ALIGNMENT_CENTER
  );

  button.color = "white";

  button.background = "#292723";

  button.paddingBottom = "4px";

  button.pointerEnterAnimation = function () {
    button.background = "#7c746a";
  };

  button.pointerOutAnimation = function () {
    button.background = "#292723";
  };
}
