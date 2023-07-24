class Player {
    constructor() {
        this.position = new Vector(
            Math.random()*window.innerWidth,
            Math.random()*window.innerHeight,
        );
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxVelocity = 20;
        this.camera = new Camera(this.position);
    }

    edges() {
        let minX = 0;
        let minY = 0;
        let maxX = window.innerWidth;
        let maxY = window.innerHeight;

        if (this.position.x <= minX) {
            this.position.x = minX;
        } else if (this.position.x >= maxX - 10) {
            this.position.x = maxX - 10;
        }
    
        if (this.position.y <= minY) {
            this.position.y = minY;
        } else if (this.position.y >= maxY - 10) {
            this.position.y = maxY - 10;
        }
    } 

    cameraFollow() {
        let minX = window.innerWidth*0.5 - 0.25*window.innerWidth;
        let minY = window.innerHeight*0.5 - 0.25*window.innerHeight;
        let maxX = 0.5*window.innerWidth + 0.25*window.innerWidth;
        let maxY = 0.5*window.innerHeight + 0.25*window.innerHeight;

        if (this.position.x <= minX + 50) {
            this.camera.updateCamera(new Vector(5, 0));
        } else if (this.position.x >= maxX - 50) {
            this.camera.updateCamera(new Vector(-5, 0));
        }
    
        if (this.position.y <= minY + 50) {
            this.camera.updateCamera(new Vector(0, 5));
        } else if (this.position.y >= maxY - 50) {
            this.camera.updateCamera(new Vector(0, -5));
        }
    }

    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    draw(ctx) {
        ctx.fillStyle='black';
        ctx.fillRect(this.position.x, this.position.y,10,10);
    }
}
