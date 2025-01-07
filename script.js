const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let angle = Math.random() * 2 * Math.PI; // Initial random direction
let food = { x: Math.floor(Math.random() * tileCount) * gridSize, y: Math.floor(Math.random() * tileCount) * gridSize };
let score = 0;
let gameRunning = false;
let countdown = 3; // Countdown before the game starts
let rotationAngle = Math.PI / 18; // Rotation step (10 degrees)

// Display initial game rules
const rulesElement = document.getElementById("rules");
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
        alert("Game Over! Press any arrow key to restart.");
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

// Countdown before game starts
function startCountdown() {
    if (countdown > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
        countdown--;
        setTimeout(startCountdown, 1000);
    } else {
        gameRunning = true;
        gameLoop();
    }
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
    if (!gameRunning && countdown === 3) {
        rulesElement.style.display = "none";
        startCountdown();
        return;
    }

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
    countdown = 3;
    rulesElement.style.display = "block";
}
