export class AetherRenderer {
  render(ctx, state, width, height) {
    const grid = state.aether;
    const cellWidth = width / grid.width;
    const cellHeight = height / grid.height;
    
    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const density = grid.density[y * grid.width + x];
        
        // Visualize density
        const brightness = Math.floor(255 * (0.5 + (1 - density) * 0.5));
        ctx.fillStyle = `rgb(${brightness * 0.3}, ${brightness * 0.4}, ${brightness})`;
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }
  }
}