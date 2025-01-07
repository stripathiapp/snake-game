const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
let xVelocity = 0;
let yVelocity = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let gameRunning = true;
let speed = 100; // Initial speed in milliseconds
let speedTimer = 7; // Speed increase interval in seconds
let speedFactor = 2; // Multiplier for speed increase
let speedCountdown = speedTimer;

const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("speed-timer");
const restartButton = document.getElementById("restartButton");

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        setTimeout(gameLoop, speed);
    }
}

function update() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

    // Check if the snake hits the border or itself
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= tileCount || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        if (gameRunning) {
            gameRunning = false;
            alert("Game Over! Press Restart or Space to play again.");
        }
        return; // Stop further execution of the update
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
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

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function startSpeedTimer() {
    const timerInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(timerInterval);
            return;
        }

        speedCountdown--;
        timerElement.textContent = `Speed increase in: ${speedCountdown}s`;

        if (speedCountdown === 0) {
            speed /= speedFactor; // Double the speed
            speedCountdown = speedTimer; // Reset the countdown
        }
    }, 1000);
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
        case " ":
            restartGame();
            break;
    }
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    snake = [{ x: 10, y: 10 }];
    xVelocity = 0;
    yVelocity = 0;
    food = { x: 15, y: 15 };
    speed = 100; // Reset speed
    speedCountdown = speedTimer; // Reset countdown
    gameRunning = true;
    timerElement.textContent = `Speed increase in: ${speedCountdown}s`;
    gameLoop();
}

canvas.width = canvas.height = gridSize * tileCount;
startSpeedTimer();
gameLoop();
