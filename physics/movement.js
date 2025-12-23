import { Vector2 } from '../utils/vector.js';
import { LIGHT_SPEED_BASE } from '../utils/constants.js';

export function updatePhysics(state, dt) {
  const ship = state.ship;
  const aether = state.aether;
  
  // Get local aether density and clamp to a safe positive range to avoid NaN/Infinity
  let density = aether.getDensity(ship.x, ship.y);
  if (!isFinite(density) || density <= 0) density = 0.01;
  density = Math.max(0.01, density); // prevent division by zero / negative densities
  
  // Light speed varies with aether density
  // Sparse aether = faster light, dense aether = slower light
  let localLightSpeed = LIGHT_SPEED_BASE / Math.sqrt(density);
  
  // Cap speed to avoid extreme jumps/overflow when density is very small
  const MAX_LOCAL_LIGHT_SPEED = 5.0; // universe units per second (sane cap)
  if (!isFinite(localLightSpeed) || localLightSpeed <= 0) localLightSpeed = 0;
  localLightSpeed = Math.min(localLightSpeed, MAX_LOCAL_LIGHT_SPEED);
  
  // Ship travels at local light speed in its direction
  const velocity = Vector2.scale(ship.direction, localLightSpeed * dt);
  
  ship.x += velocity.x;
  ship.y += velocity.y;
  
  // Wrap around universe (ensure finite values)
  if (!isFinite(ship.x)) ship.x = 0.5;
  if (!isFinite(ship.y)) ship.y = 0.5;
  ship.x = (ship.x + 1) % 1;
  ship.y = (ship.y + 1) % 1;
  
  ship.distanceTraveled += localLightSpeed * dt;
}