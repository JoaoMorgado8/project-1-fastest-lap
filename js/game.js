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
    this.background = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 420;
    this.height = 650;
    this.intervalId = null;
    //this.milliInterval = 0;
    this.car = null;
    this.controls = null;
    this.enemies = [];
    this.frames = 0;
    this.time = 0;
    this.milliseconds = 0;
    this.speed = 1;
    this.increments = 0;
    this.finish = new Finish(this);
    this.soundEfx = new Audio("./docs/assets/sounds/effect.mp3");
  }

  start() {
    this.car = new Player(this, 175, 550, 80, 100, "purple");
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.soundEfx.play();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
    //this.milliInterval =
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.car.draw();
    this.createObstacles();
    this.enemies.forEach((enemy, i) => {
      if (this.car.y < 160) {
        this.speed = 25;
      } else if (this.car.y < 320) {
        this.speed = 10;
      } else if (this.car.y < 460) {
        this.speed = 5;
      } else this.speed = 1;
      enemy.y += this.speed;

      if (enemy.y > 650) this.enemies.splice(i, 1);
      enemy.draw();
    });
    this.soundEfx.play();
    this.checkCrash();
    this.timer();
    this.increments += this.speed;
    console.log(this.increments);
    if (this.increments >= 23000) {
      this.finish.draw();
      this.finish.y += this.speed;
    }
    this.checkWin();
    this.checkOut();
  }

  checkWin() {
    if (this.car.y <= this.finish.bottom()) {
      this.stop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "rgb(30, 255, 0)";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.font = "32px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`Good job!`, 150, 270);
      this.ctx.font = "30px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`You did it in :${this.time} sec`, 40, 320);
    }
  }

  drawBackground() {
    this.background.src = "./docs/assets/img/race_background.png";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  createObstacles() {
    if (this.car.y < 160) {
      if (this.frames % 50 === 0) {
        this.enemies.push(new Obstacle(this));
      }
    } else if (this.car.y < 320) {
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

  timer() {
    this.time = 0 + Math.floor(this.frames / 60);
    this.milliseconds = this.frames % 1000;
    this.ctx.font = "32px console";
    this.ctx.fillStyle = "#23FE01";
    this.ctx.fillText(`Time: ${this.time}:${this.milliseconds}`, 120, 50);
    if (this.time >= 60) {
      this.stop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.font = "32px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`So slow!`, 150, 270);
      this.ctx.font = "30px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`Try again!`, 130, 320);
    }
  }

  checkOut() {
    if (this.car.y > this.canvas.height) {
      this.stop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.font = "26px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`You spuned out!`, 100, 270);
      this.ctx.font = "30px console";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`Try again!`, 130, 320);
    }
  }

  checkCrash() {
    const player = this.car;

    const crashed = this.enemies.some((enemy, i) => {
      if (player.crashWith(enemy)) {
        this.enemies.splice(i, 1);
      }
      return player.crashWith(enemy);
    });
    if (crashed) {
      this.car.y += 160;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.soundEfx.pause();
  }
}
