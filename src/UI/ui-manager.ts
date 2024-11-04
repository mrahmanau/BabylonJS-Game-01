import * as GUI from "@babylonjs/gui";
import { ButtonsManager } from "./buttons-manager";
import { HUD } from "./hud";
import { Scene } from "@babylonjs/core";

export class UIManager {
  static advancedTexture: GUI.AdvancedDynamicTexture;

  constructor(scene: Scene) {
    // Initialize the advanced texture for the UI
    UIManager.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      scene
    );

    // Create the HUD and ButtonsManager, both using the shared advancedTexture
    new HUD();
    new ButtonsManager();
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
