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

// Score display elements
const currentScoreEl = document.getElementById('current-score');
const highScoreEl = document.getElementById('high-score');

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

  updateHighScoreDisplay();
  startGameLoop();
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
  GameEngine.resetGame();
  showScreen('start');
}

function handleDebugToggle() {
  Renderer.toggleDebug();
}

function handleKeyPress(e) {
  if (GameEngine.gameState.status !== 'RUNNING') return;

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
  highScoreEl.textContent = GameEngine.gameState.highScore;
}

function updateCurrentScoreDisplay() {
  currentScoreEl.textContent = GameEngine.gameState.score;
}

let statusCheckInterval;

function startGameLoop() {
  statusCheckInterval = setInterval(() => {
    updateCurrentScoreDisplay();

    if (GameEngine.gameState.status === 'GAME_OVER') {
      showScreen('gameover');
      clearInterval(statusCheckInterval);
    }
  }, 50);
}
