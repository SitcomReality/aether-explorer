import { Engine } from './core/engine.js';
import { GameState } from './core/state.js';

const canvas = document.getElementById('game-canvas');
const state = new GameState();
const engine = new Engine(canvas, state);

engine.start();