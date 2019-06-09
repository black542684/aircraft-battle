// import _enemy from './enemy';
// import _bullet from './bullet';
// import _boom from './boom';
function _enemy (ctx) {
  let img = new Image();
  img.src = './images/enemy.png';
  // 绘制单个敌机
  let data = {
    init: {
      x: Math.random() * (canvas.width - 50),
      y: -50,
      w: 50,
      h: 50
    },
    status: true,
    draw: function () {
      this.init.y += 5;
      ctx.drawImage(img, this.init.x, this.init.y, this.init.w, this.init.h);
      // 判断飞机是否飞出屏幕
      if (this.init.y > canvas.height + this.init.h) {
        this.status = false;
      }
    },
    isBoom: function (bullet) {
      if(bullet.init.x > this.init.x && bullet.init.x < this.init.x + this.init.w && bullet.init.y > this.init.y && bullet.init.y < this.init.y + this.init.h){
        return true;
      }
    }
  };
  return data;
}
function _bullet (ctx, hero) {
  let img = new Image();
  img.src = 'images/bullet.png';
  let data = {
    init: {
      x: hero.init.x + hero.init.w / 2 - 8,
      y: hero.init.y - 15,
      w: 16,
      h: 30
    },
    status: true,
    draw: function () {
      this.init.y -= 5;
      if (this.init.y > canvas.height + this.init.h) {
        this.status = false;
      }
      ctx.drawImage(img, this.init.x, this.init.y, this.init.w, this.init.h);
    }
  };
  return data;
}
function _boom (ctx, position) {
  let data = {
    init: {
      x: position.x,
      y: position.y,
      w: 50,
      h: 50
    },
    index: 0,
    status: true,
    draw: function (animation) {
      let img = animation[this.index];
      ctx.drawImage(img, this.init.x, this.init.y, this.init.w, this.init.h);
      // console.log(this.index)
      this.index += 1;
      if (this.index > 18) {
        this.index = 18;
        this.status = false;
      }
    }
  };
  return data;
}
function _layer (ctx) {
  let img = new Image();
  img.scr = 'images/Common.png';
  return {
    draw: function () {
      ctx.drawImage(img, 4, 115, 111, 101, (canvas.width - 111) / 2, (canvas.height - 101) / 2, 110, 110);
    }
  }
}
function _pool (ctx, hero) {
  const bulletMusic = new Audio();
  const boomMusic = new Audio();
  bulletMusic.src = './audio/bullet.mp3';
  boomMusic.src = './audio/boom.mp3';
  let data ={
    animation: [],
    enemys: [],
    bullets: [],
    booms: [],
    // 积分
    scores: 0,
    // 敌机绘制
    drawEnemys: function (top) {
      // 批量产生敌机
      if (top % 100 === 0) {
        let enemy = _enemy(ctx);
        this.enemys.push(enemy);
      }
      // 过滤敌机
      this.enemys = this.enemys.filter(item => item.status);
      // 绘制敌机
      this.enemys.forEach(item => {
        item.draw();
        hero.isOver(item);
        this.bullets.forEach(bullet => {
          if(item.isBoom(bullet)){
            // 被击中以后，子弹消失
            bullet.status = false;
            // 敌机消失
            item.status = false;
            // 产生一次爆炸
            let boom = _boom(ctx, bullet.init);
            this.booms.push(boom);
            // 积分加 1
            this.scores += 1;
          }
        })
      })
    },
    // 绘制子弹
    drawBullets: function (top, hero) {
      // 批量产生子弹
      if (top % 40 === 0) {
        let bullet = _bullet(ctx, hero);
        this.bullets.push(bullet);
      }
      // 过滤子弹
      this.bullets = this.bullets.filter(item => item.status);
      // 绘制子弹
      this.bullets.forEach(item => {
        item.draw(this.animation);
        bulletMusic.play();
      });
    },
    // 绘制爆炸
    drawBooms: function () {
      // 过滤爆炸
      this.booms = this.booms.filter(item => item.status);
      this.booms.forEach(item => {
        item.draw(this.animation);
        boomMusic.play();
      });
      
    },
    // 绘制积分
    drawScores: function () {
      ctx.font = '26px 微软雅黑';
      ctx.fillStyle = '#fff';
      ctx.fillText('当前积分:' + this.scores, 10, 30);
    },
    // 绘制结束框
    drwaLayer: function () {
      // 产生一弹出框
      let layer = _layer(ctx);
      layer.draw();
    }
  };
  for (let i = 1; i <= 19; i++) {
    let img = new Image();
    img.src = `images/explosion${i}.png`;
    data.animation.push(img);
  }
  return data;
}
