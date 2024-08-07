import CanvasOption from "./canvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = 1;
  }

  update() {
    // this.y -= 1;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
