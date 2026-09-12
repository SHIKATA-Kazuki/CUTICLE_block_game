// ============================================================
// ボール
// ============================================================
class Ball {
  constructor(canvasWidth, canvasHeight) {
    this.radius = CONFIG.BALL_RADIUS;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }

  // パドルの少し上、ランダムな角度で打ち出す
  reset() {
    this.x = this.canvasWidth / 2;
    this.y = this.canvasHeight - CONFIG.PADDLE_BOTTOM_MARGIN - CONFIG.PADDLE_HEIGHT - this.radius - 2;

    const angle = (Math.random() * 0.5 + 0.25) * Math.PI; // 45°〜135°の範囲
    const speed = CONFIG.BALL_SPEED;
    this.vx = speed * Math.cos(angle);
    this.vy = -Math.abs(speed * Math.sin(angle));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 左右の壁
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x + this.radius > this.canvasWidth) {
      this.x = this.canvasWidth - this.radius;
      this.vx *= -1;
    }

    // 上の壁
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -1;
    }
    // 下（ミス）の判定は main.js 側で行う
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(255,255,255,0.6)';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
}
