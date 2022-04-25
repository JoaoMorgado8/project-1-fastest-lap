class Player {
  constructor(game, x, y, width, height, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    //this.ctx.fillStyle(this.color);
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveFw() {
    this.y -= 10;
    this.speedY -= 1;
  }

  moveBw() {
    this.y += 10;
    this.speedY += 1;
  }

  moveLeft() {
    this.x -= 10;
  }
  moveRight() {
    this.x += 10;
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
    this.y + this.height;
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
