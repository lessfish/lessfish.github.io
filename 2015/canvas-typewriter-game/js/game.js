// 主流程
var game = {
  keys: [],
  stage: undefined,
  wordIndex: -1, // 当前正在kill的word编号，默认-1
  letterIndex: -1, //
  timeIndex: +new Date, // 时间戳，控制速度
  score: 0,
  hash: [], // hash killed words
  timeInterval: 1800,
  isOver: false,

  addListener: function() {
    addEventListener("keydown", function(e) {
      // game.keys[e.keyCode] = true;
      var s = String.fromCharCode(e.keyCode).toLowerCase();
      // 还没有新的word需要消除，寻找
      if(game.wordIndex === -1) {
        for(var i = 0; i < game.stage.words.length; i++) {
          if(game.hash[i]) continue;
          var l = game.stage.words[i].letters;
          if(l[0].letter === s) {
            l[0].color = 'rgba(168,168,168,1)';
            game.wordIndex = i;
            game.letterIndex = 0;
            if(game.letterIndex + 1 === game.stage.words[game.wordIndex].word.length) {
              // disappear
              game.score++;
              game.stage.words[game.wordIndex].disappear(game.wordIndex);
              game.hash[game.wordIndex] = true;
              game.wordIndex = -1;
            }
            break;
          }
        }
      } else {  // 正在消除中
        if(game.stage.words[game.wordIndex].letters[game.letterIndex + 1].letter === s) {
          game.stage.words[game.wordIndex].letters[game.letterIndex + 1].color = 'rgba(168,168,168,1)';
          game.letterIndex += 1;
          if(game.letterIndex + 1 === game.stage.words[game.wordIndex].word.length) {
            // disappear
            game.score++;
            game.stage.words[game.wordIndex].disappear(game.wordIndex);
            game.hash[game.wordIndex] = true;
            game.wordIndex = -1;
          }
        }
      }
    }, false);
  },

  init: function() {
    this.stage = new Collection();
    var index = ~~(words.length * Math.random());
    this.stage.words.push(words[index]);
    words.splice(index, 1)
  },

  check: function() {
    // 判断游戏结束，其实可在每帧的ball的位置变化中判断
  },

  render: function() {
    this.stage.draw();
    this.stage.update();
    if(+new Date - this.timeIndex > this.timeInterval && words.length) {
      var index = ~~(words.length * Math.random());
      this.stage.words.push(words[index]);
      words.splice(index, 1)
      this.timeIndex = +new Date;
      // control speed
      if(words.length % 10 === 0)
        this.timeInterval -= 100;
    }

    // show score
    ctx.font = " 30px Monospace"
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = 'red';
    ctx.fillText('score: ' + this.score, 0, 0);

    if(this.score === 50) {
      this.isOver = true;
      ctx.font = '50px 微软雅黑 bold';
      ctx.fillStyle = 'rgba(168,168,168,1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('you are the best!', width/2, height/2 - 50);
      ctx.fillText('score: ' + game.score, width/2, height/2);
    }
  }
};

game.init();
game.addListener();

//调用 相当于setTimeout里的callback
function animationLoop(){
  // logic
  game.render();
  // 循环
  if(!game.isOver)
    requestAnimFrame(animationLoop);
  else {
    // game over
    if(game.score === 50) return;
    ctx.font = '50px 微软雅黑 bold';
    ctx.fillStyle = 'rgba(168,168,168,1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('game over!', width/2, height/2 - 50);
    ctx.fillText('score: ' + game.score, width/2, height/2);
  }
}

// 启动
requestAnimFrame(animationLoop);