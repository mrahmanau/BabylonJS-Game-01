class MainMenu {
  menuContainer: HTMLElement;
  overlay: HTMLElement;

  constructor() {
    // Create an overlay to block game interactions
    this.overlay = document.createElement("div");
    this.overlay.style.position = "fixed";
    this.overlay.style.top = "0";
    this.overlay.style.left = "0";
    this.overlay.style.width = "100%";
    this.overlay.style.height = "100%";
    this.overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.overlay.style.display = "none";

    // Create a container for the main menu
    this.menuContainer = document.createElement("div");
    this.menuContainer.id = "main-menu";
    this.menuContainer.style.position = "absolute";
    this.menuContainer.style.top = "50%";
    this.menuContainer.style.left = "50%";
    this.menuContainer.style.transform = "translate(-50%, -50%)";
    this.menuContainer.style.backgroundColor = "#333";
    this.menuContainer.style.color = "#fff";
    this.menuContainer.style.padding = "30px";
    this.menuContainer.style.borderRadius = "15px";
    this.menuContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.8)";
    this.menuContainer.style.display = "none";

    // Create title
    const title = document.createElement("h1");
    title.textContent = "Babylon Project";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";
    this.menuContainer.appendChild(title);

    // Create start button
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.style.padding = "10px 20px";
    startButton.style.border = "none";
    startButton.style.borderRadius = "5px";
    startButton.style.backgroundColor = "#28a745";
    startButton.style.color = "#fff";
    startButton.style.cursor = "pointer";
    startButton.style.marginBottom = "10px";
    startButton.onclick = () => {
      console.log("Starting Game...");
      this.hide();
      this.enableGame();
    };
    this.menuContainer.appendChild(startButton);

    // Create exit button
    const exitButton = document.createElement("button");
    exitButton.textContent = "Exit";
    exitButton.style.padding = "10px 20px";
    exitButton.style.border = "none";
    exitButton.style.borderRadius = "5px";
    exitButton.style.backgroundColor = "#dc3545";
    exitButton.style.color = "#fff";
    exitButton.style.cursor = "pointer";
    exitButton.onclick = () => {
      console.log("Exiting...");
      this.hide();
    };
    this.menuContainer.appendChild(exitButton);

    // Append menu to the body
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.menuContainer);
  }

  show() {
    console.log("Main Menu is now visible.");
    this.overlay.style.display = "block";
    this.menuContainer.style.display = "block";
    this.overlay.style.pointerEvents = "auto";
  }

  hide() {
    console.log("Main Menu is now hidden.");
    this.overlay.style.display = "none";
    this.menuContainer.style.display = "none";
    this.overlay.style.pointerEvents = "none";
  }

  enableGame() {
    console.log("Game is now enabled.");
    this.startGame(); // Start the game
  }

  startGame() {
    console.log("Initializing game...");
  }
}

export default MainMenu;
