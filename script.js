const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: gridSize, y: 0 };
let food = getRandomFoodPosition();
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.getElementById('high-score').innerText = `High Score: ${highScore}`;

function gameLoop() {
    if (isGameOver()) {
        alert('Game Over');
        resetGame();
        return;
    }

    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift(newHead);
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        food = getRandomFoodPosition();
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            document.getElementById('high-score').innerText = `High Score: ${highScore}`;
        }
    } else {
        snake.pop();
        snake.unshift(newHead);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function getRandomFoodPosition() {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 };
    food = getRandomFoodPosition();
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

document.getElementById('up').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -gridSize };
});
document.getElementById('down').add
::contentReference[oaicite:0]{index=0}
 
