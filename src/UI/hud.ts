import * as GUI from "@babylonjs/gui";
import { ARCHER, COIN, KNIGHT } from "../global";
import { setValues, UIManager } from "./UIManager";

let coinCounterText: GUI.TextBlock;
let knightCounterText: GUI.TextBlock;
let archerCounterText: GUI.TextBlock;

/**
 * Manages the heads-up display (HUD) elements.
 */
export class HUD {
  constructor() {
    // Use the shared advancedTexture from UIManager
    const advancedTexture = UIManager.advancedTexture;

    // Create castle1 health bar
    createHealthBar("10px", "10px", "0px", advancedTexture);

    // Create counters for coins, knights, and archers between the health bars
    coinCounterText = createCounter(
      "240px",
      "10px",
      "assets/images/coin.png",
      "0px",
      advancedTexture
    );
    knightCounterText = createCounter(
      "360px",
      "10px",
      "assets/images/knight.png",
      "0px",
      advancedTexture
    );
    archerCounterText = createCounter(
      "480px",
      "10px",
      "assets/images/archer.png",
      "0px",
      advancedTexture
    );

    // Create castle2 health bar
    createHealthBar("600px", "10px", "0px", advancedTexture);

    // Update counters for testing purposes
    updateCoinCounter();
    updateArchersCounter();
    updateKnightsCounter();
  }
}

/**
 * Creates a health bar at a specified position.
 * @param left - The left offset for positioning the health bar.
 * @param top - The top offset for positioning the health bar.
 * @param bottom - The bottom offset for positioning the health bar.
 * @returns The created health bar slider.
 */
function createHealthBar(
  left: string,
  top: string,
  bottom: string,
  advancedTexture: GUI.AdvancedDynamicTexture
) {
  const healthBar = new GUI.Slider();
  setValues(
    healthBar,
    "200px",
    "40px",
    left,
    top,
    bottom,
    GUI.Control.VERTICAL_ALIGNMENT_TOP
  );
  healthBar.displayThumb = false;
  healthBar.color = "green";
  healthBar.background = "red";
  healthBar.value = 100;
  healthBar.minimum = 0;
  healthBar.maximum = 100;
  healthBar.isVertical = false;
  advancedTexture.addControl(healthBar);
  return healthBar;
}

/**
 * Creates a counter with an image and text at a specified position.
 * @param left - The left offset for positioning the counter.
 * @param top - The top offset for positioning the counter.
 * @param imageUrl - The URL of the image to be used in the counter.
 * @param bottom - The bottom offset for positioning the counter.
 * @returns The created text block for the counter.
 */
function createCounter(
  left: string,
  top: string,
  imageUrl: string,
  bottom: string,
  advancedTexture: GUI.AdvancedDynamicTexture
) {
  const counter = new GUI.StackPanel();
  setValues(
    counter,
    "200px",
    "40px",
    left,
    top,
    bottom,
    GUI.Control.VERTICAL_ALIGNMENT_TOP
  );
  counter.isVertical = false;

  // Add image to the counter
  const image = new GUI.Image("counterImage", imageUrl);
  setValues(image, "40px", "40px", "0px", "0px", "0px");
  counter.addControl(image);

  // Add text block to display the count
  const scoreText = new GUI.TextBlock();
  scoreText.text = "0";
  scoreText.fontSize = "32px";
  scoreText.color = "white";
  setValues(scoreText, "50px", "40px", "0px", "0px", "0px");
  counter.addControl(scoreText);

  advancedTexture.addControl(counter);
  return scoreText;
}

/** Updates the coin counter text. */
function updateCoinCounter() {
  coinCounterText.text = COIN.count.toString();
}

/** Updates the knights counter text. */
function updateKnightsCounter() {
  knightCounterText.text = KNIGHT.count.toString();
}

/** Updates the archers counter text. */
function updateArchersCounter() {
  archerCounterText.text = ARCHER.count.toString();
}
