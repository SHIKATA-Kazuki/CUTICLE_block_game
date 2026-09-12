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
    this.overlayDefaultMessage = this.overlayMessage.innerHTML;

    this.overlayButton.addEventListener('click', () => this._start());

    this.selectedPatternId = DEFAULT_PATTERN_ID;
    this._buildPatternSelectUI();

    this._loopBound = this._loop.bind(this);

    this._resetState();
    this._draw(); // スタート前の初期画面を1回描画しておく
  }

  // ----------------------------------------------------------
  // ブロックの絵柄（パターン）選択UI
  // ----------------------------------------------------------
  _buildPatternSelectUI() {
    const list = document.getElementById('pattern-list');
    list.innerHTML = '';

    Blocks.getPatternIds().forEach((patternId) => {
      const option = document.createElement('div');
      option.className = 'pattern-option';
      if (patternId === this.selectedPatternId) option.classList.add('selected');

      const img = document.createElement('img');
      img.src = Blocks.renderThumbnail(patternId, 64);
      img.alt = Blocks.getPatternName(patternId);

      const label = document.createElement('span');
      label.textContent = Blocks.getPatternName(patternId);

      option.appendChild(img);
      option.appendChild(label);

      option.addEventListener('click', () => {
        this.selectedPatternId = patternId;
        list.querySelectorAll('.pattern-option').forEach((el) => el.classList.remove('selected'));
        option.classList.add('selected');
        // まだプレイ中でなければ、選び直した絵柄をすぐプレビューに反映する
        if (!this.running) {
          this._resetState();
          this._draw();
        }
      });

      list.appendChild(option);
    });
  }

  // ----------------------------------------------------------
  // 状態管理
  // ----------------------------------------------------------
  _resetState() {
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
    this.balls = [new Ball(this.canvas.width, this.canvas.height)];
    this.items = [];
    this.blocks = Blocks.buildLevel(this.canvas.width, this.selectedPatternId);
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

  // ----------------------------------------------------------
  // メインループ
  // ----------------------------------------------------------
  _loop() {
    if (!this.running) return;
    this._update();
    this._draw();
    requestAnimationFrame(this._loopBound);
  }

  _update() {
    const direction = this.input.getDirection();
    this.paddle.update(direction);

    for (const ball of this.balls) {
      ball.update();
      this._handlePaddleCollision(ball);
      this._handleBlockCollisions(ball);
    }

    this._updateItems();
    this._handleMissedBalls();
    this._handleClear();
  }

  _handlePaddleCollision(ball) {
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

  _handleBlockCollisions(ball) {
    for (const block of this.blocks) {
      if (!block.alive) continue;
      if (!this._circleRectCollide(ball, block)) continue;

      this._reflectBallOffRect(ball, block);

      block.hp -= 1;
      if (block.hp <= 0) {
        block.alive = false;
        this.score += block.score;
        if (block.isItem) {
          this._spawnItem(block, 'multiball');
        }
      } else {
        this.score += Math.floor(block.score / 2); // 削っただけでも少し加点
      }
      this._updateHud();
      break; // 1フレームで複数ブロックを同時に壊さない（貫通防止のシンプルな対策）
    }
  }

  // ----------------------------------------------------------
  // アイテム（★ブロックから落ちてくるもの）
  // ----------------------------------------------------------
  _spawnItem(block, type) {
    const cx = block.x + block.width / 2;
    const cy = block.y + block.height / 2;
    this.items.push(new Item(cx, cy, type));
  }

  _updateItems() {
    const paddle = this.paddle;
    const remaining = [];

    for (const item of this.items) {
      item.update();

      const caught =
        item.y + item.height >= paddle.y &&
        item.y <= paddle.y + paddle.height &&
        item.x + item.width >= paddle.x &&
        item.x <= paddle.x + paddle.width;

      if (caught) {
        this._applyItemEffect(item.type);
        continue; // このアイテムは消える
      }

      if (item.y > this.canvas.height) {
        continue; // 取れずに画面外へ落ちた（消える。ペナルティ無し）
      }

      remaining.push(item);
    }

    this.items = remaining;
  }

  _applyItemEffect(type) {
    if (type === 'multiball') {
      this._spawnMultiball();
    }
  }

  // 今あるボール1つにつき2つ複製して、合計3倍に増やす（上限あり）
  _spawnMultiball() {
    const sourceBalls = this.balls.slice();
    const newBalls = [];

    for (const ball of sourceBalls) {
      if (this.balls.length + newBalls.length >= CONFIG.MAX_BALLS) break;
      newBalls.push(ball.cloneWithAngleOffset(Math.PI / 8));
      if (this.balls.length + newBalls.length >= CONFIG.MAX_BALLS) break;
      newBalls.push(ball.cloneWithAngleOffset(-Math.PI / 8));
    }

    this.balls = this.balls.concat(newBalls);
  }

  // ----------------------------------------------------------
  // ミス・クリア判定
  // ----------------------------------------------------------
  _handleMissedBalls() {
    const survivors = this.balls.filter((ball) => ball.y - ball.radius <= this.canvas.height);

    if (survivors.length === this.balls.length) return; // どのボールも落ちていない
    if (survivors.length > 0) {
      // まだ他のボールが残っているので、ライフは減らさない
      this.balls = survivors;
      return;
    }

    // 全部のボールが画面外に落ちた
    this.lives -= 1;
    this._updateHud();

    if (this.lives <= 0) {
      this.running = false;
      this._showResult('ゲームオーバー', `スコア ${this.score} でした`);
    } else {
      this.paddle.reset(this.canvas.width);
      this.balls = [new Ball(this.canvas.width, this.canvas.height)];
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

  // ----------------------------------------------------------
  // 描画
  // ----------------------------------------------------------
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

    for (const item of this.items) {
      item.draw(ctx);
    }

    this.paddle.draw(ctx);

    for (const ball of this.balls) {
      ball.draw(ctx);
    }
  }
}

window.addEventListener('load', () => {
  new Game();
});
