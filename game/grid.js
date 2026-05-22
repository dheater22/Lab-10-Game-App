const Grid = (() => {
  const GRID_WIDTH = 20;
  const GRID_HEIGHT = 20;
  const CELL_SIZE = 20;

  const getGridWidth = () => GRID_WIDTH;
  const getGridHeight = () => GRID_HEIGHT;
  const getCellSize = () => CELL_SIZE;

  const isValidPosition = (x, y) => {
    return x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT;
  };

  const getPixelPosition = (gridX, gridY) => {
    return {
      x: gridX * CELL_SIZE,
      y: gridY * CELL_SIZE
    };
  };

  const getGridPosition = (pixelX, pixelY) => {
    return {
      x: Math.floor(pixelX / CELL_SIZE),
      y: Math.floor(pixelY / CELL_SIZE)
    };
  };

  const getCanvasSize = () => {
    return {
      width: GRID_WIDTH * CELL_SIZE,
      height: GRID_HEIGHT * CELL_SIZE
    };
  };

  return {
    getGridWidth,
    getGridHeight,
    getCellSize,
    isValidPosition,
    getPixelPosition,
    getGridPosition,
    getCanvasSize
  };
})();
