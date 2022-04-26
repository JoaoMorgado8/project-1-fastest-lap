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
    this.finish = [];
  }

  start() {
    this.car = new Player(this, 175, 550, 80, 80, "purple");
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
    this.createObstacles();
    this.enemies.forEach((enemy) => {
      if (this.car.y < 100) {
        enemy.y += 25;
      } else if (this.car.y < 300) {
        enemy.y += 10;
      } else if (this.car.y < 460) {
        enemy.y += 5;
      }
      enemy.y++;
      enemy.draw();
    });
  }

  createObstacles() {
    if (this.car.y < 100) {
      if (this.frames % 50 === 0) {
        this.enemies.push(new Obstacle(this));
      }
    } else if (this.car.y < 300) {
      if (this.frames % 80 === 0) {
        this.enemies.push(new Obstacle(this));
      }
    } else if (this.car.y < 460) {
      if (this.frames % 100 === 0) {
        this.enemies.push(new Obstacle(this));
      }
    }
    if (this.frames % 150 === 0) {
      this.enemies.push(new Obstacle(this));
    }
  }
}
