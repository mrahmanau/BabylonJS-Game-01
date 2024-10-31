import * as GUI from "@babylonjs/gui";
export class HUD {
  private advancedTexture: GUI.AdvancedDynamicTexture;

  public castle1HealthBar: GUI.Slider;
  public castle2HealthBar: GUI.Slider;
  public coinCounter: GUI.StackPanel;
  public knightCounter: GUI.StackPanel;
  public archerCounter: GUI.StackPanel;

  constructor() {
    // Create the AdvancedDynamicTexture
    this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Create and add health bars
    this.castle1HealthBar = this.createHealthBar("10px", "10px");
    this.castle2HealthBar = this.createHealthBar("220px", "10px");

    // Create and add counters
    this.coinCounter = this.createCounter(
      "360px",
      "16px",
      "assets/images/coin.png"
    );

    this.knightCounter = this.createCounter(
      "400px",
      "16px",
      "assets/images/knight.png"
    );

    this.archerCounter = this.createCounter(
      "440px",
      "16px",
      "assets/images/archer.png"
    );
  }

  private createHealthBar(left: string, top: string): GUI.Slider {
    const healthBar = new GUI.Slider();
    healthBar.height = "40px";
    healthBar.width = "200px";
    healthBar.color = "green";
    healthBar.background = "red";
    healthBar.thumbColor = "darkgreen";
    healthBar.isThumbCircle = true;
    healthBar.isThumbClamped = true;
    healthBar.value = 100;
    healthBar.minimum = 0;
    healthBar.maximum = 100;
    healthBar.isVertical = false;
    healthBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healthBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    healthBar.left = left;
    healthBar.top = top;
    this.advancedTexture.addControl(healthBar);

    return healthBar;
  }

  private createCounter(
    left: string,
    top: string,
    imageUrl: string
  ): GUI.StackPanel {
    const counter = new GUI.StackPanel();
    counter.width = "200px";
    counter.height = "30px";
    counter.isVertical = false;
    counter.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    counter.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    counter.left = left;
    counter.top = top;
    const image = new GUI.Image("counterImage", imageUrl);
    image.width = "30px";
    image.height = "30px";
    counter.addControl(image);
    const scoreText = new GUI.TextBlock();
    scoreText.text = "0";
    scoreText.width = "50px";
    scoreText.height = "30px";
    scoreText.color = "white";
    scoreText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    scoreText.paddingLeft = "10px";
    counter.addControl(scoreText);
    this.advancedTexture.addControl(counter);

    return counter;
  }
}
