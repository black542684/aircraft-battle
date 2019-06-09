// import './js/weapp-adapter';
import $background from './js/background.js';  // 背景移动
import _hero from './js/hero.js'; // 英雄
import _pool from './js/pool.js'; // 控制器
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var top = 0;
const background = $background(ctx);
const hero = _hero(ctx);
const pool = _pool(ctx,hero);
const bg = new Audio();
bg.src = '/audio/bgm.mp3';

hero.listen(); // 监听飞机移动
// 游戏开始函数
function move() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  top += 5;
  if (top > canvas.height) {
    top = 0;
  }
  // 背景音乐
  bg.loop = true;
  bg.play();
  // 背景
  background.draw(top);
  // 英雄
  hero.draw();
  // 敌机
  pool.drawEnemys(top);
  // 子弹
  pool.drawBullets(top, hero);
  // 爆炸
  pool.drawBooms(ctx, {x:100, y:100})
  // 积分
  pool.drawScores();
  // 游戏结束
  if (hero.over) {
    return ;
  }
  requestAnimationFrame(move);
}
move();
