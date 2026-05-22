const Food = (() => {
  let position = { x: 5, y: 5 };

  const getRandomGridPosition = () => {
    return {
      x: Math.floor(Math.random() * Grid.getGridWidth()),
      y: Math.floor(Math.random() * Grid.getGridHeight())
    };
  };

  const isPositionOccupied = (x, y, snakeBody) => {
    return snakeBody.some(segment => segment.x === x && segment.y === y);
  };

  const spawn = (snakeBody = []) => {
    let newPosition;
    do {
      newPosition = getRandomGridPosition();
    } while (isPositionOccupied(newPosition.x, newPosition.y, snakeBody));

    position = newPosition;
  };

  const init = (snakeBody = []) => {
    spawn(snakeBody);
  };

  const getPosition = () => ({ ...position });

  const checkCollision = (snakeHead) => {
    return snakeHead.x === position.x && snakeHead.y === position.y;
  };

  return {
    init,
    spawn,
    getPosition,
    checkCollision
  };
})();
