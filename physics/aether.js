export class AetherGrid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.density = new Float32Array(width * height);
    this.velocity = new Float32Array(width * height * 2);
    
    this.initialize();
  }
  
  initialize() {
    for (let i = 0; i < this.density.length; i++) {
      this.density[i] = 1.0 + Math.random() * 0.2 - 0.1;
    }
  }
  
  getDensity(x, y) {
    const gx = Math.floor(x * this.width);
    const gy = Math.floor(y * this.height);
    
    if (gx < 0 || gx >= this.width || gy < 0 || gy >= this.height) {
      return 1.0;
    }
    
    return this.density[gy * this.width + gx];
  }
  
  setDensity(x, y, value) {
    const gx = Math.floor(x * this.width);
    const gy = Math.floor(y * this.height);
    
    if (gx < 0 || gx >= this.width || gy < 0 || gy >= this.height) {
      return;
    }
    
    this.density[gy * this.width + gx] = value;
  }
  
  addDensity(x, y, delta) {
    const current = this.getDensity(x, y);
    this.setDensity(x, y, current + delta);
  }
}

export function updateAether(state, dt) {
  // Aether dynamics - subtle flow and dissipation
  const grid = state.aether;
  
  for (let i = 0; i < grid.density.length; i++) {
    grid.density[i] += (1.0 - grid.density[i]) * dt * 0.1;
  }
}