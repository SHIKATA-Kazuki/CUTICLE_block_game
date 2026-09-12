// ============================================================
// ブロックの定義
//
// このファイルを編集するだけで、ブロックの「色」「形」「配置」を
// 自由にカスタマイズできます。
//
// 手順:
//  1. BLOCK_TYPES に「文字 → 色・形・耐久力・得点」を登録する
//  2. LEVEL の中で、その文字を好きな位置に並べて配置を作る
//     ( "." は「ブロックなし」を表す )
//
// LEVEL の各行は必ず同じ文字数にしてください（そろえることで
// きれいな長方形の盤面になります）。
// ============================================================

const BLOCK_TYPES = {
  // key: { shape: 形, color: 色(CSSカラー), hp: 耐久力(壊れるまでの回数), score: 破壊時の得点 }
  // ↓ アップロードされたうさぎのドット絵（64x64）を再現する4色
  'P': { shape: 'rect', color: '#feE8EB', hp: 1, score: 5 },  // 体（ピンク）
  'K': { shape: 'rect', color: '#584139', hp: 1, score: 5 },  // 輪郭・線（濃茶）
  'Y': { shape: 'rect', color: '#e4ee8e', hp: 1, score: 5 },  // 輪郭・線（濃茶）
  'W': { shape: 'rect', color: '#ffffff', hp: 1, score: 5 },  // 輪郭・線（濃茶）
  'T': { shape: 'rect', color: '#f0d5c4', hp: 1, score: 5 },  // 耳の内側・ほっぺ（ベージュ）
};

// 好きな形（見た目上のシルエット）に配置できるマップ。
// 文字数を増減させたり、"." を挟んで穴を空けたりして自由に編集してください。
// このLEVELは、アップロードされた64x64のドット絵から自動生成したもの。
const LEVEL = [
  "................................................................",
  "........KKKK....................................................",
  ".......KTTTTKK.............................KKKKK................",
  "......KTTTTTTTK..........................KKTTTTTK...............",
  "......KTTTTTTPTK........................KTTTTTTTTK..............",
  ".....KTTTTTPPPPTK......................KTPTTTTTTTK..............",
  ".....KTTTPPPPPPPKK....................KTPPPPTTTTTK.............",
  ".....KTPPPPPPPPPPK...................KKPPPPPPTTTTK.............",
  ".....KPPPPPPPPPPPTK..................KPPPPPPPPPTTK.............",
  ".....KPPPPPPPPPPPPK....KKKKKKKK.....KTPPPPPPPPPPPK..............",
  ".....KPPPPPPPPPPPPPKKKYYYYYYYYYKKK..KPPPPPPPPPPPPK..............",
  ".....KPPPPPPPPPPPPPKKYKKKKKKKKKYYYKKTPPPPPPPPPPPPK..............",
  ".....KTPPPPPPPPPPPKYYYK........KKYYKTPPPPPPPPPPPPK..............",
  "......KPPPPPPPPPPPKYYYKKKK.......KYYKPPPPPPPPPPPK...............",
  "......KPPPPPPPPPPPTKYYYYYYKKKKKKKYYYKPPPPPPPPPPPK...............",
  ".......KPPPPPPPPPPPKTKYYYYYYYYYYYYTTKPPPPPPPPPPTK...............",
  ".......KPPPPPPPPPPPPTKYYYYYYYYYYYYKKPPPPPPPPPPPK................",
  "........KPPPPPPPPPPPPKTKKKKKKKKKKKKPPPPPPPPPPPKK................",
  "........KPPPPPPPPPPPPPK..........KPPPPPPPPPPPPK.................",
  ".........KPPPPPPPPPPPPK..........KPPPPPPPPPPPK..................",
  ".........KKPPPPPPPPPPPK..........KPPPPPPPPPPPK..................",
  "..........KPPPPPPPPPPPTK.........KPPPPPPPPPPK...................",
  "...........KPPPPPPPPPPPK.........KPPPPPPPPPK....................",
  "............KPPPPPPPPPPK.........KPPPPPPPPKK....................",
  ".............KPPPPPPPPPK.........KPPPPPPPPK.....................",
  ".............KKPPPPPPPPK.........KPPPPPPPK......................",
  "...............KPPPPPPPK.........PPPPPPPK.......................",
  "................KTPPPPPKKKKKKKKKKTPPPPPKK.......................",
  ".................KTPPPPPPTPPPPPPPPPPPPKK........................",
  "..................KTPPPPPPPPPPPPPPPPPPKK........................",
  ".................KKPPPPPPPPPPPPPPPPPPPPPKKK.....................",
  "...............KKTPPPPPPPPPPPPPPPPPPPPPPPPKK....................",
  "..............KKPPPPPPPPPPPPPPPPPPPPPPPPPPPTK...................",
  ".............KPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPPKK.................",
  "...........KKPPPPPPPPPPPPPPPPPPPPPPPPPPKWKPPPPKK................",
  "..........KKPPPPPPPPPPPPPPKPPPPPPPPPPPTKWWKPPPPKK...............",
  "..........KPPPPPPPPPPPPPPKWKPPPPPPPPPPTKWWKPPPPPKK..............",
  ".........KPPPPPPPPPPPPPPTKWKPPPPPPPPPPPKWWKTPPPPPK..............",
  "........KPPPPPPPPPPPPPPPKWWKPPPPPPPPPPPKWWWKPPPPPPK.............",
  ".......KKPPPPPPPPPPPPPPPKWWWTPPPPPPPPPPKWWWKPPPPPPK.............",
  ".......KPPPPPPPPPPPPPPPPKWWWKPPPPPPPPPPKWWWKPPPPPPTK............",
  "......KTPPPPPPPPPPPPPPPPKWWWKPPPPPPPPPPPKWKTPPTTTPPK............",
  "......KPPPPPPPPPPPPPPPPPKWWWKPPPPPPPPPPPKKTPTTTTTPPK............",
  "......KPPPPPPPPPPPPPPPPPKWWWKPPPPPPPPPPPPPPPTTTTTPPTK...........",
  ".....KPPPPPPPPPPPPPPPPPPPKKKTPPPPPPPPPPPPPPPPTTTPPPPK...........",
  ".....KPPPPPPPPPPPPPPTTPPPPTKPPPPPPKPPPPPKPPPPPPPPPPPK...........",
  ".....KPPPPPPPPPPPPTTTTTPPPPPPPKPPPKKPPPTKKKTPPPPPPPPK...........",
  ".....KPPPPPPPPPPPPTTTTTPPPPKPPKKKKKKKKKKKPPPPPPPPPPPKKKK........",
  ".....KPPPPPPPPPPPPPTTTTPKKKKKKKKPPPPKPPKPPPPPPPPPPPPKTPK........",
  ".....KPPPPPPPPPPPPPPPPPPPPPKPPPKPPPPPPPPPPPPPPPPPPPKTPPK........",
  "......KPPPPPPPPPPPPPPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPKPPPK........",
  "......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK........",
  "......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPK.........",
  ".......TPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK.........",
  ".......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK..........",
  "........KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPK...........",
  "........KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPK............",
  ".........KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK.............",
  "..........KKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKKPPPK..............",
  "............KTPPPPPPPPPPPPPPPPPPPPPPPPPPPPKKPPPPK...............",
  "..............KKTPPPPPPPPPPPPPPPPPPPPPPTKKPPPPKKK...............",
  "..................PPPPPPPPPPPPPPPPPPPPTPPPPPTK..................",
  "..................KPPPPPPPPPPPPPPPPPPPPPPPPKT...................",
  ".................PTPPPPPPPPPPPPPPPPPPPPPPKK.....................",
];

