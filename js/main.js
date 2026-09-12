// ============================================================
// ゲーム本体（ループ・当たり判定・状態管理）
// ============================================================
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d');

    this.input = new InputController(this.canvas);

    this.scoreEl = document.getElementById('score');
    this.livesEl = document.getElementById('lives');
    this.overlay = document.getElementById('overlay');
    this.overlayTitle = document.getElementById('overlay-title');
    this.overlayMessage = document.getElementById('overlay-message');
    this.overlayButton = document.getElementById('overlay-button');

    this.overlayButton.addEventListener('click', () => this._start());

    this._loopBound = this._loop.bind(this);

    this._resetState();
    this._draw(); // スタート前の初期画面を1回描画しておく
  }

  _resetState() {
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
    this.ball = new Ball(this.canvas.width, this.canvas.height);
    this.blocks = Blocks.buildLevel(this.canvas.width);
    this.score = 0;
    this.lives = CONFIG.INITIAL_LIVES;
    this.running = false;
    this._updateHud();
  }

  _start() {
    this._resetState();
    this.overlay.classList.add('hidden');
    this.running = true;
    requestAnimationFrame(this._loopBound);
  }

  _showResult(title, message) {
    this.overlayTitle.textContent = title;
    this.overlayMessage.innerHTML = message;
    this.overlayButton.textContent = 'もう一度あそぶ';
    this.overlay.classList.remove('hidden');
  }

  _updateHud() {
    this.scoreEl.textContent = `SCORE: ${this.score}`;
    this.livesEl.textContent = `LIVES: ${this.lives}`;
  }

  _loop() {
    if (!this.running) return;
    this._update();
    this._draw();
    requestAnimationFrame(this._loopBound);
  }

  _update() {
    const direction = this.input.getDirection();
    this.paddle.update(direction);
    this.ball.update();

    this._handlePaddleCollision();
    this._handleBlockCollisions();
    this._handleMiss();
    this._handleClear();
  }

  _handlePaddleCollision() {
    const ball = this.ball;
    const paddle = this.paddle;
    // 上向き（跳ね返り直後）に当たり判定を取らないよう、下降中のみ判定する
    if (ball.vy <= 0) return;
    if (!this._circleRectCollide(ball, paddle)) return;

    ball.y = paddle.y - ball.radius;

    // パドルのどこに当たったかで反射角を変える（中心=まっすぐ、端=斜め）
    const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2); // -1〜1
    const maxAngle = Math.PI / 3; // 最大60度
    const angle = Math.max(-1, Math.min(1, hitPos)) * maxAngle;
    const speed = Math.hypot(ball.vx, ball.vy);

    ball.vx = speed * Math.sin(angle);
    ball.vy = -Math.abs(speed * Math.cos(angle));
  }

  _handleBlockCollisions() {
    const ball = this.ball;
    for (const block of this.blocks) {
      if (!block.alive) continue;
      if (!this._circleRectCollide(ball, block)) continue;

      this._reflectBallOffRect(ball, block);

      block.hp -= 1;
      if (block.hp <= 0) {
        block.alive = false;
        this.score += block.score;
      } else {
        this.score += Math.floor(block.score / 2); // 削っただけでも少し加点
      }
      this._updateHud();
      break; // 1フレームで複数ブロックを同時に壊さない（貫通防止のシンプルな対策）
    }
  }

  _handleMiss() {
    if (this.ball.y - this.ball.radius <= this.canvas.height) return;

    this.lives -= 1;
    this._updateHud();

    if (this.lives <= 0) {
      this.running = false;
      this._showResult('ゲームオーバー', `スコア ${this.score} でした`);
    } else {
      this.ball.reset();
      this.paddle.reset(this.canvas.width);
    }
  }

  _handleClear() {
    if (!this.blocks.every((b) => !b.alive)) return;
    this.running = false;
    this._showResult('クリア！', `スコア ${this.score} でクリアしました`);
  }

  // 円（ボール）と矩形（パドル・ブロック）の当たり判定
  _circleRectCollide(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    return dx * dx + dy * dy < circle.radius * circle.radius;
  }

  // ブロックのどの面にぶつかったかを見て、ボールの速度を反転させる
  _reflectBallOffRect(ball, rect) {
    const overlapLeft = ball.x + ball.radius - rect.x;
    const overlapRight = rect.x + rect.width - (ball.x - ball.radius);
    const overlapTop = ball.y + ball.radius - rect.y;
    const overlapBottom = rect.y + rect.height - (ball.y - ball.radius);
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
      ball.vx *= -1;
    } else {
      ball.vy *= -1;
    }
  }

  _draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(0, 0, w, h);

    // 画面下部に、左右の操作エリアの目安になる薄い区切り線を描く
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.setLineDash([4, 7]);
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.62);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.restore();

    for (const block of this.blocks) {
      if (block.alive) Blocks.drawBlock(ctx, block);
    }
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
  }
}

window.addEventListener('load', () => {
  new Game();
});
