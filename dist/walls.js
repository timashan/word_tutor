class Wall {
    constructor(id, ctx, x, y) {
        this.id = id;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
    }
    draw() {
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(this.x, this.y - this.h, this.w, this.h);
    }
    check(box) {
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
