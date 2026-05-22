# AGENTS.md

## Project: Snake Game (GitHub Pages + Copilot Vibe Coding)

## Overview
This project is a **Snake game web application** built using **vanilla HTML, CSS, and JavaScript**. It is designed to run entirely in the browser and be deployed via **GitHub Pages** with no backend or server dependencies.

GitHub Copilot will be used in a “vibe coding” workflow to incrementally generate and improve features.

---

## Core Requirements
- Classic Snake game mechanics
- Runs fully in the browser (no backend)
- Deployable on GitHub Pages
- Uses browser storage to save progress
- Responsive design (desktop + mobile support)

---

## Tech Stack
- HTML5
- CSS3 (Flexbox/Grid for layout)
- JavaScript (ES6+ only, no frameworks)
- Canvas API (recommended for rendering)
- requestAnimationFrame (game loop)
- localStorage (required persistence)

---

## Game Features (Minimum Viable Game)
### Gameplay
- Snake moves in a grid
- Food spawns randomly
- Snake grows when eating food
- Game ends when snake hits wall or itself

### UI Screens
- Start screen (Play button)
- Game screen (canvas)
- Game over screen
- Restart option

---

## Persistence Requirements (IMPORTANT)
The game MUST store data in the browser using `localStorage`.

### Must Save:
- High score
- Last score
- Game settings (speed or difficulty if implemented)
- Optional: last game state (if pause/resume is implemented)

### Storage Rules:
- All storage logic must be centralized in a single module:
  - `/storage/saveManager.js`
- Data must be stored as JSON strings
- Use clear keys like:
  - `snake_highScore`
  - `snake_settings`
  - `snake_lastScore`

---

## Project Structure (Required)
Copilot should maintain this structure:

```
/index.html
/style.css
/main.js
/game/
  engine.js
  snake.js
  food.js
  grid.js
  renderer.js
/storage/
  saveManager.js
/assets/
  images/
  sounds/
```

---

## Game Architecture
### Core Loop Pattern
The game must use a standard loop:

- initGame()
- update(deltaTime)
- render()
- gameLoop()

Use:
```js
requestAnimationFrame(gameLoop);
```

---

## Game Engine Rules
- Grid-based movement (no freeform physics)
- Fixed tick rate movement (not frame-dependent)
- Snake body stored as an array of coordinates
- Direction control via keyboard and optional touch input

---

## Controls
### Keyboard
- Arrow Up → move up
- Arrow Down → move down
- Arrow Left → move left
- Arrow Right → move right

### Optional Mobile Controls
- Swipe gestures OR on-screen buttons

---

## Collision Rules
Game ends when:
- Snake hits wall
- Snake collides with itself

Food rules:
- Food must spawn in empty grid cells only

---

## UI/UX Guidelines
- Minimal, clean interface
- Canvas centered on screen
- Score always visible
- High score displayed
- Clear restart button after game over

---

## Code Quality Standards
Copilot must:
- Use modular JavaScript files
- Avoid global variables where possible
- Use `const` and `let` (never `var`)
- Keep functions small and focused
- Comment only non-obvious logic
- Avoid rewriting entire files unnecessarily

---

## Performance Rules
- No DOM manipulation inside game loop (except UI updates outside canvas)
- Cache canvas context
- Use efficient array operations for snake body updates
- Avoid unnecessary redraws

---

## Storage Module (MANDATORY)
### `/storage/saveManager.js` must include:
- saveHighScore(score)
- getHighScore()
- saveSettings(settings)
- getSettings()
- saveLastScore(score)
- resetAllData()

All values must be JSON serialized.

---

## GitHub Pages Constraints
- Must run as static site
- No build step required (or optional simple one)
- All file paths must be relative
- No external APIs required

---

## Development / Debug Mode
Include a toggle for debugging:
- Show grid overlay (optional)
- Show FPS (optional)
- Log state changes only when enabled
- Button or key toggle (e.g., `D` key)

---

## Accessibility Requirements
- Keyboard controls required
- Buttons must have labels
- Game must not rely on sound alone
- UI should be readable on small screens

---

## Git Commit Style (Suggested)
- add snake movement logic
- implement collision detection
- add local storage high score
- improve game rendering
- fix food spawn bug

---

## Definition of Done
A feature is complete when:
- It works in browser
- It persists data correctly (if applicable)
- It does not break GitHub Pages deployment
- Game loop remains stable and playable

---

## Copilot Vibe Coding Rules
- Build incrementally (small steps only)
- Do not refactor everything unless necessary
- Always keep the game runnable after each change
- Prefer improving existing code over rewriting
- Ask questions only if absolutely required

