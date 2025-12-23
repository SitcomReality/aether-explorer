import { Vector2 } from '../utils/vector.js';
import { LIGHT_SPEED_BASE } from '../utils/constants.js';

export function updatePhysics(state, dt) {
  const ship = state.ship;
  const aether = state.aether;
  
  // Get local aether density
  const density = aether.getDensity(ship.x, ship.y);
  
  // Light speed varies with aether density
  // Sparse aether = faster light, dense aether = slower light
  const localLightSpeed = LIGHT_SPEED_BASE / Math.sqrt(density);
  
  // Ship travels at local light speed in its direction
  const velocity = Vector2.scale(ship.direction, localLightSpeed * dt);
  
  ship.x += velocity.x;
  ship.y += velocity.y;
  
  // Wrap around universe
  ship.x = (ship.x + 1) % 1;
  ship.y = (ship.y + 1) % 1;
  
  ship.distanceTraveled += localLightSpeed * dt;
}