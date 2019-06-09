function _hero (ctx) {
  const img = new Image();
  img.src= 'images/hero.png';
  const data = {
    init: {
      x: canvas.width/2 - 40,
      y: canvas.height - 100,
      w: 80,
      h: 80
    },
    over: false,
    flag: false,
    isOver: function (enemy) {
      if (this.init.x > enemy.init.x && this.init.x < enemy.init.x + enemy.init.w && this.init.y > enemy.init.y && this.init.y < enemy.init.y + enemy.init.h) {
        return this.over = true;
      }
    },
    draw: function () {
      ctx.drawImage(img, this.init.x, this.init.y, this.init.w, this.init.h);
    },
    listen: function () {
      canvas.addEventListener('mousedown', (e) => {
        let x = e.clientX;
        let y = e.clientY;
        // 判断手指是否在英雄上
        if (x > this.init.x && x < this.init.x + this.init.w && y > this.init.y && y < this.init.y + this.init.h){
          this.flag = true;
        }
      });
      canvas.addEventListener('mousemove', (e) => {
        if (!this.flag) return ;
        let x = e.clientX;
        let y = e.clientY;
        // 判断飞机是否超出屏幕
        if (x < this.init.w / 2) {
          x = this.init.w / 2;
        }
        if (x > canvas.width - this.init.w / 2) {
          x = canvas.width - this.init.w / 2;
        }
        if (y < this.init.h / 2) {
          y = this.init.h / 2;
        }
        if (y > canvas.height - this.init.h / 2) {
          y = canvas.height - this.init.h / 2;
        }
        // 移动飞机的位置
        this.init.x = x - this.init.w / 2;
        this.init.y = y - this.init.h / 2;
      });
      canvas.addEventListener('mouseup', (e) => {
        this.flag = false;
      });
    }
  };
  return data;
}
