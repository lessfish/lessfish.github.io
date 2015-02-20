/*
  common.js
  common javascript of zichi
  @author zichi
*/


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


/* Color */
function getRandomColor() {
  return '#' + ('00000' + parseInt(Math.random() * 0xffffff).toString(16)).slice(-6);
}

function Color(r, g, b, a) {
  this.r = r || Math.random() * 255;
  this.g = g || Math.random() * 255;
  this.b = b || Math.random() * 255;
  this.a = a || Math.random() * 255;  // 0~1?
}

Color.prototype.setR = function(r) {
  this.r = r;
};

Color.prototype.setG = function(g) {
  this.g = g;
};

Color.prototype.setB = function(b) {
  this.b = b;
};

Color.prototype.setA = function(a) {
  this.a = a;
};

Color.prototype.setRGBA = function(r, g, b, a) {
  this.r = r || this.r;
  this.g = g || this.g;
  this.b = b || this.b;
  this.a = a || this.a;
};


/* Number */
function getRandomNum(a, b) {
  return a + Math.random() * (b - a);
}

function getRandomInt(a, b) {
  return a + ~~Math.random() * (b - a);
}