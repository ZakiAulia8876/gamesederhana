const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ukuran mobil dan rintangan (dalam proporsi relatif)
let carWidth = 50;
let carHeight = 90;
let carX, carY;
let carSpeedX = 7;
let carSpeedY = 5;

let obstacleWidth = 50;
let obstacleHeight = 90;
let obstacleX, obstacleY;
let obstacleSpeed = 5;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let gameOver = false;

const gameOverScreen = document.getElementById('gameOverScreen');
const restartBtn = document.getElementById('restartBtn');

// Fungsi resize agar responsive
function resizeCanvas() {
  const containerWidth = canvas.parentElement.clientWidth;
  canvas.width = containerWidth;
  canvas.height = containerWidth * 9 / 16;

  // Skala ulang berdasarkan canvas baru
  carWidth = canvas.width * 0.07;
  carHeight = canvas.height * 0.22;
  obstacleWidth = carWidth;
  obstacleHeight = carHeight;

  resetGame(); // reset ulang posisi
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // panggil saat pertama kali

function drawCar() {
  ctx.fillStyle = 'black';
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacle() {
  ctx.fillStyle = 'red';
  ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

function checkCollision() {
  return (
    carX < obstacleX + obstacleWidth &&
    carX + carWidth > obstacleX &&
    carY < obstacleY + obstacleHeight &&
    carY + carHeight > obstacleY
  );
}

function resetGame() {
  gameOver = false;
  carX = canvas.width / 2 - carWidth / 2;
  carY = canvas.height - carHeight - 10;
  obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
  obstacleY = -obstacleHeight;
  gameOverScreen.style.display = 'none';
  requestAnimationFrame(gameLoop);
}

// Keyboard controls
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

// Touch controls
canvas.addEventListener('touchstart', (e) => {
  const touchX = e.touches[0].clientX;
  if (touchX < window.innerWidth / 3) leftPressed = true;
  else if (touchX > window.innerWidth * 2 / 3) rightPressed = true;
  else upPressed = true;
});

canvas.addEventListener('touchend', () => {
  leftPressed = false;
  rightPressed = false;
  upPressed = false;
});

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (leftPressed && carX > 0) carX -= carSpeedX;
  if (rightPressed && carX < canvas.width - carWidth) carX += carSpeedX;
  if (upPressed && carY > 0) carY -= carSpeedY;

  obstacleY += obstacleSpeed;
  if (obstacleY > canvas.height) {
    obstacleY = -obstacleHeight;
    obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
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
gameLoop();
