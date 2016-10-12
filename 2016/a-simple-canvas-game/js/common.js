/* requestAnimationFrame */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

/* 二维矢量类 */
function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2.prototype.reset = function(x, y) {
  this.x = x || this.x;
  this.y = y || this.y;
};

Vector2.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
};

function getRandomInt(a, b) {
  return a + ~~(Math.random() * (b - a));
}

// star 类
function Star() {
  this.pos = new Vector2(getRandomInt(0, width - 100), 0);
  this.width = 50;
  this.height = 50;
  this.img = new Image();
  this.f = Math.random() > 0.5;
  // a bomb runs faster than a star
  this.speed = this.f ? getRandomInt(3, 5) : getRandomInt(2, 4);
  this.img.src = this.f ? 'images/bomb.png' : 'images/star.png';
}

Star.prototype.update = function() {
  this.pos.y += this.speed;
};

Star.prototype.draw = function() {
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};