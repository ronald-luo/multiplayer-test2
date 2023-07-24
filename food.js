class Food {
    constructor() {
        this.x = 2*Math.random() * window.innerWidth;
        this.y = 2*Math.random() * window.innerHeight;
    }

    draw(ctx, player) {
        ctx.fillStyle='red';
        ctx.fillRect(this.x-player.camera.startX , this.y-player.camera.startY, 10, 10)
    }

}