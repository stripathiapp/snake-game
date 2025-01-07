const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let angle = Math.random() * 2 * Math.PI; // Initial random direction
let food = { x: Math.floor(Math.random() * tileCount) * gridSize, y: Math.floor(Math.random() * tileCount) * gridSize };
let score = 0;
let gameRunning = false;
let rotationAngle = Math.PI / 18; // Rotation step (10 degrees)

// Game initialization
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

canvas.width = canvas.height = gridSize * tileCount;

// Function to move the snake
function moveSnake() {
    const head = { ...snake[0] };
    head.x += Math.cos(angle) * gridSize;
    head.y += Math.sin(angle) * gridSize;
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * tileCount) * gridSize,
            y: Math.floor(Math.random() * tileCount) * gridSize
        };
    } else {
        snake.pop();
    }
}

// Function to check collisions
function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameRunning = false;
        alert("Game Over! Press Start to play again.");
        resetGame();
    }
}

// Draw the game elements
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        moveSnake();
        checkCollision();
        drawGame();
        setTimeout(gameLoop, 100);
    }
}

// Handle key press for rotation
document.addEventListener("keydown", event => {
    if (gameRunning) {
        if (event.key === "ArrowLeft") {
            angle -= rotationAngle; // Rotate counterclockwise
        } else if (event.key === "ArrowRight") {
            angle += rotationAngle; // Rotate clockwise
        }
    }
});

// Reset the game
function resetGame() {
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    angle = Math.random() * 2 * Math.PI;
    food = { x: Math.floor(Math.random() * tileCount) * gridSize, y: Math.floor(Math.random() * tileCount) * gridSize };
    score = 0;
    startScreen.style.display = "block";
    canvas.style.display = "none";
}

// Start the game when the button is clicked
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    gameLoop();
});
