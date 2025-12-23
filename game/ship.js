import { Vector2 } from '../utils/vector.js';

export class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = { x: 1, y: 0 };
    this.distanceTraveled = 0;
  }
  
  setDirection(dx, dy) {
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length > 0.001) {
      this.direction = { x: dx / length, y: dy / length };
    }
  }
}