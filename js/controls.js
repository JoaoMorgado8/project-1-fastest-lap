class Controls {
  constructor(game) {
    this.game = game;
    this.car = this.game.car;
  }

  keyboardEvents() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          if (this.car.x + this.car.width < 380) {
            this.car.moveRight();
          }
          break;
        case "ArrowLeft":
          if (this.car.x > 20) {
            this.car.moveLeft();
          }
          break;
        case "ArrowUp":
          if (this.car.y > 20) {
            this.car.moveFw();
          }
          break;
        case "ArrowDown":
          if (this.car.y + this.car.height < 630) {
            this.car.moveBw();
          }
          break;
      }
    });
  }
}
