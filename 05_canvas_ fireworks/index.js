import CanvasOption from "./canvasOption.js";
import Particle from "./Particle.js";
import { randomNumBetween } from "./utils.js";

let canvasWidth, canvasHeight;

class Canvas extends CanvasOption {
  constructor() {
    super(); // 부모 클래스의 생성자를 호출
    // ->>>> super로 선언하면, 부모클래스에서 만든 변수나 메서드들을 자식 클래스 Canvas 클래스에서 this 로 사용가능.

    this.particles = [];
  }
  init() {
    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
    // this.canvasWidth = innerWidth;
    // this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    this.createParticles();
  }

  createParticles() {
    const PARTICLE_NUM = 5;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const vx = randomNumBetween(-5, 5);
      const vy = randomNumBetween(-5, 5);
      this.particles.push(new Particle(x, y, vx, vy));
    }
  }

  update() {
    this.y += 1;
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // this.ctx.fillStyle = "blue";
      // this.ctx.fillRect(100, 100, 300, 300);
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      then = now - (delta & this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

// 간단하게,
window.onload = () => {
  canvas.init();
  canvas.render();
};

window.addEventListener("resize", () => {
  canvas.init();
  canvas.render();
});