const Blocks = {
  /**
   * LEVEL と BLOCK_TYPES から、実際に描画・当たり判定に使うブロック配列を作る。
   * @param {number} canvasWidth
   * @returns {Array<object>} block { x, y, width, height, shape, color, hp, maxHp, score, alive }
   */
  buildLevel(canvasWidth) {
    const rows = LEVEL;
    const cols = rows[0].length;
    const availableWidth = canvasWidth - CONFIG.BLOCK_AREA_SIDE_PADDING * 2;
    const blockWidth = (availableWidth - CONFIG.BLOCK_GAP * (cols - 1)) / cols;
    const blockHeight = blockWidth; // 正方形にして、ドット絵の縦横比が崩れないようにする

    const blocks = [];
    rows.forEach((rowStr, rowIndex) => {
      for (let col = 0; col < rowStr.length; col++) {
        const ch = rowStr[col];
        if (ch === '.' || ch === ' ') continue; // 空白マスはスキップ

        const type = BLOCK_TYPES[ch];
        if (!type) continue; // 未登録の文字は無視（タイプミス対策）

        const x = CONFIG.BLOCK_AREA_SIDE_PADDING + col * (blockWidth + CONFIG.BLOCK_GAP);
        const y = CONFIG.BLOCK_AREA_TOP + rowIndex * (blockHeight + CONFIG.BLOCK_GAP);

        blocks.push({
          x, y, width: blockWidth, height: blockHeight,
          shape: type.shape,
          color: type.color,
          hp: type.hp,
          maxHp: type.hp,
          score: type.score,
          alive: true,
        });
      }
    });
    return blocks;
  },

  /**
   * ブロック1個を、指定された形（shape）に応じて描画する。
   * 当たり判定は常に四角形（バウンディングボックス）で行うため、
   * 見た目の形を増やしてもロジック側の変更は不要。
   */
  drawBlock(ctx, block) {
    const { x, y, width: w, height: h, shape, color, hp, maxHp } = block;
    const cx = x + w / 2;
    const cy = y + h / 2;

    ctx.save();
    // 耐久力が残っている（複数回当てないと壊れない）ブロックは、
    // ダメージを受けるほど少し薄く見えるようにする
    ctx.globalAlpha = 0.55 + 0.45 * (hp / maxHp);
    ctx.fillStyle = color;

    switch (shape) {
      case 'circle': {
        const r = Math.min(w, h) / 2 - 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'diamond': {
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(x + w, cy);
        ctx.lineTo(cx, y + h);
        ctx.lineTo(x, cy);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'triangle': {
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'rect':
      default: {
        // ドット絵のように小さいブロックが並ぶ場合でも潰れないよう、
        // ブロックサイズに応じて角丸の半径を小さくする
        const r = Math.min(3, w * 0.25, h * 0.25);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();
        break;
      }
    }
    ctx.restore();
  },
};
