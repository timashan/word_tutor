import WordBox from "./wordbox.js";

class Wall {
  w = 100;
  h = 100;
  constructor(
    public id: number,
    public ctx: CanvasRenderingContext2D,
    public x: number,
    private y: number
  ) {}

  draw() {
    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(this.x, this.y - this.h, this.w, this.h);
  }

  check(box: WordBox) {
    if (box.y > this.y - this.h && box.c > this.x && box.c < this.x + 100) {
      console.log("yes");
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x, this.y - this.h, this.w, this.h);
      return this.id;
    }
    return null;
  }
}

export default Wall;
