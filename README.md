# Lab-10-Game-App

A fully playable Snake game built with vanilla JavaScript, HTML5, and CSS3. This application runs entirely in the browser and is deployable on GitHub Pages with no backend required.

## Features

- **Classic Snake Gameplay**: Move the snake, eat food, and grow
- **Score Tracking**: Current score and high score with persistent storage
- **Responsive Design**: Works on desktop and mobile devices
- **Browser Storage**: Game scores saved to localStorage
- **Grid-based Movement**: Snake moves on a fixed grid with collision detection
- **Canvas Rendering**: Smooth graphics using HTML5 Canvas API
- **Debug Mode**: Toggle grid overlay with the 'D' key

## How to Play

1. Click "Play" to start the game
2. Use arrow keys to control the snake:
   - ↑ Arrow Up - Move up
   - ↓ Arrow Down - Move down
   - ← Arrow Left - Move left
   - → Arrow Right - Move right
3. Eat the red food circles to grow and increase your score
4. Avoid hitting the walls or yourself
5. Your high score is saved automatically

## Project Structure

```
/index.html              - Main HTML file
/style.css              - Styling and layout
/main.js                - Application entry point
/game/
  engine.js             - Game loop and state management
  snake.js              - Snake logic and movement
  food.js               - Food spawning system
  grid.js               - Grid management
  renderer.js           - Canvas rendering
/storage/
  saveManager.js        - localStorage persistence
```

## Technical Details

- **Game Loop**: Fixed timestep using requestAnimationFrame
- **Grid System**: 20x20 grid with 20px cell size
- **State Management**: Centralized game state in the engine
- **Storage**: All data persisted with localStorage using `snake_` prefix keys
- **Responsive**: Adapts to different screen sizes while maintaining aspect ratio

## Deployment

This game can be deployed directly to GitHub Pages as a static site:

1. Push to your GitHub repository
2. Go to Settings → Pages
3. Set source to the branch containing this code
4. Access the game at `https://yourusername.github.io/repository-name`

No build step or backend server required!

## Browser Compatibility

Works on all modern browsers with support for:
- HTML5 Canvas API
- ES6+ JavaScript
- localStorage API
