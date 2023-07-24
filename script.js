// create page variables
let canvas = createHiPPICanvas(window.innerWidth, window.innerHeight);
let ctx = canvas.getContext("2d");
const keysPressed = {};
let players = [];

let world = new World();
let player1 = new Player();

let foods = [[100,100],[1000,1000],[750,750]]


// event listeners
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    handlePlayerMovement();
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
    handlePlayerMovement();
});


// IFFE for on load
(function onLoad() {
    player1.draw(ctx)
    player1.edges()
    player1.cameraFollow(ctx)
    player1.update()

    // ctx.fillRect(
    //     window.innerWidth*0.5 - 0.25*window.innerWidth, 
    //     window.innerHeight*0.5 - 0.25*window.innerHeight, 
    //     0.5*window.innerWidth, 
    //     0.5*window.innerHeight
    // );

    for (let food of foods) {
        let x = food[0]
        let y = food[1]

        if (x > player1.camera.startX && 
            x < player1.camera.endX && 
            y > player1.camera.startY && 
            y < player1.camera.endY) {
            ctx.fillStyle='red';
            ctx.fillRect(x-player1.camera.startX , y-player1.camera.startY, 10, 10)
        }
    }

    // ctx.fillRect(
    //     window.innerWidth*0.5 - 0.025*window.innerWidth, 
    //     window.innerHeight*0.5 - 0.025*window.innerHeight, 
    //     0.05*window.innerWidth, 
    //     0.05*window.innerHeight
    // );

})();

// IFFE for animation
(function animation() {
    window.requestAnimationFrame(animation)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    player1.draw(ctx)
    player1.edges()
    player1.cameraFollow(ctx)
    player1.update()
    // ctx.fillRect(
    //     window.innerWidth*0.5 - 0.25*window.innerWidth, 
    //     window.innerHeight*0.5 - 0.25*window.innerHeight, 
    //     0.5*window.innerWidth, 
    //     0.5*window.innerHeight
    // );

    for (let food of foods) {
        let x = food[0]
        let y = food[1]

        if (x > player1.camera.startX && 
            x < player1.camera.endX && 
            y > player1.camera.startY && 
            y < player1.camera.endY) {
            ctx.fillStyle='red';
            ctx.fillRect(x-player1.camera.startX , y-player1.camera.startY, 10,10)
        }
    }
})();


// page functions

// handle player movement
function handlePlayerMovement() {
    const playerSpeed = 5;
    let xDirection = 0;
    let yDirection = 0;

    if (keysPressed['w']) {
        yDirection -= 1;
    }

    if (keysPressed['a']) {
        xDirection -= 1;
    }

    if (keysPressed['s']) {
        yDirection += 1;
    }

    if (keysPressed['d']) {
        xDirection += 1;
    }

    // Normalize diagonal movement
    if (xDirection !== 0 && yDirection !== 0) {
        const diagonalFactor = 0.7071; // 1 / sqrt(2)
        xDirection *= diagonalFactor;
        yDirection *= diagonalFactor;
    }

    // player1.velocity.x = xDirection*playerSpeed + player1.velocity.x / playerSpeed;
    // player1.velocity.y = yDirection*playerSpeed + player1.velocity.y / playerSpeed; 
    player1.velocity.x = xDirection*playerSpeed
    player1.velocity.y = yDirection*playerSpeed
};

// create canvas with the device resolution.
function createHiPPICanvas(width, height) {
    const ratio = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'canvas')
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d").scale(ratio, ratio);
    document.body.appendChild(canvas)
    return canvas;
};