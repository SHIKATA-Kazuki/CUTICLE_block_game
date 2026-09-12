// ============================================================
// ブロックの定義（複数の「絵柄パターン」を切り替えられる構造）
//
// このファイルを編集するだけで、ブロックの「色」「形」「配置」「絵柄の種類」を
// 自由にカスタマイズできます。
//
// 【新しい絵柄パターンを追加する手順】
//  1. LEVEL_PATTERNS に新しいキー（例: 'myPicture'）を追加する
//  2. blockTypes に「文字 → 色・形・耐久力・得点」を登録する
//  3. grid の中で、その文字を好きな位置に並べて配置を作る
//     ( "." は「ブロックなし」を表す )
//
// grid の各行は必ず同じ文字数にしてください（そろえることで
// きれいな長方形の盤面になります）。
//
// ※ アイテム（★マーク）が付くブロックは、固定の座標ではなく、
//    ゲーム開始のたびに CONFIG.ITEM_BLOCK_* の設定に従ってランダムに
//    選ばれます（buildLevel() の _assignRandomItems() を参照）。
// ============================================================

const LEVEL_PATTERNS = {
  // --------------------------------------------------------
  // パターン1: レインボー（シンプルな色帯 + いろいろな形の見本）
  // --------------------------------------------------------
  rainbow: {
    name: 'レインボー',
    blockTypes: {
      'R': { shape: 'rect',     color: '#ef476f', hp: 1, score: 10 },
      'O': { shape: 'rect',     color: '#f78c6b', hp: 1, score: 10 },
      'Y': { shape: 'rect',     color: '#ffd166', hp: 1, score: 10 },
      'G': { shape: 'rect',     color: '#06d6a0', hp: 1, score: 10 },
      'B': { shape: 'rect',     color: '#118ab2', hp: 1, score: 10 },
      'V': { shape: 'rect',     color: '#9b5de5', hp: 1, score: 10 },
      'C': { shape: 'circle',   color: '#ffbe0b', hp: 1, score: 15 },
      'T': { shape: 'triangle', color: '#3a86ff', hp: 1, score: 15 },
      'D': { shape: 'diamond',  color: '#fb5607', hp: 2, score: 25 },
      'X': { shape: 'rect',     color: '#ff006e', hp: 3, score: 40 }, // 硬いブロック
    },
    grid: [
      "TTTTTTTTTTTT",
      "RRRRRRRRRRRR",
      "OOOOOOOOOOOO",
      "YYYYYYYYYYYY",
      "GGGGGGGGGGGG",
      "BBBBBBBBBBBB",
      "VVVVVVVVVVVV",
      "..CC.XX.CC..",
      "...DDDDDD...",
    ],
  },

  // --------------------------------------------------------
  // パターン2: うさぎ（アップロードされた64x64ドット絵を再現）
  // --------------------------------------------------------
  rabbit: {
    name: 'うさぎ',
    blockTypes: {
      'P': { shape: 'rect', color: '#feE8EB', hp: 1, score: 5 },  // 体（ピンク）
      'K': { shape: 'rect', color: '#584139', hp: 1, score: 5 },  // 輪郭・線（濃茶）
      'T': { shape: 'rect', color: '#f0d5c4', hp: 1, score: 5 },  // 耳の内側・ほっぺ（ベージュ）
    },
    grid: [
      "................................................................",
      "........KKKKP...................................................",
      ".......KTTTTKK.............................KKKKK................",
      "......KTTTTTTTK..........................KKTTTTTK...............",
      ".....PKTTTTTTPTK........................KTTTTTTTTK..............",
      ".....KTTTTTPPPPTK......................KTPTTTTTTTK..............",
      ".....KTTTPPPPPPPKK....................KTPPPPTTTTTKT.............",
      ".....KTPPPPPPPPPPK...................KKPPPPPPTTTTKP.............",
      ".....KPPPPPPPPPPPTK..................KPPPPPPPPPTTKP.............",
      ".....KPPPPPPPPPPPPK...PKKKKKKKT.....KTPPPPPPPPPPPK..............",
      ".....KPPPPPPPPPPPPPKKKTTTKTKTTTKKT..KPPPPPPPPPPPPK..............",
      ".....KPPPPPPPPPPPPPKKTKKKKKKKKKTKKKKTPPPPPPPPPPPPK..............",
      ".....KTPPPPPPPPPPPKTTTK........KKKTKTPPPPPPPPPPPPK..............",
      "......KPPPPPPPPPPPKTTTKKKKT.....PKKTKPPPPPPPPPPPKP..............",
      "......KPPPPPPPPPPPTKTTTTTTKKKKKKKTTTKPPPPPPPPPPPK...............",
      "......TKPPPPPPPPPPPKTKTTTTTTTTTTTTTTKPPPPPPPPPPTK...............",
      ".......KPPPPPPPPPPPPTKTTTTTTTTTTTTKKPPPPPPPPPPPK................",
      ".......PKPPPPPPPPPPPPKTKKKKKKKKKKKKPPPPPPPPPPPKK................",
      "........KPPPPPPPPPPPPPK..........KPPPPPPPPPPPPK.................",
      ".........KPPPPPPPPPPPPK..........KPPPPPPPPPPPK..................",
      ".........KKPPPPPPPPPPPK..........KPPPPPPPPPPPK..................",
      "..........KPPPPPPPPPPPTK.........KPPPPPPPPPPK...................",
      "...........KPPPPPPPPPPPK.........KPPPPPPPPPKT...................",
      "...........PKPPPPPPPPPPK.........KPPPPPPPPKK....................",
      "............TKPPPPPPPPPK.........KPPPPPPPPK.....................",
      ".............KKPPPPPPPPK.........KPPPPPPPK......................",
      "..............TKPPPPPPPKT........PPPPPPPK.......................",
      "...............PKTPPPPPKTKKKKKKKKTPPPPPKK.......................",
      ".................KTPPPPPPTPPPPPPPPPPPPKK........................",
      "..................KTPPPPPPPPPPPPPPPPPPKKT.......................",
      ".................KKPPPPPPPPPPPPPPPPPPPPPKKK.....................",
      "...............KKTPPPPPPPPPPPPPPPPPPPPPPPPKK....................",
      ".............PKKPPPPPPPPPPPPPPPPPPPPPPPPPPPTKT..................",
      "............TKPPPPPPPPPPPPPPPPPPPPPPPPPKKPPPPKK.................",
      "...........KKPPPPPPPPPPPPPPPPPPPPPPPPPPKPKPPPPKK................",
      "..........KKPPPPPPPPPPPPPPKPPPPPPPPPPPTT.TKPPPPKK...............",
      ".........TKPPPPPPPPPPPPPPKTKPPPPPPPPPPTT..KPPPPPKK..............",
      ".........KPPPPPPPPPPPPPPTKPKPPPPPPPPPPPK..KTPPPPPK..............",
      "........KPPPPPPPPPPPPPPPKP.KPPPPPPPPPPPK..PKPPPPPPK.............",
      ".......KKPPPPPPPPPPPPPPPK..TTPPPPPPPPPPKP.PKPPPPPPKT............",
      ".......KPPPPPPPPPPPPPPPPK..PKPPPPPPPPPPKP.PKPPPPPPTK............",
      "......KTPPPPPPPPPPPPPPPPK..PKPPPPPPPPPPPKPKTPPTTTPPK............",
      "......KPPPPPPPPPPPPPPPPPK...KPPPPPPPPPPPKKTPTTTTTPPKT...........",
      ".....TKPPPPPPPPPPPPPPPPPKPPPKPPPPPPPPPPPPPPPTTTTTPPTK...........",
      ".....KPPPPPPPPPPPPPPPPPPPKKKTPPPPPPPPPPPPPPPPTTTPPPPK...........",
      ".....KPPPPPPPPPPPPPPTTPPPPTKPPPPPPKPPPPPKPPPPPPPPPPPK...........",
      ".....KPPPPPPPPPPPPTTTTTPPPPPPPKPPPKKPPPTKKKTPPPPPPPPK...........",
      ".....KPPPPPPPPPPPPTTTTTPPPPKPPTKKKKKKKKKKPPPPPPPPPPPKKKK........",
      ".....KPPPPPPPPPPPPPTTTTPKKKKKKTKPPPPKPPKPPPPPPPPPPPPKTPK........",
      ".....KPPPPPPPPPPPPPPPPPPPPPKPPPKPPPPPPPPPPPPPPPPPPPKTPPK........",
      "......PPPPPPPPPPPPPPPPPPPPPKPPPPPPPPPPPPPPPPPPPPPPPKPPPK........",
      "......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK........",
      "......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPTT........",
      ".......TPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK.........",
      ".......KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK..........",
      ".......PTPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPK...........",
      "........KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKTPPKP...........",
      ".........KPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKPPPK.............",
      "..........KKPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPKKPPPKP.............",
      "TKKKKKKKKT..KTPPPPPPPPPPPPPPPPPPPPPPPPPPPPKKPPPPKT..............",
      "T........KKP..KKTPPPPPPPPPPPPPPPPPPPPPPTKKPPPPKKKP..............",
      "...........KT.....PPPPPPPPPPPPPPPPPPPPTPPPPPTK...TK.............",
      "............KP....KPPPPPPPPPPPPPPPPPPPPPPPPKT......K............",
      ".............K...PTPPPPPPPPPPPPPPPPPPPPPPKK........PT...........",
    ],
  },

  // --------------------------------------------------------
  // パターン3: ねこ（アップロードされた64x64ドット絵を再現）
  // --------------------------------------------------------
  cat: {
    name: 'ねこ',
    blockTypes: {
      'K': { shape: 'rect', color: '#574443', hp: 1, score: 5 }, // 輪郭・線（濃茶）
      'G': { shape: 'rect', color: '#9098a3', hp: 1, score: 5 }, // 体（グレー）
      'S': { shape: 'rect', color: '#727a84', hp: 1, score: 5 }, // 影・耳の中（濃いグレー）
    },
    grid: [
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      "................................................................",
      ".........................KK.....................................",
      ".......................KKK......................................",
      "......................KKKK............KK........................",
      "....................GKKKKG............KKK.......................",
      "...................KKKKKK.............KKKK......................",
      "...................KGKKKK.............KKKKK.....................",
      "....................GGGKK.............KKKKKK....................",
      "....................K..K...............KKKKKK...................",
      "....................K..................KGK.GK...................",
      "....................G..................K.K......................",
      "...................K.....................K......................",
      "...................K.....................G......................",
      "...................K.....................G......................",
      "...................K.....................G.......GKKKKKKKK......",
      "...................K.....................K.....KKKSSSSSSSSK.....",
      "........GGKKG.......G....................K...KKSSSSSSSSSSSK.....",
      "...KKKKKKKKKKKKKKKG.K....................K.GKSSSSSSSSSSSSSK.....",
      "..KKKKKKKKKKKKKKKKKKK..........G........KGKKSSSSSSSSSSSKSSK.....",
      "..KKKKKKKKKKKKKKKKKKKKG...KKKKKKKKKKK...KKKKKKKKKSSSSKKKSK......",
      "..KKKKKKKKKKKKKKKKKKKSSKKKKKKKKKKKKKKKSKSKKKKKKKKKKKKKSSSK......",
      "...KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKSSSSK......",
      "...KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKSSSKG......",
      "....KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKSSSSK.......",
      "....KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKSSSSSK.......",
      ".....KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKSSSSK........",
      "......KKKKKKKKSSSSKSSSSSSSSKKGKSSSSSSSSSSKGKKSSSSKKSSSSK........",
      ".......KKSKKSSSSSSSSSSSSSSSKGGKSSSSSSSSSKSGGKSSSSSKKSSK.........",
      "........KKKSSSSSSSSSSSSSSSSKGGKSSSSSSSSSKGGGKSSSSSSKKKK.........",
      ".........KSSSSSSSSSSSSSSSSKGGGKSSSSSSSSSKGGGKSSSSSSSKK..........",
      "........KKSSSSSSSSSGGGGGGGKGGGKGGGGGGGSSKGGGGSSSSSSSKK..........",
      ".......KKSSSSSSSGGGGGGGGGGK...KGGGGGGGGGK...GKSSSSSSSKG.........",
      ".......KSSSGGGGGGGGGGGGGGGK...KGGGGGGGGGK....SGGGGGGGGK.........",
      "......KSGGGGGGGGGGGGGGGGGGK...KGGGGGGGGGKG..GGGGGGGGGGK.........",
      ".....GKGGGGGGGGGGGGGGGGGGGK...KGGGGGGGGGGK.GKGGGGGGGGGKK........",
      ".....KGGGGGGGGGGGGGGGGGGGGGKKKGGGGGGGGGGGKKKGGGGGGGGGGGK........",
      ".....KGGGGGGGGGGGGGGGGGGGGGGKKGGGGGGGGGGGGGGGGGGGGGGGGGK........",
      ".....KGGGGGGGGGGGGGGGGGGGGGGGGGGKGGGSGGGGGGGGGGGGGGGGGGK........",
      "....KGGGGGGGGGGGGGGGGGGGGGGGGKGGKGGGKKGGGGGKGGGGGGGGGGGKG.......",
      "....KGGGGGGGGGGGGGGGGGGGKKKKKKKKKKKKKKKKKSKGGGGGGGGGGGGKG.......",
      "....KGGGGGGGGGGGGGGGGGGGGGGGKSGGGKGGGKKGSKKKKKGGGGGGGGGKG.......",
      "....KGGGGGGGGGGGGGGGGGGGGGGGKGGGGKGGGGKGGGKGGGGGGGGGGGGK........",
      "....KGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGKGGGGGGGGGGGGGK........",
      ".....GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGK........",
      ".....KGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGK........",
      ".....KGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGKG........",
      ".....KGGGGGGGGGGGGGGGGGGGGGGGGKKGGGGGGGGGGGGGGGGGGGGGGK.........",
      "......KGGGGGGGGGGGGGGGGGGGGGGKKGKGGGGGGGGGGGGGGGGGGGGKG.........",
      "......KGGGGGGGGGGGGGGGGGGGGGKGGGKGGGGGGGGGGGGGGGGGGGGK..........",
      ".......KGGGGGGGGGGGGGGGGGGGKGGGGKGGGGGGGGGGGGGGGGGGGK...........",
      ".......KGGGGGGGGGGGGGGGGGGKGGGGGKGGGGGGGGGGGGGGGGGGK............",
      "........KGGGGGGGGGGGGGGGGKGGGGGGKGGGGGGGGGGGGGGGGGK.............",
      "KKKKG....KGGGGGGGGGGGGGGKGGGGGGKKGGGGGGGGGGGGGGGSK.............."
    ],
  },
};

