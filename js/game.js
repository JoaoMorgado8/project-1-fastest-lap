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
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.width = 420;
    this.height = 650;
    this.intervalId = null;
    this.car = null;
    this.controls = null;
    this.enemies = [];
    this.frames = 0;
  }

  start() {
    this.car = new Player(this, 200, 450, 50, 50, "purple");
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.car.draw();
  }
}
