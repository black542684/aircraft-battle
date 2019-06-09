function _background (ctx) {
  const img = new Image();
  img.src = 'images/bg.jpg';
  const _background = {
    draw: function (top) {
      ctx.drawImage(img, 0, top - canvas.height, canvas.width,canvas.height);
      ctx.drawImage(img, 0, top,canvas.width, canvas.height);
      // console.log(top)
    }
  };
  return _background;
}
