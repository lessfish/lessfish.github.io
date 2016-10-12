// what's more ?
// 1. loading 动画
// 2. 像素级碰撞检测
// 3. 兼容性（IE7、IE8 引入插件 http://excanvas.sourceforge.net/ -> VML）
// 4. 游戏可配置（config 文件），其他功能增加、UI优化等
// 5. 有 bug, canvas 的不流畅, 如何无缝移动？事件监听写法有误

// 动态生成 canvas 标签，控制长宽
window.canvas = document.createElement('canvas');
window.ctx = canvas.getContext('2d');
canvas.height = window.height = window.innerHeight;
canvas.width = window.width = window.innerWidth / 3 * 2;
document.body.appendChild(window.canvas);

var game = {
  stars: []
  , truck: null
  , text: null
  , preTime: undefined
  , startTime: undefined
  , countdown: undefined
  , isOver: false
  , score: 0
  , isStart: false
  , isKeyDown: false
  , keyDown: {}

  , update: function() {
    this.truck.update();

    for (var i = 0, len = this.stars.length; i < len; i++)
      this.stars[i].update();
  }

  // 碰撞检测，判断得分 or 游戏结束等
  , checkAll: function() {
    for (var i = this.stars.length; i--; ) {
      var item = this.stars[i]
        , f = item.f;

      var isHit = this.check(this.truck, item);

      if (!isHit)
        continue;

      if (!f) {
        this.score++;
        this.stars.splice(i, 1);
      } else {
        this.gameOver();
      }
    }
  }

  // 碰撞检测
  , check: function(a, b) {
    return this.computeArea(a.pos.x, a.pos.y, a.pos.x + a.width, a.pos.y + a.height
      , b.pos.x, b.pos.y, b.pos.x + b.width, b.pos.y + b.height) > 0;
  }

  // 获取矩形相交面积
  , computeArea: function(A, B, C, D, E, F, G, H) {
    var width, height;

    if (C <= E || G <= A || D <= F || H <= B)
      width = height = 0;
    else {
      var tmp = [A, C, E, G].sort(function(a, b) {
        return a - b;
      });

      width = tmp[2] - tmp[1];

      tmp = [B, D, F, H].sort(function(a, b) {
        return a - b;
      });

      height = tmp[2] - tmp[1];
    }

    return width * height;
  }

  , draw: function() {
    this.truck.draw();
    this.text.draw();

    for (var i = 0, len = this.stars.length; i < len; i++)
      this.stars[i].draw();
  }

  , render: function() {
    ctx.clearRect(0, 0, width, height);
    this.update();
    this.checkAll();
    this.draw();

    // create new star
    if (+new Date - this.preTime > getRandomInt(500, 1000)) {
      this.stars.push(new Star());
      this.preTime = + new Date;
    }

    // countdown time
    if (+new Date - this.startTime > 1000) {
      this.countdown--;

      if (this.countdown === -1)
        this.gameOver();

      this.startTime = +new Date;
    }
  }

  , init: function() {
    this.truck = truck;
    this.truck.init();
    this.text = text;
    this.addEventListener();

    // game notice
    ctx.font = '20px 微软雅黑 bold';
    ctx.fillStyle = 'rgba(168,168,168,1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Let your Truck get Coins, and don't Touch Bomb", width/2, height/2 -30);
    ctx.fillText("Try to get as many coins as possible within 30 seconds", width/2, height/2);
    ctx.fillText("Press Space to Start the game and \"←  →  ↑  ↓\" to move the Truck", width/2, height/2+30);
  }

  , gameOver: function() {
    this.isOver = true;

    setTimeout(function() {
      // show final score
      ctx.font = " 80px Monospace"
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = 'red';
      ctx.fillText("game over!", width / 2, height / 2 - 50);
      ctx.fillText("score: " + game.score, width / 2, height / 2 + 20);
    }, 100);
  }

  , addEventListener: function() {
    document.onkeydown = function(e) {
      var num = e.keyCode;

      if (num === 32) { // 按空格键开始游戏
        if (game.isStart)
          return;

        game.isStart = true;

        // create star
        game.stars.push(new Star());
        game.startTime = +new Date;
        game.preTime = +new Date;
        game.countdown = 30;

        // 启动
        requestAnimFrame(animationLoop);
        return;
      }

      game.keyDown[num] = true;
    };

    document.onkeyup = function(e) {
     var num = e.keyCode;
     delete game.keyDown[num];
    };
  }
};

var truck = {
  pos: new Vector2()
  , img: null
  , width: 80
  , height: 80

  , update: function() {
    if (37 in game.keyDown)  // left
      this.pos.add(new Vector2(-5, 0));

    if (39 in game.keyDown) // right
      this.pos.add(new Vector2(5, 0));

    if (38 in game.keyDown) // up
      this.pos.add(new Vector2(0, -5));

    if (40 in game.keyDown) // down
      this.pos.add(new Vector2(0, 5));

    if (this.pos.x < 0)
      this.pos.x = 0;
    else if (this.pos.x + this.width > window.width)
      this.pos.x = window.width - this.width;

    if (this.pos.y < 0)
      this.pos.y = 0;
    else if (this.pos.y + this.height > window.height)
      this.pos.y = window.height - this.height;
  }

  , draw: function() {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }

  , init: function() {
    this.pos.reset(width / 2, height - 100);
    this.img = new Image();
    // onload
    this.img.src = 'images/truck.png';
  }
};

// show the score and countdown
var text = {
  draw: function() {
    // score
    ctx.font = "30px Monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = 'red';
    ctx.fillText('score: ' + game.score, 0, 0);

    // countdown
    ctx.font = "100px Monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillText(game.countdown, width / 2, height / 2);
  }
};

function animationLoop() {
  if (game.isOver)
    return;
  game.render();
  requestAnimFrame(animationLoop);
}

// start
game.init();