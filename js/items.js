// ============================================================
// アイテム（★マーク付きブロックを壊すと落ちてくるもの）
//
// 新しいアイテムの種類を増やしたい場合は、ITEM_TYPES に追加して
// main.js の _applyItemEffect() に効果の処理を書き足してください。
// ============================================================
const ITEM_TYPES = {
  multiball: {
    label: 'x3',
    color: '#ffd166',
    description: 'ボールが3つに増える',
  },
};

class Item {
  constructor(x, y, type) {
    this.type = type;
    this.width = CONFIG.ITEM_SIZE;
    this.height = CONFIG.ITEM_SIZE;
    this.x = x - this.width / 2;   // x, y はブロックの中心座標を受け取る
    this.y = y - this.height / 2;
    this.vy = CONFIG.ITEM_FALL_SPEED;
    this.alive = true;
  }

  update() {
    this.y += this.vy;
  }

  draw(ctx) {
    const def = ITEM_TYPES[this.type];
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const r = this.width / 2;

    ctx.save();
    // カプセル風の丸いアイテム
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = def.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.stroke();

    // ラベル文字（例: "x3"）
    ctx.fillStyle = '#06090f';
    ctx.font = `bold ${Math.floor(r * 1.1)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(def.label, cx, cy + 1);
    ctx.restore();
  }
}
