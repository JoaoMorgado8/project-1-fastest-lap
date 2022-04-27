class Player {
  constructor(game, x, y, width, height, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
    //this.color = color;
  }

  draw() {
    this.img.src = "../docs/assets/imgs/minami.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    /* this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height); */
  }

  moveFw() {
    this.y -= 20;
  }

  moveBw() {
    this.y += 20;
  }

  moveLeft() {
    this.x -= 80;
  }
  moveRight() {
    this.x += 80;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

class Obstacle {
  constructor(game) {
    this.game = game;
    this.x = Math.floor(Math.random() * 400);
    this.y = 0;
    this.width = 45;
    this.height = 45;
    this.img = new Image();
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  draw() {
    this.img.src = "../docs/assets/imgs/oil_puddle.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    /* this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height); */
  }
}

class Finish {
  constructor(game) {
    this.game = game;
    this.x = 10;
    this.y = 0;
    this.width = 400;
    this.height = 50;
    this.img = new Image();
  }

  bottom() {
    return this.y + 40;
  }

  draw() {
    this.img.src = "../docs/assets/imgs/finish.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
