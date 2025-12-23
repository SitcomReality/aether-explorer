import { AetherGrid } from '../physics/aether.js';
import { Ship } from '../game/ship.js';
import { ActManager } from '../game/acts.js';
import { DialogueManager } from '../ui/dialogue.js';
import { ToolManager } from '../ui/tools.js';

export class GameState {
  constructor() {
    this.aether = new AetherGrid(64, 64);
    this.ship = new Ship(0.5, 0.5);
    this.acts = new ActManager(this);
    this.dialogue = new DialogueManager();
    this.tools = new ToolManager(this);
    
    this.camera = {
      x: 0,
      y: 0,
      zoom: 1
    };
    
    this.acts.startAct1();
  }
  
  update(dt) {
    this.acts.update(dt);
    this.dialogue.update(dt);
  }
}