let snake = [{ x: 0, y: 0 }];
let direction = { x: 1, y: 0 };
let food = { x: 10, y: 5 };
let score = 0;
let gridSize = 20;
let gameOver = false;
const cellSize = 20;
const containerWidth = 500;
const containerHeight = 500;
const maxX = containerWidth / cellSize;
const maxY = containerHeight / cellSize;
let gameInterval;

document.getElementById("start-button").addEventListener("click", () => {
  clearInterval(gameInterval); // Stop previous game loop
  resetGame();
  gameInterval = setInterval(gameLoop, 150);
});

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "Score: " + score;
  draw();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction.y !== 1) direction = { x: 0, y: -1 };
  else if (event.key === "ArrowDown" && direction.y !== -1)
    direction = { x: 0, y: 1 };
  else if (event.key === "ArrowLeft" && direction.x !== 1)
    direction = { x: -1, y: 0 };
  else if (event.key === "ArrowRight" && direction.x !== -1)
    direction = { x: 1, y: 0 };
});
36;
function gameLoop() {
  if (gameOver) return;

  let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();
    document.getElementById("score").innerText = "Score: " + score;
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= maxX ||
    head.y >= maxY ||
    snake.slice(1).some((part) => part.x === head.x && part.y === head.y)
  ) {
    gameOver = true;
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
  }

  draw();
}

function draw() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  if (Array.isArray(snake) && snake.length > 0) {
    snake.forEach((part) => {
      if (part && typeof part.x === "number" && typeof part.y === "number") {
        const div = document.createElement("div");
        div.className = "snake";
        div.style.left = part.x * cellSize + "px";
        div.style.top = part.y * cellSize + "px";
        container.appendChild(div);
      }
    });
  }

  if (food && typeof food.x === "number" && typeof food.y === "number") {
    const foodEl = document.createElement("div");
    foodEl.className = "food";
    foodEl.style.left = food.x * cellSize + "px";
    foodEl.style.top = food.y * cellSize + "px";
    container.appendChild(foodEl);
  }
}

function randomFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  } while (snake.some((part) => part.x === newFood.x && part.y === newFood.y));
  return newFood;
}
