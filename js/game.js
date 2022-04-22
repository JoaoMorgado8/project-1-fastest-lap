window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    const game = new Game();
    game.start();
  }
};

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
  }
}
