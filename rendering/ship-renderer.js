export class ShipRenderer {
  render(ctx, state, width, height) {
    const ship = state.ship;
    
    const x = ship.x * width;
    const y = ship.y * height;
    
    // Draw ship
    ctx.save();
    ctx.translate(x, y);
    
    const angle = Math.atan2(ship.direction.y, ship.direction.x);
    ctx.rotate(angle);
    
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-8, 6);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-8, -6);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#ff8888';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
  }
}