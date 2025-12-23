export class MouseInput {
  constructor(canvas, state) {
    this.canvas = canvas;
    this.state = state;
    this.isDown = false;
    
    this.setupListeners();
  }
  
  setupListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.onDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.onMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.onUp(e));
    
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.onDown(e.touches[0]);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.onMove(e.touches[0]);
    });
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onUp(e);
    });
  }
  
  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    };
  }
  
  onDown(e) {
    this.isDown = true;
    const pos = this.getPos(e);
    this.state.tools.applyToAether(pos.x, pos.y);
  }
  
  onMove(e) {
    if (!this.isDown) return;
    const pos = this.getPos(e);
    this.state.tools.applyToAether(pos.x, pos.y);
  }
  
  onUp(e) {
    this.isDown = false;
  }
}