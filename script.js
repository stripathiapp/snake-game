const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
let xVelocity = 0;
let yVelocity = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case "ArrowDown":
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
        case "ArrowLeft":
            if (xVelocity === 0) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case "ArrowRight":
            if (xVelocity === 0) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
    }
});

canvas.width = canvas.height = gridSize * tileCount;
gameLoop();