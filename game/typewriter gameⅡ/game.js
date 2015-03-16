(function() {
  var game = {
    currentIndex: 0,  // 当前type div
    letterIndex: 0, // 
    changeIndex: 8,  // 拐角createWord的div
    rotateDeg: 0, // control the speed
    totalDeg: 0,  // total rotated deg
    score: 0,
    map: [],
    isStart: false,
    isOver: false,

    addListener: function() {
      addEventListener("keydown", function(e) {
        var s = String.fromCharCode(e.keyCode).toLowerCase();
        // 如果是空格键 则开始游戏
        if(s === ' ') game.start();
        if(game.isStart) game.changeColor(s);
      });
    },

    changeColor: function(s) {
      var d = document.getElementsByClassName('circle');
      for(var i = 0; i < d.length; i++) {
        if(d[i].index !== this.currentIndex) continue;
        var c = d[i].getElementsByClassName('cell');
        if(c[this.letterIndex].innerHTML.toLowerCase() !== s) return;
        c[this.letterIndex].style.color = 'rgba(168,168,168,1)';
        this.letterIndex++;
        
        // 一个单词打完
        if(this.letterIndex === c.length) {
          // control speed
          if(this.letterIndex % 5 === 4) 
            this.rotateDeg += 2;

          this.currentIndex++;
          this.score++;
          this.letterIndex = 0;
        }
        return;
      }
    },

    rotate: function() {
      // 不能转过头 即当前单词不能不可见
      var d = document.getElementById('container');
      this.totalDeg -= this.rotateDeg / 60;
      d.style.webkitTransform = ''
      + 'rotateY(' + this.totalDeg + 'deg)'
    },

    // 当某个div出现在盲区 totalDeg = 28 + 40 * n
    createWord: function() {
      if( (~~-this.totalDeg) % 40 !== 28 || this.map[(~~-this.totalDeg)]) return;
      // hash degs
      this.map[(~~-this.totalDeg)] = true;
      var d = document.getElementsByClassName('circle');
      for(var i = 0; i < d.length; i++) {
        if(d[i].index !== this.changeIndex) continue;
        if((~~-this.totalDeg) === 28) this.changeIndex = 0;
        else {
          this.changeIndex++;
          d[i].index += 9;
        }
        
        var c = d[i].getElementsByClassName('cell');
        // 必须倒着来 notice
        for(var j = c.length - 1; j >= 0; j--) {
          d[i].removeChild(c[j]);
        }

        var word = window.array[~~(Math.random() * window.array.length)];
        var left = (100 - word.length * 8) / 2;

        for(var j = 0; j < word.length; j++) {
          var c = document.createElement('div');
          c.className = 'cell font';
          c.innerHTML = word[j];
          c.style.left = left + j * 8;
          d[i].appendChild(c);
        }
        return;
      }
    },

    start: function() {
      this.rotateDeg = 10;
      this.isStart = true;
    },

    // 展示当前的分数
    showScore: function() {
      var d = document.getElementById('score').getElementsByClassName('score-font')[0];
      d.innerHTML = 'score: ' + this.score;
    },

    // 判断游戏结束 & if结束弹出结果层
    // 游戏结束判断节点即当前打字div不在视野范围内
    showResult: function() {  
      if((~~-this.totalDeg) >= 68 && this.changeIndex === this.currentIndex + 1) {
        document.getElementById('result').style.visibility = 'visible';
        document.getElementById('result').className = 'add';
        // stop rotating
        this.isOver = true;
        this.rotateDeg = 0;
      }
    }
  };

  game.addListener();
  //调用 相当于setTimeout里的callback
  function animationLoop(){   
    // logic  
    game.rotate();
    game.showResult();
    game.showScore();
    game.createWord();
    // 循环
    if(!game.isOver)
      requestAnimFrame(animationLoop);
  }  
  // 启动
  requestAnimFrame(animationLoop);
})();