// 起動時に選ばれているパターン（main.js のパターン選択UIで変更される）
const DEFAULT_PATTERN_ID = 'rainbow';

const Blocks = {
  /** 選択可能なパターンの一覧（UI表示用） */
  getPatternIds() {
    return Object.keys(LEVEL_PATTERNS);
  },

  getPatternName(patternId) {
    return LEVEL_PATTERNS[patternId].name;
  },

  /**
   * 指定パターンの grid と blockTypes から、実際に描画・当たり判定に使う
   * ブロック配列を作る。
   * アイテムを持つブロック（★マーク）は、毎回ランダムに選び直される。
   * @param {number} canvasWidth
   * @param {string} patternId LEVEL_PATTERNS のキー
   * @returns {Array<object>} block { x, y, width, height, shape, color, hp, maxHp, score, alive, isItem }
   */
  buildLevel(canvasWidth, patternId) {
    const pattern = LEVEL_PATTERNS[patternId] || LEVEL_PATTERNS[DEFAULT_PATTERN_ID];
    const rows = pattern.grid;
    const cols = rows[0].length;

    const availableWidth = canvasWidth - CONFIG.BLOCK_AREA_SIDE_PADDING * 2;
    const blockWidth = (availableWidth - CONFIG.BLOCK_GAP * (cols - 1)) / cols;
    const blockHeight = blockWidth; // 正方形にして、ドット絵の縦横比が崩れないようにする

    const blocks = [];
    rows.forEach((rowStr, rowIndex) => {
      for (let col = 0; col < rowStr.length; col++) {
        const ch = rowStr[col];
        if (ch === '.' || ch === ' ') continue; // 空白マスはスキップ

        const type = pattern.blockTypes[ch];
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
          isItem: false, // このあと _assignRandomItems() でランダムに決める
        });
      }
    });

    Blocks._assignRandomItems(blocks);
    return blocks;
  },

  /**
   * ブロックの中からランダムに何個か選んで isItem = true にする。
   * 個数は CONFIG.ITEM_BLOCK_RATIO（総数に対する割合）を基準に、
   * ITEM_BLOCK_MIN 〜 ITEM_BLOCK_MAX の範囲に収める。
   */
  _assignRandomItems(blocks) {
    if (blocks.length === 0) return;

    const raw = Math.round(blocks.length * CONFIG.ITEM_BLOCK_RATIO);
    const count = Math.min(
      blocks.length,
      Math.max(CONFIG.ITEM_BLOCK_MIN, Math.min(CONFIG.ITEM_BLOCK_MAX, raw))
    );

    const chosenIndices = new Set();
    while (chosenIndices.size < count) {
      chosenIndices.add(Math.floor(Math.random() * blocks.length));
    }
    chosenIndices.forEach((i) => {
      blocks[i].isItem = true;
    });
  },

  /**
   * ブロック1個を、指定された形（shape）に応じて描画する。
   * 当たり判定は常に四角形（バウンディングボックス）で行うため、
   * 見た目の形を増やしてもロジック側の変更は不要。
   */
  drawBlock(ctx, block) {
    const { x, y, width: w, height: h, shape, color, hp, maxHp, isItem } = block;
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

    // アイテムが出るブロックには、小さな星マークの目印を付ける
    if (isItem) {
      Blocks._drawItemMarker(ctx, cx, cy, Math.min(w, h));
    }
  },

  _drawItemMarker(ctx, cx, cy, size) {
    const r = Math.max(2, size * 0.28);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = Math.max(0.5, size * 0.05);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const angle2 = angle + Math.PI / 5;
      const outerX = Math.cos(angle) * r;
      const outerY = Math.sin(angle) * r;
      const innerX = Math.cos(angle2) * r * 0.45;
      const innerY = Math.sin(angle2) * r * 0.45;
      if (i === 0) ctx.moveTo(outerX, outerY);
      else ctx.lineTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  /**
   * パターン選択UI用の小さなプレビュー画像（dataURL）を作る。
   * @param {string} patternId
   * @param {number} size 出力する正方形画像の一辺(px)
   * @returns {string} data URL
   */
  renderThumbnail(patternId, size) {
    const pattern = LEVEL_PATTERNS[patternId];
    const rows = pattern.grid;
    const cols = rows[0].length;
    const cell = size / Math.max(rows.length, cols);
    const offsetX = (size - cols * cell) / 2;
    const offsetY = (size - rows.length * cell) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(0, 0, size, size);

    rows.forEach((rowStr, rowIndex) => {
      for (let col = 0; col < rowStr.length; col++) {
        const ch = rowStr[col];
        if (ch === '.' || ch === ' ') continue;
        const type = pattern.blockTypes[ch];
        if (!type) continue;
        ctx.fillStyle = type.color;
        ctx.fillRect(
          offsetX + col * cell,
          offsetY + rowIndex * cell,
          cell + 0.5,
          cell + 0.5
        );
      }
    });
    return canvas.toDataURL();
  },
};
