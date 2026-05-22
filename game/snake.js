const Snake = (() => {
  let body = [{x: 10, y: 10}];
  let direction = 'RIGHT';
  let pendingDirection = 'RIGHT';

  const init = () => {
    body = [{x: 10, y: 10}];
    direction = 'RIGHT';
    pendingDirection = 'RIGHT';
  };

  const setDirection = (newDirection) => {
    // Prevent reversing into itself
    if (newDirection === 'UP' && direction === 'DOWN') return;
    if (newDirection === 'DOWN' && direction === 'UP') return;
    if (newDirection === 'LEFT' && direction === 'RIGHT') return;
    if (newDirection === 'RIGHT' && direction === 'LEFT') return;

    pendingDirection = newDirection;
  };

  const update = () => {
    direction = pendingDirection;

    const head = body[0];
    let newHead = { x: head.x, y: head.y };

    switch (direction) {
      case 'UP':
        newHead.y--;
        break;
      case 'DOWN':
        newHead.y++;
        break;
      case 'LEFT':
        newHead.x--;
        break;
      case 'RIGHT':
        newHead.x++;
        break;
    }

    body.unshift(newHead);
  };

  const grow = () => {
    // Body already has new head from update, growth is automatic
  };

  const shrink = () => {
    if (body.length > 1) {
      body.pop();
    }
  };

  const checkSelfCollision = () => {
    const head = body[0];
    for (let i = 1; i < body.length; i++) {
      if (body[i].x === head.x && body[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  const checkWallCollision = () => {
    const head = body[0];
    return !Grid.isValidPosition(head.x, head.y);
  };

  const getBody = () => [...body];
  const getHead = () => ({ ...body[0] });
  const getDirection = () => direction;
  const getLength = () => body.length;

  return {
    init,
    setDirection,
    update,
    grow,
    shrink,
    checkSelfCollision,
    checkWallCollision,
    getBody,
    getHead,
    getDirection,
    getLength
  };
})();
