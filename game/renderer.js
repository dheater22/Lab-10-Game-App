const Renderer = (() => {
  let canvas = null;
  let ctx = null;
  let debugMode = false;

  const init = (canvasElement) => {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
    const size = Grid.getCanvasSize();
    canvas.width = size.width;
    canvas.height = size.height;
  };

  const clear = () => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawSnake = (snakeBody) => {
    const cellSize = Grid.getCellSize();

    // Head
    ctx.fillStyle = '#2ecc71';
    const head = snakeBody[0];
    const headPos = Grid.getPixelPosition(head.x, head.y);
    ctx.fillRect(headPos.x + 1, headPos.y + 1, cellSize - 2, cellSize - 2);

    // Body
    ctx.fillStyle = '#27ae60';
    for (let i = 1; i < snakeBody.length; i++) {
      const segment = snakeBody[i];
      const segPos = Grid.getPixelPosition(segment.x, segment.y);
      ctx.fillRect(segPos.x + 1, segPos.y + 1, cellSize - 2, cellSize - 2);
    }
  };

  const drawFood = (foodPosition) => {
    const cellSize = Grid.getCellSize();
    const foodPos = Grid.getPixelPosition(foodPosition.x, foodPosition.y);

    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
      foodPos.x + cellSize / 2,
      foodPos.y + cellSize / 2,
      cellSize / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const drawGrid = () => {
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 1;
    const gridWidth = Grid.getGridWidth();
    const gridHeight = Grid.getGridHeight();
    const cellSize = Grid.getCellSize();

    // Vertical lines
    for (let i = 0; i <= gridWidth; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i <= gridHeight; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }
  };

  const drawGameState = (gameState) => {
    clear();

    if (debugMode) {
      drawGrid();
    }

    drawFood(gameState.food);
    drawSnake(gameState.snake);
  };

  const toggleDebug = () => {
    debugMode = !debugMode;
  };

  const drawOverlay = (text, gameState) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  };

  return {
    init,
    drawGameState,
    toggleDebug,
    drawOverlay
  };
})();
