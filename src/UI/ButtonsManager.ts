import { StackPanel, Button } from "@babylonjs/gui";
import { setupButton, setValues, UIManager } from "./UIManager";

/**
 * Manages the creation and handling of buttons in the UI.
 */
export class ButtonsManager {
  private buttonPanel: StackPanel;

  constructor() {
    // Access the shared advanced texture from UIManager
    const advancedTexture = UIManager.advancedTexture;

    // Create and set up the button panel
    this.buttonPanel = new StackPanel();
    setValues(this.buttonPanel, "500px", "70px", "10px", "0px", "10px");
    this.buttonPanel.isVertical = false; // Arrange buttons horizontally
    advancedTexture.addControl(this.buttonPanel); // Add button panel to advanced texture

    this.createCharacterSelectionButtons(); // Create character selection buttons
  }

  /**
   * Creates an exit button and adds it to the button panel.
   * @param onClick - The event handler for the button click.
   */
  public createExitButton(onClick: () => void) {
    const exitButton = Button.CreateSimpleButton("exitButton", "Exit");
    setupButton(exitButton, onClick); // Use default values for exit button
    this.buttonPanel.addControl(exitButton); // Add exit button to the panel
  }

  /**
   * Creates buttons for character selection and adds them to the UI.
   */
  public createCharacterSelectionButtons() {
    const advancedTexture = UIManager.advancedTexture;

    // Define characters with their images and click handlers
    const characters = [
      {
        name: "Slime",
        imageUrl: "assets/images/slime.png",
        onClick: () => this.onCharacterSelect("Slime"),
      },
      {
        name: "Knight",
        imageUrl: "assets/images/knight.png",
        onClick: () => this.onCharacterSelect("Knight"),
      },
      {
        name: "Archer",
        imageUrl: "assets/images/archer.png",
        onClick: () => this.onCharacterSelect("Archer"),
      },
      {
        name: "X1",
        buttonText: "X1",
        onClick: () => this.onCharacterSelect("Accelerator"),
      },
    ];

    // Create a panel for character buttons
    const characterPanel = new StackPanel();
    setValues(characterPanel, "500px", "70px", "10px", "0px", "10px");
    characterPanel.isVertical = false; // Arrange character buttons horizontally
    advancedTexture.addControl(characterPanel); // Add character panel to advanced texture

    // Iterate through characters and create buttons
    characters.forEach(({ name, imageUrl, onClick }) => {
      let button;
      if (imageUrl) {
        // Create image button if an image URL is provided
        button = Button.CreateImageOnlyButton(name, imageUrl);
      } else {
        // Create simple button if no image URL is provided
        button = Button.CreateSimpleButton(name, name);
        button.color = "white"; // Set button text color
        button.fontSize = "24px"; // Set font size
        button.fontWeight = "700"; // Set font weight
        button.paddingLeft = "5px"; // Set left padding
      }

      // Setup character buttons with specific dimensions
      setupButton(button, onClick, "80px", "60px", "#7c746a", "white", 16); // Specific for character buttons
      characterPanel.addControl(button); // Add button to character panel
    });
  }

  /**
   * Handles character selection.
   * @param characterName - The name of the selected character.
   */
  private onCharacterSelect(characterName: string) {
    console.log(`${characterName} has been selected`); // Log the character selection
  }
}
