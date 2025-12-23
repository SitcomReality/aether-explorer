import { CanvasManager } from '../rendering/canvas.js';
import { AetherRenderer } from '../rendering/aether-renderer.js';
import { ShipRenderer } from '../rendering/ship-renderer.js';
import { UIRenderer } from '../rendering/ui-renderer.js';
import { MouseInput } from '../input/mouse.js';
import { KeyboardInput } from '../input/keyboard.js';
import { updatePhysics } from '../physics/movement.js';
import { updateAether } from '../physics/aether.js';

export class Engine {
  constructor(canvas, state) {
    this.canvas = canvas;
    this.state = state;
    this.canvasManager = new CanvasManager(canvas);
    this.ctx = this.canvasManager.ctx;
    
    this.renderers = {
      aether: new AetherRenderer(),
      ship: new ShipRenderer(),
      ui: new UIRenderer()
    };
    
    this.input = {
      mouse: new MouseInput(canvas, state),
      keyboard: new KeyboardInput(state)
    };
    
    this.lastTime = 0;
    this.running = false;
  }
  
  start() {
    this.running = true;
    this.loop(0);
  }
  
  stop() {
    this.running = false;
  }
  
  loop(time) {
    if (!this.running) return;
    
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    
    this.update(dt);
    this.render();
    
    requestAnimationFrame((t) => this.loop(t));
  }
  
  update(dt) {
    updateAether(this.state, dt);
    updatePhysics(this.state, dt);
    this.state.update(dt);
  }
  
  render() {
    const { width, height } = this.canvasManager;
    this.ctx.clearRect(0, 0, width, height);
    
    this.renderers.aether.render(this.ctx, this.state, width, height);
    this.renderers.ship.render(this.ctx, this.state, width, height);
  }
}