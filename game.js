const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;  // 700
const HEIGHT = canvas.height; // 400

// Mobil
const carWidth = 50;
const carHeight = 90;
let carX = WIDTH / 2 - carWidth / 2;
let carY = HEIGHT - carHeight - 10;
const carSpeedX = 7;   // ke kiri/kanan
const carSpeedY = 5;   // maju (naik)

// Rintangan
const obstacleWidth = 50;
const obstacleHeight = 90;
let obstacleX = Math.floor(Math.random() * (WIDTH - obstacleWidth));
let obstacleY = -obstacleHeight; // mulai dari atas layar
const obstacleSpeed = 5;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let gameOver = false;

const gameOverScreen = document.getElementById('gameOverScreen');
const restartBtn = document.getElementById('restartBtn');

// Keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') leftPressed = true;
  if (e.key === 'ArrowRight') rightPressed = true;
  if (e.key === 'ArrowUp') upPressed = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') leftPressed = false;
  if (e.key === 'ArrowRight') rightPressed = false;
  if (e.key === 'ArrowUp') upPressed = false;
});

// Gambar mobil
function drawCar() {
  ctx.fillStyle = 'black';
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Gambar rintangan
function drawObstacle() {
  ctx.fillStyle = 'red';
  ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

// Cek tabrakan
function checkCollision() {
  return (
    carX < obstacleX + obstacleWidth &&
    carX + carWidth > obstacleX &&
    carY < obstacleY + obstacleHeight &&
    carY + carHeight > obstacleY
  );
}

// Reset game
function resetGame() {
  gameOver = false;
  carX = WIDTH / 2 - carWidth / 2;
  carY = HEIGHT - carHeight - 10;
  obstacleX = Math.floor(Math.random() * (WIDTH - obstacleWidth));
  obstacleY = -obstacleHeight;
  gameOverScreen.style.display = 'none';
  requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Gerak mobil ke kiri/kanan
  if (leftPressed && carX > 0) carX -= carSpeedX;
  if (rightPressed && carX < WIDTH - carWidth) carX += carSpeedX;

  // Gerak maju (naik)
  if (upPressed && carY > 0) carY -= carSpeedY;

  // Gerak rintangan ke bawah
  obstacleY += obstacleSpeed;
  if (obstacleY > HEIGHT) {
    obstacleY = -obstacleHeight;
    obstacleX = Math.floor(Math.random() * (WIDTH - obstacleWidth));
  }

  drawCar();
  drawObstacle();

  if (checkCollision()) {
    gameOver = true;
    gameOverScreen.style.display = 'block';
  } else {
    requestAnimationFrame(gameLoop);
  }
}

restartBtn.addEventListener('click', resetGame);

// Mulai game
gameLoop();
