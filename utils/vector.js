export class Vector2 {
  static add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  }
  
  static subtract(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }
  
  static scale(v, s) {
    return { x: v.x * s, y: v.y * s };
  }
  
  static length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  
  static normalize(v) {
    const len = Vector2.length(v);
    if (len === 0) return { x: 0, y: 0 };
    return { x: v.x / len, y: v.y / len };
  }
}