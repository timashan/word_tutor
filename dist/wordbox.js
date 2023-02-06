class Box2D {
    constructor(ctx) {
        this.ctx = ctx;
    }
}
class WordBox extends Box2D {
    constructor(ctx, text) {
        super(ctx);
        this.ctx = ctx;
        this.text = text;
        this.id = Math.random();
        this.width = 200;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.dy = 5;
        this.c = this.width / 2;
        this.color = "red";
        this.animate = () => {
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
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width));
    }
}
export default WordBox;
