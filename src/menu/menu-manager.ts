import MainMenu from "./main-menu";
import PauseMenu from "./pause-menu";
import WinScreen from "./win-menu";
import GameOverScreen from "./win-menu";

// Enum representing the different menu types in the game.
enum MenuType {
  Main = "MainMenu",
  Pause = "PauseMenu",
  Win = "WinScreen",
  GameOver = "GameOverScreen",
}

// Singleton class that manages different game menus.
class MenuManager {
  // Static instance of MenuManager for Singleton pattern
  static instance: MenuManager | null = null;

  // Active menu currently being displayed
  activeMenu: MenuType | null = null;

  // Instances of each menu
  mainMenu: MainMenu = new MainMenu();
  pauseMenu: PauseMenu = new PauseMenu();
  winScreen: WinScreen = new WinScreen();
  gameOverScreen: GameOverScreen = new GameOverScreen();

  // Private constructor for singleton implementation.
  private constructor() {}

  /**
   * Returns the singleton instance of MenuManager.
   * @returns MenuManager - The singleton instance of the MenuManager.
   */
  static getInstance(): MenuManager {
    if (!MenuManager.instance) {
      MenuManager.instance = new MenuManager();
    }
    return MenuManager.instance;
  }

  /**
   * Shows the specified menu and hides all other menus.
   * @param menuType - The type of menu to show.
   */
  showMenu(menuType: MenuType): void {
    const { mainMenu, pauseMenu, winScreen, gameOverScreen } = this; // Destructure for readability
    this.hideAllMenus();
    this.activeMenu = menuType;

    switch (menuType) {
      case MenuType.Main:
        mainMenu.show();
        break;
      case MenuType.Pause:
        pauseMenu.show();
        break;
      case MenuType.Win:
        winScreen.show();
        break;
      case MenuType.GameOver:
        gameOverScreen.show();
        break;
      default:
        console.warn("Invalid menu type");
        break;
    }
  }

  /**
   * Hides all menus and resets the active menu.
   */
  hideAllMenus(): void {
    const { mainMenu, pauseMenu, winScreen, gameOverScreen } = this;
    mainMenu.hide();
    pauseMenu.hide();
    winScreen.hide();
    gameOverScreen.hide();
    this.activeMenu = null;
  }
}

export { MenuManager, MenuType };
