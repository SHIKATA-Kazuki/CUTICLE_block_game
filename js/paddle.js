// ============================================================
// パドル（プレイヤーが操作するバー）
// ============================================================
class Paddle {
  constructor(canvasWidth, canvasHeight) {
    this.width = CONFIG.PADDLE_WIDTH;
    this.height = CONFIG.PADDLE_HEIGHT;
    this.canvasWidth = canvasWidth;
    this.speed = CONFIG.PADDLE_SPEED;
    this.x = (canvasWidth - this.width) / 2;
    this.y = canvasHeight - CONFIG.PADDLE_BOTTOM_MARGIN - this.height;
  }

  /**
   * @param {number} direction -1: 左移動, 0: 停止, 1: 右移動
   * 呼び出し側（input.js）が「押され続けているか」を管理しているので、
   * ここでは毎フレーム direction を受け取って位置を更新するだけでよい。
   */
  update(direction) {
    this.x += direction * this.speed;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.canvasWidth) this.x = this.canvasWidth - this.width;
  }

  reset(canvasWidth) {
    this.x = (canvasWidth - this.width) / 2;
  }

  draw(ctx) {
    const r = 6;
    ctx.save();
    ctx.fillStyle = '#f1faee';
    ctx.beginPath();
    ctx.moveTo(this.x + r, this.y);
    ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, r);
    ctx.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, r);
    ctx.arcTo(this.x, this.y + this.height, this.x, this.y, r);
    ctx.arcTo(this.x, this.y, this.x + this.width, this.y, r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
