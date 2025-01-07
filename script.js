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
    head.x += Math
