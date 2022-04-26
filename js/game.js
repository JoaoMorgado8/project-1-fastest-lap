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
    this.toClean = [];
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
    this.enemies.forEach((enemy, i) => {
      if (this.car.y < 100) {
        enemy.y += 25;
      } else if (this.car.y < 300) {
        enemy.y += 10;
      } else if (this.car.y < 460) {
        enemy.y += 5;
      } else enemy.y++;

      if (enemy.y > 650) this.enemies.splice(i, 1);
      enemy.draw();
    });
    this.checkCrash();
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

  //counter() {}

  //createFinish() {}

  checkCrash() {
    //const car = this.car;
    /* this.enemies.forEach((enemy) => {
      if (this.car.crashWith(enemy)) {
        //console.log(this.toClean);
        this.toClean.unshift(enemy);
      }
    });
    console.log(this.toClean);
    this.toClean = [];
  } */

    const player = this.car;

    const crashed = this.enemies.some((enemy, i) => {
      if (player.crashWith(enemy)) {
        console.log("antes", this.enemies);
        this.enemies.splice(i, 1);
        console.log("depois", this.enemies);
      }
      return player.crashWith(enemy);
    });
    if (crashed) {
      this.car.y += 100;
    }
  }

  /* slowDown() {
    if()
    this.car.y += 5;
  } // the player when */ //crashed with the obstacle, should be draged along with it,  but still be able to escape when moveFw()
  // also when the player escapes the object, the moveBw() or the y++ should stop

  stop() {
    clearInterval(this.intervalId);
  }
}
