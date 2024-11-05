import * as GUI from "@babylonjs/gui";
import { HUD } from "./hud";
import { ButtonsManager } from "./ButtonsManager";
import { StartMenu } from "./StartMenu";
import { PauseMenu } from "./PauseMenu";

/**
 * Manages the UI components of the game.
 */
export class UIManager {
  static advancedTexture: GUI.AdvancedDynamicTexture;

  constructor() {
    // Initialize the advanced texture for UI
    UIManager.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true
    );

    // Instantiate various UI components
    new HUD(); // Initialize HUD
    new ButtonsManager(); // Initialize buttons manager
    new StartMenu(); // Uncomment to initialize StartMenu
    //new PauseMenu(); // Initialize pause menu
  }
}

/**
 * Sets the position and size properties of a UI control.
 * @param control - The GUI control to set values on.
 * @param width - The width of the control.
 * @param height - The height of the control.
 * @param left - The left margin of the control.
 * @param top - The top margin of the control.
 * @param bottom - The bottom padding of the control.
 * @param verticalAlignment - Vertical alignment of the control.
 * @param horizontalAlignment - Horizontal alignment of the control.
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
 * Sets the title properties for a text block.
 * @param title - The text block to set titles on.
 * @param text - The title text.
 */
export function setTitles(title: GUI.TextBlock, text: string) {
  title.text = text;
  title.color = "#94577f"; // Title color
  title.fontSize = 56; // Font size
  title.fontWeight = "700"; // Font weight
  title.height = "100px"; // Height of the title
  title.paddingTop = "16px"; // Top padding
  title.paddingBottom = "16px"; // Bottom padding
  title.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP; // Vertical alignment
}

/**
 * Sets up a button with common properties and events.
 * @param button - The button to set up.
 * @param onClick - The click event handler for the button.
 * @param width - Width of the button.
 * @param height - Height of the button.
 * @param background - Background color of the button.
 * @param textColor - Text color of the button.
 * @param cornerRadius - Corner radius for the button.
 * @param paddingBottom - Bottom padding for the button.
 */
export function setupButton(
  button: GUI.Button,
  onClick: () => void,
  width: string = "200px",
  height: string = "50px",
  background: string = "#292723",
  textColor: string = "white",
  cornerRadius: number = 0,
  paddingBottom: string = "4px"
) {
  // Set button dimensions and alignment
  setValues(
    button,
    width,
    height,
    "0px", // Margin left
    "0px", // Margin top
    "0px", // Margin right
    GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
    GUI.Control.VERTICAL_ALIGNMENT_CENTER
  );

  button.color = textColor; // Set text color
  button.background = background; // Set background color
  button.paddingBottom = paddingBottom; // Set bottom padding

  // Set corner radius if specified
  if (cornerRadius > 0) {
    button.cornerRadius = cornerRadius;
  }

  // Pointer animations for hover effects
  button.pointerEnterAnimation = function () {
    button.background = "#7c746a"; // Hover color
  };

  button.pointerOutAnimation = function () {
    button.background = background; // Reset to default color
  };

  // Attach the click event to the button
  button.onPointerClickObservable.add(onClick);
}
