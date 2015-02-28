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
      // alert(e.keyCode)
      var s = String.fromCharCode(e.keyCode).toLowerCase();
      // alert(s)

      // 还没有新的word需要消除，寻找
      // alert(game.wordIndex)
      if(game.wordIndex === -1) {
        for(var i = 0; i < game.stage.words.length; i++) {
          if(game.hash[i]) continue;
          var l = game.stage.words[i].letters;

          // console.log(l)
          // for(var j = 0; j < l.length; j++) {
          //   if(l[j].letter === s) {
          //     l[j].color = 'white';
          //     l[j].disappear();
          //   }
              
          // }
          if(l[0].letter === s) {
            l[0].color = 'white';
            game.wordIndex = i;
            game.letterIndex = 0;
            break;
          }

        }
      } else {
        // alert('hello')
        // alert(game.stage.words[game.wordIndex].letters[game.letterIndex + 1].letter)
        if(game.stage.words[game.wordIndex].letters[game.letterIndex + 1].letter === s) {
          game.stage.words[game.wordIndex].letters[game.letterIndex + 1].color = 'white';
          game.letterIndex += 1;
          if(game.letterIndex + 1 === game.stage.words[game.wordIndex].word.length) {
            // disappear
            game.score++;
            // word的生命已经结束，但是并没有从数组中消去，影响了后续的操作
            // 但是如果马上消去，又会影响抛物运动
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
    // this.stage.words.push(new Word('hello'));
    var index = ~~(words.length * Math.random());
    // console.log(index)
    this.stage.words.push(words[index]);
    // this.stage.words.push(new Word('hello'));

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
      // console.log(index)
      // console.log(index)
      this.stage.words.push(words[index]);
      words.splice(index, 1)
      this.timeIndex = +new Date;

      if(words.length % 10 === 0)
        this.timeInterval -= 100;
      // 1600已经吃不消
    }

    ctx.font = " 30px Monospace"
    // ctx.fontFamily = "Times New Roman"
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = 'red';
    ctx.fillText('score: ' + this.score, 0, 0);
  }
};

game.init();
game.addListener();
window.handle = setInterval(function() {
  game.render();
}, 1000/60);