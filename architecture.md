# ARCHITECTURE.md

## Project: Snake Game (GitHub Pages)

## Purpose
This document defines the **technical architecture** for the Snake game web application. It is intended to guide GitHub Copilot in generating consistent, modular, and maintainable code that aligns with the constraints defined in `AGENTS.md`.

The system is designed to be:
- Fully client-side
- Modular JavaScript-based
- Canvas-rendered
- Persistent via browser storage

---

## High-Level Architecture

The application follows a **modular game loop architecture**:

```
User Input → Game Engine → Game State → Renderer → Canvas Output
                         ↓
                 Save Manager (localStorage)
```

---

## Core Modules

### 1. `main.js` (Application Entry Point)
Responsible for bootstrapping the game.

Responsibilities:
- Initialize game engine
- Bind UI events (buttons, keyboard input)
- Start and restart game loop
- Connect UI with game state

Does NOT contain game logic.

---

### 2. `/game/engine.js` (Game Engine Core)
This is the central controller of the game.

Responsibilities:
- Manage game loop (`init`, `update`, `render`)
- Maintain global game state
- Handle timing and tick rate
- Detect game over conditions

Core loop structure:
```js
initGame()
update(deltaTime)
render()
gameLoop()
```

---

### 3. `/game/snake.js` (Snake Logic)
Encapsulates snake behavior.

Responsibilities:
- Maintain snake body as array of grid coordinates
- Handle direction changes
- Move snake per tick
- Detect self-collision
- Grow when food is eaten

State model:
```js
snake = {
  body: [{x, y}],
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT",
  pendingDirection: null
}
```

---

### 4. `/game/food.js` (Food System)
Responsible for food spawning and tracking.

Responsibilities:
- Generate food at random grid positions
- Ensure food does not spawn inside snake body
- Track current food position

Core function:
- `spawnFood(snakeBody)`

---

### 5. `/game/grid.js` (Grid System)
Defines the game board.

Responsibilities:
- Define grid size (width/height)
- Convert grid coordinates ↔ canvas pixels
- Provide boundary checks

Example:
```js
getPixelPosition(gridX, gridY)
```

---

### 6. `/game/renderer.js` (Rendering Layer)
Handles all drawing operations.

Responsibilities:
- Draw snake
- Draw food
- Draw grid (optional debug mode)
- Draw score UI overlays (if canvas-based)

Uses Canvas API only.

---

### 7. `/storage/saveManager.js` (Persistence Layer)
Centralized storage handler.

Responsibilities:
- Save/load high score
- Save/load settings
- Save last score
- Reset stored data

Storage format:
```json
{
  "highScore": 0,
  "lastScore": 0,
  "settings": {
    "speed": 1
  }
}
```

Uses `localStorage` keys prefixed with:
```
snake_
```

---

## Game State Model

The game engine maintains a single state object:

```js
gameState = {
  status: "START" | "RUNNING" | "PAUSED" | "GAME_OVER",
  score: 0,
  highScore: 0,
  tickRate: 100,
  snake: Snake,
  food: Food
}
```

State transitions:
- START → RUNNING
- RUNNING → GAME_OVER
- GAME_OVER → START (restart)
- RUNNING ↔ PAUSED

---

## Game Loop Architecture

The game uses a **fixed timestep loop**:

- `requestAnimationFrame()` drives rendering
- Movement updates occur at fixed intervals (tick-based)

Pseudocode:
```js
let lastTick = 0;

function gameLoop(timestamp) {
  if (timestamp - lastTick > tickRate) {
    update();
    lastTick = timestamp;
  }
  render();
  requestAnimationFrame(gameLoop);
}
```

---

## Input System

### Keyboard Input
Handled globally in `main.js`:
- Arrow keys update snake direction

Rules:
- Prevent reverse direction (e.g., LEFT → RIGHT invalid)
- Buffer input via `pendingDirection`

### Optional Mobile Input
- Swipe detection OR button controls
- Maps to same direction system as keyboard

---

## Collision System
Handled inside `engine.js` and `snake.js`:

### Collision Types:
- Wall collision → GAME_OVER
- Self collision → GAME_OVER
- Food collision → grow snake + increase score

---

## Rendering System
Uses Canvas 2D API.

Render order:
1. Clear canvas
2. Draw grid (optional debug)
3. Draw food
4. Draw snake
5. Draw overlays (score, game state)

Rendering must be deterministic based on state only.

---

## Persistence Flow

### Save Flow
Triggered on:
- Score change
- Game over
- Settings update

```text
Game Engine → Save Manager → localStorage
```

### Load Flow
On startup:
```text
Save Manager → Game Engine state initialization
```

---

## File Dependency Map

```
main.js
 ├── engine.js
 │     ├── snake.js
 │     ├── food.js
 │     ├── grid.js
 │     ├── renderer.js
 │     └── saveManager.js
```

---

## Performance Design Rules

- No DOM manipulation inside game loop
- Canvas rendering only inside `render()`
- Avoid object creation in hot loops
- Use simple arrays for snake body

---

## Error Handling Strategy

- Invalid direction inputs are ignored
- Missing save data defaults to safe values
- Game never crashes from invalid grid state

---

## Extensibility Goals
Architecture supports future features:
- Power-ups
- Obstacles
- Multiple difficulty levels
- Skins/themes
- Multiplayer (future scope, not implemented)

---

## Constraints Alignment (from AGENTS.md)
- Fully static deployment (GitHub Pages compatible)
- No backend dependencies
- LocalStorage-only persistence
- Vanilla JS only
- Modular file separation enforced

---

## Copilot Implementation Guidance
When generating code:
- Always preserve module boundaries
- Extend modules instead of merging logic
- Keep engine as single source of truth
- Avoid introducing frameworks or bundlers
- Ensure game remains runnable after each change

