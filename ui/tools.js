export class ToolManager {
  constructor(state) {
    this.state = state;
    this.tools = [
      { id: 'compress', name: 'Compress', key: '1', effect: -0.3 },
      { id: 'expand', name: 'Expand', key: '2', effect: 0.3 },
      { id: 'ripple', name: 'Ripple', key: '3', effect: 'ripple' },
      { id: 'clear', name: 'Clear', key: '4', effect: 'clear' }
    ];
    this.activeTool = this.tools[0];
    
    this.render();
  }
  
  render() {
    const container = document.getElementById('tool-bar');
    container.innerHTML = '';
    
    this.tools.forEach(tool => {
      const btn = document.createElement('div');
      btn.className = 'tool-button';
      if (tool === this.activeTool) {
        btn.classList.add('active');
      }
      
      btn.innerHTML = `
        <span class="tool-key">${tool.key}</span>
        <span>${tool.name}</span>
      `;
      
      btn.addEventListener('click', () => this.selectTool(tool));
      container.appendChild(btn);
    });
  }
  
  selectTool(tool) {
    this.activeTool = tool;
    this.render();
  }
  
  selectByKey(key) {
    const tool = this.tools.find(t => t.key === key);
    if (tool) {
      this.selectTool(tool);
    }
  }
  
  applyToAether(x, y, radius = 0.05) {
    const grid = this.state.aether;
    const effect = this.activeTool.effect;
    
    if (effect === 'clear') {
      for (let i = 0; i < grid.density.length; i++) {
        grid.density[i] = 1.0;
      }
      return;
    }
    
    if (effect === 'ripple') {
      this.createRipple(x, y);
      return;
    }
    
    // Apply density change
    for (let dy = -radius; dy <= radius; dy += radius / 10) {
      for (let dx = -radius; dx <= radius; dx += radius / 10) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius) {
          const falloff = 1 - (dist / radius);
          grid.addDensity(x + dx, y + dy, effect * falloff);
        }
      }
    }
  }
  
  createRipple(x, y) {
    // TODO: Implement ripple effect
  }
}