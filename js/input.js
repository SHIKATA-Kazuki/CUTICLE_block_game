// ============================================================
// 入力（タッチ / マウス）操作
//
// 仕様:
//   ・canvas の右半分をタッチ（クリック） → 右へ移動
//   ・canvas の左半分をタッチ（クリック） → 左へ移動
//   ・押しっぱなし（長押し）の間はその方向へ移動し続ける
//   ・指を離す（クリックを離す）と停止する
// ============================================================
class InputController {
  constructor(canvas) {
    this.canvas = canvas;
    this.direction = 0; // -1: 左, 0: 停止, 1: 右
    this._mouseDown = false;
    this._bindTouchEvents();
    this._bindMouseEvents(); // PCブラウザでの動作確認用
  }

  getDirection() {
    return this.direction;
  }

  _directionFromClientX(clientX) {
    const rect = this.canvas.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    return relativeX < rect.width / 2 ? -1 : 1;
  }

  _bindTouchEvents() {
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.direction = this._directionFromClientX(e.touches[0].clientX);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      // 指を左右にドラッグした場合も、今いる側に合わせて方向を更新する
      this.direction = this._directionFromClientX(e.touches[0].clientX);
    }, { passive: false });

    const stop = (e) => {
      e.preventDefault();
      this.direction = 0;
    };
    this.canvas.addEventListener('touchend', stop, { passive: false });
    this.canvas.addEventListener('touchcancel', stop, { passive: false });
  }

  _bindMouseEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this._mouseDown = true;
      this.direction = this._directionFromClientX(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!this._mouseDown) return;
      this.direction = this._directionFromClientX(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      this._mouseDown = false;
      this.direction = 0;
    });
  }
}
