// Game screens
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');

// Buttons
const playBtn = document.getElementById('play-btn');
const restartBtn = document.getElementById('restart-btn');
const menuBtn = document.getElementById('menu-btn');
const debugToggle = document.getElementById('debug-toggle');

// Canvas
const canvas = document.getElementById('game-canvas');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  Renderer.init(canvas);
  GameEngine.init();

  // Event listeners
  playBtn.addEventListener('click', handlePlay);
  restartBtn.addEventListener('click', handleRestart);
  menuBtn.addEventListener('click', handleMenu);
  debugToggle.addEventListener('click', handleDebugToggle);

  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('keyup', handleKeyUp);

  updateHighScoreDisplay();
});

function handlePlay() {
  showScreen('game');
  GameEngine.startGame();
}

function handleRestart() {
  GameEngine.resetGame();
  showScreen('game');
  GameEngine.startGame();
}

function handleMenu() {
  showScreen('start');
  GameEngine.init();
}

function handleDebugToggle() {
  Renderer.toggleDebug();
}

function handleKeyPress(e) {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      Snake.setDirection('UP');
      break;
    case 'ArrowDown':
      e.preventDefault();
      Snake.setDirection('DOWN');
      break;
    case 'ArrowLeft':
      e.preventDefault();
      Snake.setDirection('LEFT');
      break;
    case 'ArrowRight':
      e.preventDefault();
      Snake.setDirection('RIGHT');
      break;
    case 'd':
    case 'D':
      handleDebugToggle();
      break;
  }
}

function handleKeyUp(e) {
  // Optional: Add key release handling if needed
}

function showScreen(screenName) {
  startScreen.classList.remove('active');
  gameScreen.classList.remove('active');
  gameOverScreen.classList.remove('active');

  if (screenName === 'start') {
    startScreen.classList.add('active');
  } else if (screenName === 'game') {
    gameScreen.classList.add('active');
  } else if (screenName === 'gameover') {
    gameOverScreen.classList.add('active');
    document.getElementById('final-score').textContent = GameEngine.gameState.score;
    document.getElementById('final-high-score').textContent = GameEngine.gameState.highScore;
  }
}

function updateHighScoreDisplay() {
  document.getElementById('high-score').textContent = GameEngine.gameState.highScore;
}

// Observer pattern for game over
const originalEndGame = GameEngine.endGame.bind(GameEngine);
GameEngine.endGame = function() {
  originalEndGame();
  setTimeout(() => {
    showScreen('gameover');
  }, 100);
};
