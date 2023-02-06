abstract class Box2D {
  constructor(protected ctx: CanvasRenderingContext2D) {}
}

class WordBox extends Box2D {
  id = Math.random();
  width = 200;
  height = 50;
  x = 0;
  y = 0;
  dy = 5;
  c = this.width / 2;
  color = "red";
  constructor(protected ctx: CanvasRenderingContext2D, public text: string) {
    super(ctx);
    this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
  }

  animate = () => {
    const padding_x = 25;
    this.width = this.ctx.measureText(this.text).width;
    this.c = this.x + this.width / 2;
    this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(this.x, this.y, this.width + padding_x, this.height);
    this.ctx.font = "40px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.text, this.x + padding_x / 2, this.y + 40);

    // this.ctx.textAlign = "center";
    this.y += this.dy;
  };
}

export default WordBox;
