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