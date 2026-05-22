const GameEngine = (() => {
  const gameState = {
    status: 'START',
    score: 0,
    highScore: SaveManager.getHighScore(),
    tickRate: 100,
    lastTick: 0,
    snake: [],
    food: {}
  };

  let animationId = null;
  let isRunning = false;

  const init = () => {
    gameState.status = 'START';
    gameState.score = 0;
    gameState.highScore = SaveManager.getHighScore();
    gameState.lastTick = 0;

    Snake.init();
    Food.init(Snake.getBody());
    updateGameState();
  };

  const startGame = () => {
    gameState.status = 'RUNNING';
    gameState.score = 0;
    gameState.lastTick = performance.now();

    Snake.init();
    Food.init(Snake.getBody());
    updateGameState();

    isRunning = true;
    gameLoop(performance.now());
  };

  const resetGame = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    isRunning = false;
    init();
  };

  const update = () => {
    if (gameState.status !== 'RUNNING') return;

    // Update snake
    Snake.update();

    // Check wall collision
    if (Snake.checkWallCollision()) {
      endGame();
      return;
    }

    // Check self collision
    if (Snake.checkSelfCollision()) {
      endGame();
      return;
    }

    // Check food collision
    if (Food.checkCollision(Snake.getHead())) {
      gameState.score += 10;
      Snake.grow();
      Food.spawn(Snake.getBody());
    } else {
      Snake.shrink();
    }

    updateGameState();
  };

  const updateGameState = () => {
    gameState.snake = Snake.getBody();
    gameState.food = Food.getPosition();
  };

  const gameLoop = (timestamp) => {
    if (!isRunning) return;

    const deltaTime = timestamp - gameState.lastTick;

    if (deltaTime >= gameState.tickRate) {
      update();
      gameState.lastTick = timestamp;
    }

    Renderer.drawGameState(gameState);
    animationId = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    gameState.status = 'GAME_OVER';
    isRunning = false;

    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score;
      SaveManager.saveHighScore(gameState.highScore);
    }
    SaveManager.saveLastScore(gameState.score);

    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };

  return {
    init,
    startGame,
    resetGame,
    endGame,
    gameState
  };
})();
