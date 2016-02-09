function Garden(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.imgData = null;
  // the pixels where the words lie
  this.printPixels = [];
  // the pixels which have already been drawn
  this.hash = [];
  // the pixels which should be drawn
  this.list = [];
  // control the speed
  this.maxn = 0.99995;
  // the number of the pixels to draw
  this.count = 0;
  // the handle of the timer
  this.timer = null;
}

Garden.prototype = {
  // init the canvas to get the positions of pixels to draw
  init: function() {
    this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < this.imgData.width; i++)
      for(var j = 0; j < this.imgData.height; j++)
        // if the pixel is in the word, then push
        if(this.getPixel(i, j)[3] > 0 ) {
          this.printPixels.push([i, j]);
          this.count++;
        }
  },

  createText: function(font, color, text, x, y) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  },

  // get the rgba of a pixel
  getPixel: function(x, y) {
    var index = (x + y * this.imgData.width) * 4;
    var r = this.imgData.data[index + 0];
    var g = this.imgData.data[index + 1];
    var b = this.imgData.data[index + 2];
    var a = this.imgData.data[index + 3];
    return [r, g, b, a];
  },

  render: function() {
    var len = this.printPixels.length;
    for(var i = 0; i < len; i++) {
      if(this.hash[i]) 
        continue;
      if(Math.random() < this.maxn) {
        continue;
      }
      var x = this.printPixels[i][0];
      var y = this.printPixels[i][1];
      this.hash[i] = true;
      var point = new Pixel(x, y, this);
      this.list.push(point);
    }

    len = this.list.length;
    if(len > this.count / 10)
      clearInterval(this.timer);

    for(var i = 0; i < len; i++) {
      this.list[i].grow();
    }
  }
};

function Pixel(x, y, garden) {
  this.x = x;
  this.y = y;
  this.garden = garden;
  this.angle = Math.random() * 2 * Math.PI - Math.PI;
  this.v = 0;
  this.length = 0;
  // the length from one pixel
  this.maxLength = 30;
  // the bending
  this.step = 0.02;
}

Pixel.prototype = {
  grow: function() {
    if(this.length < this.maxLength) {
      this.x += Math.cos(this.angle);
      this.y += Math.sin(this.angle);
      this.v += Math.random() * this.step - this.step / 2;
      this.angle += this.v;   
    
      if(this._x) {
        var alpha = this.length / this.maxLength;     
        //  var r = 8;  // 黑字绿丛效果
        var r = 200;
        var g = parseInt(alpha * 255);
         // var b = 32;
        var b = 50;
        this.garden.ctx.strokeStyle="rgba(" + r + "," + g + "," + b + "," + (1 - alpha) + ")";
        this.garden.ctx.beginPath();
        this.garden.ctx.moveTo(this._x, this._y);
        this.garden.ctx.lineTo(this.x, this.y);
        this.garden.ctx.stroke();   
      }

      this._x = this.x;
      this._y = this.y;
      this.length += 1;
    }
  }
};