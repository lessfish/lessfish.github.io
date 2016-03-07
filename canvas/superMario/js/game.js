var stage = new createjs.Stage("myCanvas");

var manifest = [
  {src:"imgs/ground.gif" , id:"ground"},
  {src:"imgs/mario-sprites.png" , id:"mario"},
  {src:"imgs/cloud.gif" , id:"cloud"},
  {src:"imgs/brick.gif" , id:"brick"},
  {src:"imgs/pipe.png" , id:"pipe"},
  {src:"imgs/finalBrick.gif" , id:"finalBrick"},
  {src:"imgs/hill.gif" , id:"hill"},
  {src:"imgs/grove.gif" , id:"grove"},
  {src:"imgs/monster.png", id:"monster"},
  {src:"imgs/flag.gif", id:"flag"},
  {src:"imgs/flagBrick.gif", id:"flagBrick"},
  {src:"imgs/target.gif", id:"target"},
  {src:"imgs/pole.gif", id:"pole"}
];

loader = new createjs.LoadQueue(false);
loader.addEventListener("complete" , handleComplete);
loader.loadManifest(manifest);

function handleComplete() {
  initData();
}

// 设置 flag 是为了像素级精确
function update(dis, flag) {

  if (flag) {
    var f = mario.lastDirction === "right" ? 1 : -1;

    for (var i in bricks)
      bricks[i].x -= flag ? dis: mario.v.x * f;

    for (var i in finalBricks) 
      finalBricks[i].x -= flag ? dis : mario.v.x * f;

    for (var i in groves) 
      groves[i].x -= flag ? dis: mario.v.x * f;

    for (var i in hills) 
      hills[i].x -= flag ? dis: mario.v.x * f;

    for (var i in clouds) 
      clouds[i].x -= flag ? dis : mario.v.x * f;

    for (var i in pipes)
      pipes[i].x -= flag ? dis : mario.v.x * f;

    for (var i in grounds)
      grounds[i].x -= flag ? dis : mario.v.x * f;

    for (var i in monsters)
      monsters[i].x -= flag ? dis : mario.v.x * f;

    for (var i in targets)
      targets[i].x -= flag ? dis : mario.v.x * f;

    return;
  }


  if (mario.lastDirction === "left") {
    if (mario.x >= 0)
      mario.x -= mario.v.x;

    if (mario.x <= 0)
      mario.x = 0;
  } else {
    if (mario.x < 220) {
      mario.x += mario.v.x;
      if (mario.x >= 220)
        mario.x = 220;
    } else {
      var f = mario.lastDirction === "right" ? 1 : -1;

      for (var i in bricks)
        bricks[i].x -= flag ? dis: mario.v.x * f;

      for (var i in finalBricks) 
        finalBricks[i].x -= flag ? dis : mario.v.x * f;

      for (var i in groves) 
        groves[i].x -= flag ? dis: mario.v.x * f;

      for (var i in hills) 
        hills[i].x -= flag ? dis: mario.v.x * f;

      for (var i in clouds) 
        clouds[i].x -= flag ? dis : mario.v.x * f;

      for (var i in pipes)
        pipes[i].x -= flag ? dis : mario.v.x * f;

      for (var i in grounds)
        grounds[i].x -= flag ? dis : mario.v.x * f;

      for (var i in monsters)
        monsters[i].x -= flag ? dis : mario.v.x * f;

      for (var i in targets)
        targets[i].x -= flag ? dis : mario.v.x * f;
    }
  }
}

// check if mario is on ground
function checkIfOnGround() {

  for (var i = 0; i < grounds.length; i++) {
    var ground = grounds[i];
    if (mario.x + 32 >= ground.x && mario.x + 32 <= ground.x + 32)
      return true;

    if (mario.x >= ground.x && mario.x <= ground.x + 32)
      return true;
  }
  return false;
}


function checkIfOnBrick() {
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (mario.x + 32 >= brick.x && mario.x + 32 <= brick.x + 32)
      return true;

    if (mario.x >= brick.x && mario.x <= brick.x + 32)
      return true;
  }
  return false;
}

function isSame(a, b) {
  return Math.abs(a - b) <= 10;
}

function checkIfOnFinalBrick() {
  for (var i = 0; i < finalBricks.length; i++) {
    var finalBrick = finalBricks[i];
    if (mario.x + 32 >= finalBrick.x && mario.x + 32 <= finalBrick.x + 32 && isSame(mario.y + 52, finalBrick.y))
      return true;

    if (mario.x >= finalBrick.x && mario.x <= finalBrick.x + 32 && isSame(mario.y + 52, finalBrick.y))
      return true;
  }

  return false;
}


// if mario is on the pipe, return true
// else return false
function checkIfOnPipe() {
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    if (mario.x + 32 >= pipe.x && mario.x + 32 <= pipe.x + 60)
      return true;

    if (mario.x >= pipe.x && mario.x <= pipe.x + 60)
      return true;
  }
  return false;
}

function monsterCheckHitWithPipe(A, B, C, D, E, F, G, H) {
  // 转为对角线坐标
  C += A, D += B, G += E, H += F;

  // 没有相交
  if (C <= E || G <= A || D <= F || H <= B)
    return [0, 0, 0, 0];

  var tmpX, tmpY;

  if (E > A) {
   tmpX = G < C ? [E, G] : [E, C];
  } else {
   tmpX = C < G ? [A, C] : [A, G];
  }

  if (F > B) {
   tmpY = H < D ? [F, H] : [F, D];
  } else {
   tmpY = D < H ? [B, D] : [B, H];
  }

  return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
}

function marioWithMonsterHitCheck(A, B, C, D, E, F, G, H) {
  // 转为对角线坐标
  C += A, D += B, G += E, H += F;

  // 没有相交
  if (C <= E || G <= A || D <= F || H <= B)
    return [0, 0, 0, 0];

  var tmpX, tmpY;

  if (E > A) {
   tmpX = G < C ? [E, G] : [E, C];
  } else {
   tmpX = C < G ? [A, C] : [A, G];
  }

  if (F > B) {
   tmpY = H < D ? [F, H] : [F, D];
  } else {
   tmpY = D < H ? [B, D] : [B, H];
  }

  return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
}

function monstersUpdate() {
  // monsters 自身的移动 
  // 与键盘事件无关
  // console.log(mario.isJump);

  if (mario.isOverByHit)
    return;

  // console.log(monsters.length)
  for (var i = 0; i < monsters.length; i++) {
    // if (i === 3)
    //   console.log(123)
    // console.log(i, monsters.length);

    var monster = monsters[i];

    if (monster.isOnBrick === true) {
      // console.log(monster.x + 30 , bricks[0].x)
      if (monster.x + 30 <= bricks[0].x) {
        monster.isOnPipe = false;
        monster.isJump = true;
        monster.v.y = 5;
      }
    } else if (monster.isOnGround) {
      // check if monster is still on ground
      var isStillOnGround = false;
      for (var ii = 0; ii < grounds.length; ii++) {
        var ground = grounds[ii];
        if (monster.x >= ground.x - 30 && monster.x <= ground.x + 32) 
          isStillOnGround = true;
      }

      if (isStillOnGround === false) {
        monster.a.y = 1;
      }
      // check if hit with pipe
      // if hit, then make the speed dirction reverse
      var isHitWithPipe = false;
      for (var ii = 0; ii < pipes.length; ii++) {
        var pipe = pipes[ii];
        var rect = monsterCheckHitWithPipe(monster.x, monster.y, 30, 30, 
          pipe.x, pipe.y, 113*0.5, 112*0.6);

        // 相交面积大于 0 即为碰撞
        var isHit = (rect[2] - rect[0]) * (rect[3] - rect[1]) > 0;
        if (isHit) {
          isHitWithPipe = true;
          // break;
        }
      }

      if (isHitWithPipe) {
        monster.v.x *= -1;
      }
    }


    // 在视口时才更新 monster 自身数据
    if (monster.x >= 0 && monster.x <= 600) {
      // if (i === 3)
        // console.log(123)
      // console.log(monster.x)
      monster.x += monster.v.x;
      monster.y += monster.v.y;
      monster.v.y += monster.a.y;
    }
    

    if (monster.y > 370 && !monster.isDead) {
      monster.isOnGround = true;
      monster.v.y = 0;
      monster.a.y = 0;
      monster.y = 370;
    }

    // monster 还活着
    if (!monster.isDead) {
      // check if 被踩死
      // 如果被踩死，则改变 monster's action、v、a 等一系列的值
      // mario 和 monster 碰撞
      // 相交矩形坐标信息
      var rect = marioWithMonsterHitCheck(mario.x, mario.y, 32, 52, 
        monster.x, monster.y, 30, 30);

      // 相交面积大于 0 即为碰撞
      var isHit = (rect[2] - rect[0]) * (rect[3] - rect[1]) > 0;
      // if (true) {
      if (mario.x >= monster.x - 32 && mario.x <= monster.x + 30 + 32 && mario.y + 52 < monster.y && mario.y + 52 + mario.v.y > monster.y) {
        monster.isDead = true;
        monster.action = 2;
        monster.a.y = 5;
        monster.v.x = 0;
        monster.v.y = 10;
        monster.gapTime = 100;
      } else if (isHit) {
        mario.isOverByHit = true;
        mario.a.y = 1;
      }
      // if (isHit) {
      //   // console.log(mario.y + 52, monster.y, mario.isJump)
      //   // monster 被踩死
      //   // if (mario.y + 52 <= monster.y && mario.y + 52 + mario.v.y >= monster.y) {
      //   if (mario.y + 52 > monster.y && mario.isJump) {
      //   // if (true) {
      //     console.log(123)
      //     monster.isDead = true;
      //     monster.action = 2;
      //     monster.a.y = 5;
      //     monster.v.x = 0;
      //     monster.v.y = 10;
      //     monster.gapTime = 100;
      //   } else { // 游戏结束
      //     mario.isOverByHit = true;
      //     mario.a.y = 1;
      //   }
      // }
    }
    
    

    if (!monster.lastDrawTime) {
      monster.lastDrawTime = +new Date;
    } else if (+new Date - monster.lastDrawTime > monster.gapTime) {

      monster.lastDrawTime = +new Date;

      if (monster.isDead) {
        monster.action = 2;
      } else {
        monster.action = monster.action === 0 ? 1 : 0;
      }

      monster.gotoAndStop(monster.action);
    }
  }
}


function rightMarioPipe() {
  // check hit with pipe left
  var pipe_left = false;
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    if (mario.x + 32 <= pipe.x && mario.x + 32 + mario.v.x > pipe.x && mario.y + 52 > pipe.y)
      pipe_left = pipe.x;
  }

  if (pipe_left)
    update(pipe_left - mario.x - 32, true);
  else 
    update();

  // if (!mario.lastDrawTime) {  // start to move
  //   mario.lastDrawTime = +new Date;
  //   // mario.action = 0;
  // } else if (+new Date - mario.lastDrawTime > 80) {
  //   mario.lastDrawTime = +new Date;
  //   mario.action = mario.action === 0 ? 1 : 0;
  // }
}

function leftMarioPipe() {
  // check hit with pipe right
  var pipe_right = false;
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    if (mario.x >= pipe.x + 113 * 0.5 && mario.x - mario.v.x < pipe.x + 113 * 0.5 && mario.y + 52 > pipe.y)
      pipe_right = pipe.x;
  }

  if (pipe_right)
    update(pipe_right + 113 * 0.5 - mario.x, true);
  else 
    update();

  // if (!mario.lastDrawTime) {
  //   mario.lastDrawTime = +new Date;
  //   mario.action = 8;
  // } else if (+new Date - mario.lastDrawTime > 80) {
  //   mario.lastDrawTime = +new Date;
  //   mario.action = mario.action === 8 ? 9 : 8;
  // }
}

function leftMarioBrick() {
  // return;
  // console.log(123)
  // check hit with brick right
  var brick_right = false;
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (mario.x >= brick.x + 32 && mario.x - mario.v.x < brick.x + 32 && mario.y + 52 > brick.y)
      brick_right = brick.x;
  }

  // console.log(brick_right)
  if (brick_right) 
    update(brick_right + 32 - mario.x, true);
  else 
    update();

  // if (!mario.lastDrawTime) {
  //   mario.lastDrawTime = +new Date;
  //   action = 8;
  // } else if (+new Date - mario.lastDrawTime > 80) {
  //   lastDrawTime = +new Date;
  //   action = action === 8 ? 9 : 8;
  //   console.log(brick_right)
  //   if (brick_right) {
  //     update(brick_right + 32 - mario.x, true);
  //     // console.log(123)
  //   } else 
  //     update();
  // }
}

function rightMarioBrick() {
  // check hit with brick left
  var brick_left = false;
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (mario.x + 32 <= brick.x && mario.x + 32 + mario.v.x >= brick.x  && mario.y + 52 < brick.y)
      brick_left = brick.x;
  }

  if (brick_left)
    update(brick_left + 113 * 0.5 - mario.x, true);
  else 
    update();


  // if (!mario.lastDrawTime) {
  //   mario.lastDrawTime = +new Date;
  //   action = 8;
  // } else if (+new Date - mario.lastDrawTime > 80) {
  //   lastDrawTime = +new Date;
  //   action = action === 8 ? 9 : 8;
  //   if (brick_left)
  //     update(brick_left + 113 * 0.5 - mario.x, true);
  //   else 
  //     update();
  // }
}

function marioJumpOnGround() {
  var ground_top = false;
  for (var i = 0; i < grounds.length; i++) {
    var ground = grounds[i];
    // 增加 x 方向的约束条件
    if (mario.y + 52 <= ground.y && mario.y + 52 + mario.v.y > ground.y && mario.x >= ground.x - 32 && mario.x <= ground.x + 32)
    // if (mario.y + 52 <= ground.y && mario.y + 52 + mario.v.y > ground.y)
      ground_top = ground.y;
  }

  // console.log(ground_top)
  if (ground_top) {
    mario.isJump = false;
    mario.isOnGround = true;
    mario.y = 350;
    mario.a.y = 0;
    mario.v.y = 0;
  }
}

function marioJumpOnPipe() {
  var pipe_top = false;
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    if (mario.y + 52 <= pipe.y && mario.y + 52 + mario.v.y > pipe.y && mario.x + 32 >= pipe.x && mario.x <= pipe.x + 113 * 0.5)
      pipe_top = pipe.y;
  }

  // var tmp = action = mario.lastDirction === "right" ? 1 : 9;

  if (pipe_top) {
    mario.isJump = false;
    mario.isOnPipe = true;
    mario.y = pipe_top - 52 + 5;
    mario.a.y = 0;
    mario.v.y = 0;
    // var tmp = action = mario.lastDirction === "right" ? 0 : 8;
  } 
}

function marioJumpOnBrick() {
  // check hit with brick top
  var brick_top = false;
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (mario.y + 52 <= brick.y && mario.y + 52 + mario.v.y > brick.y && mario.x + 32 >= brick.x && mario.x <= brick.x + 32)
      brick_top = brick.y;
  }

  var tmp = action = mario.lastDirction === "right" ? 1 : 9;

  if (brick_top) {
    mario.isJump = false;
    mario.isOnBrick = true;
    mario.y = brick_top - 52 + 5;
    mario.a.y = 0;
    mario.v.y = 0;
    // var tmp = action = mario.lastDirction === "right" ? 0 : 8;
  } 
}

function marioHitWithBrickButtom() {
  // check hit with brick buttom
  var brick_buttom = false;
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (mario.y >= brick.y + 32 && mario.y + mario.v.y < brick.y + 32 && mario.x >= brick.x - 32 && mario.x <= brick.x + 32)
      brick_buttom = brick.y;
  }
  
  // var tmp = action = mario.lastDirction === "right" ? 1 : 9;

  if (brick_buttom) {
    mario.y = brick_buttom + 32;
    mario.a.y = 1;
    mario.v.y = 0;
    // var tmp = action = mario.lastDirction === "right" ? 0 : 8;
  }
}

function marioJumpOnFinalBrick() {
  // check hit with finalBrick top
  var finalBrick_top = false;
  for (var i = 0; i < finalBricks.length; i++) {
    var brick = finalBricks[i];
    if (mario.y + 52 <= brick.y && mario.y + 52 + mario.v.y > brick.y && mario.x + 32 >= brick.x && mario.x <= brick.x + 32)
      finalBrick_top = brick.y;
  }

  // var tmp = action = mario.lastDirction === "right" ? 1 : 9;

  if (finalBrick_top) {
    mario.isJump = false;
    mario.isOnFinalBrick = true;
    mario.y = finalBrick_top - 52 + 5;
    mario.a.y = 0;
    mario.v.y = 0;
    // var tmp = action = mario.lastDirction === "right" ? 0 : 8;
  } 
}

function marioCheckHitWithPole() {
  if (mario.x >= targets[1].x && mario.y < 350) {  // targets[1] is pole
    update(targets[1].x - mario.x, true);
    mario.isJump = false;
    mario.isOnPole = true;
    mario.gameAuto = true;
    mario.v.y = 2;
    mario.a.y = 0;
  }
}

// 每帧渲染的回调函数
// 每帧必须要执行一次 update() 函数！！！
function handleTick() {

  if (mario.isOnPole) {
    mario.action = 6;
  }
  // 游戏结束的标志是 mario.isOver 为 true
  // 并且 mario.y >= 450 (即 disappear)
  if (mario.y >= 450 || mario.isOver) {
    // mario.isOver = true;
    var text = new createjs.Text("Game Over!", "50px Arial", "red");
    text.textAlign = "center";
    text.x = 510 / 2;
    text.y = 450 / 2;
    stage.addChild(text);
    stage.update();
    
    createjs.Ticker.setPaused(true);
    return;
  }
  
  // 竖直方向数据更新
  mario.y += mario.v.y;
  mario.v.y += mario.a.y;

  // 已经被怪物 hit，只等 drop
  if (mario.isOverByHit) {
    stage.update();
    return;
  }
  // monsters 的 update 与 mario 移动无关
  // 后续还需要判断 monster 碰撞 pipe 以及 掉下 bricks
  // 此处未完待续...
  monstersUpdate(); 

  // mario 右移
  if (keys[39] && !mario.gameAuto) {
    mario.lastDirction = 'right';

    if (mario.action === 8 || mario.action === 9)
      mario.action = 0;

    // 前一帧是在 Ground 上
    if (mario.isOnGround) {
      if (mario.x >= targets[1].x - 30) {
        update(targets[1].x - mario.x - 30, true);
      }
      else if (!checkIfOnGround()) {
        // mario.isOver = true;
        mario.a.y = 1;
      }
      // check hit with finalBrick
      else if (mario.x + 32 <= finalBricks[0].x && mario.x + 32 + mario.v.x > finalBricks[0].x) {
        update(finalBricks[0].x - 32 - mario.x, true);
      } else {
        // 与 pipe 的碰撞检测
        rightMarioPipe();
      }
    } else if (mario.isOnPipe) {
      // 前一帧在 pipe 上，check if 掉下去
      var f = checkIfOnPipe();
      if (!f) {
        mario.isOnPipe = false;
        mario.isJump = true;
        mario.a.y = 1;
      } else
        update();
    } else if (mario.isOnBrick) {
      // 前一帧是在 Brick 上，check if 掉下去
      var f = checkIfOnBrick();
      if (!f) {
        mario.isOnBrick = false;
        mario.isJump = true;
        mario.a.y = 1;
      } else
        update();
    } else if (mario.isOnFinalBrick) {
      // console.log("!!!!!!!")
      // check 碰到砖块
      var isHit = false;
      for (var i = 0; i < finalBricks.length; i++) {
        var finalBrick = finalBricks[i];
        if (mario.x + 32 <= finalBrick.x && mario.x + 32 + mario.v.x >= finalBrick.x && isSame(mario.y + 52, finalBrick.y + 32)) {
          isHit = finalBrick.x - mario.x - 32;
        }
      }
      
      // console.log(isHit);

      // if 与右边 finalBrick 碰撞，则 stop
      // 也就不会有后续的 drop check
      if (isHit !== false) {
        update(isHit, true);
      } else {
        // 前一帧是在 finalBrick 上，check if 掉下去
        var f = checkIfOnFinalBrick();
        if (!f) {
          mario.isOnFinalBrick = false;
          mario.isJump = true;
          mario.a.y = 1;
        } else
          update();
      }
    } else
      update();
  } 


  // move left
  if (keys[37] && !mario.gameAuto) {
    mario.lastDirction = 'left';

    if (mario.action === 0 || mario.action === 1)
      mario.action = 8;
    // 前一帧是在 Ground 上
    if (mario.isOnGround) {
      if (!checkIfOnGround()) {
        // mario.isOver = true;
        mario.a.y = 1;
      }
      // check hit with finalBrick
      else if (mario.x >= finalBricks[27].x + 32 && mario.x - mario.v.x < finalBricks[27].x + 32) {
        update(finalBricks[27].x + 32 - mario.x, true);
      } else {
        // 与 pipe 的碰撞检测
        leftMarioPipe();
      }
    } else if (mario.isOnPipe) {
      // 前一帧在 pipe 上，check if 掉下去
      var f = checkIfOnPipe();
      if (!f) {
        mario.isOnPipe = false;
        mario.isJump = true;
        mario.a.y = 1;
      } else
        update();
    } else if (mario.isOnBrick) {
      // 前一帧是在 Brick 上，check if 掉下去
      var f = checkIfOnBrick();
      if (!f) {
        mario.isOnBrick = false;
        mario.isJump = true;
        mario.a.y = 1;
      } else 
        update();
    }  else if (mario.isOnFinalBrick) {

      // check if hit with pipe
      // 已废弃
      if (mario.x >= pipes[5].x + 113 * 0.5 && mario.x - mario.v.x < pipes[5].x + 113 * 0.5) {
        update(pipes[5].x + 113 * 0.5 - mario.x, true);
      } else {
        // 前一帧是在 finalBrick 上，check if 掉下去
        var f = checkIfOnFinalBrick();
        if (!f) {
          mario.isOnFinalBrick = false;
          mario.isJump = true;
          mario.a.y = 1;
        } else
          update();
      }
      
    } else
      update();
  } 


  // 水平方向静止
  if (!keys[37] && !keys[39] && !mario.gameAuto) {
    mario.action = mario.lastDirction === "right" ? 0 : 8;
  }


  

  // if (mario.y > 400)
  //   mario.isOver = true;

  // if (mario.y > 350 && !mario.isOver) {
  // if (mario.y > 350 && !mario.isOver) {
  //   // return;
  //   mario.y = 350;
  //   mario.a.y = 0;
  //   mario.v.y = 0;
  //   mario.isJump = false;
  //   mario.isOnGround = true;
  // }

  // jump
  if (keys[38] && !mario.gameAuto) {
    if (!mario.isJump){
      mario.isJump = true;
      mario.isOnGround = false;
      mario.v.y = -20; // original -15
      mario.a.y = 1;
    }
  }


  // jump 的结果有
  // 跳到 grounds 上
  // 跳到 pipes 上
  // 跳到 bricks 上
  // 跳到 finalBricks 上
  // 跳到 pole 上
  if (mario.isJump) {
    
    if (mario.lastDirction === 'right')
      mario.action = 1;
    else
      mario.action = 9;

    marioCheckHitWithPole();
    // check hit with pipe top

    marioJumpOnGround();

    marioJumpOnPipe();

    marioJumpOnBrick();
    
    marioJumpOnFinalBrick();

    marioHitWithBrickButtom();

  }

  if (mario.isOnPole) {
    if (mario.y >= 350) {
      mario.y = 350;
      mario.v.y = 0;
      mario.isOnPole = false;
      // mario.gameAuto = false;
      // mario.goToTarget = true;
    }
  }

  if (!mario.isOnPole && mario.gameAuto) {
    // console.log(123)
    update();

    if (mario.x + 32 >= targets[3].x + 85) {
      mario.isOver = true;
      stage.removeChild(mario);
      return;
    }

    if (!mario.lastDrawTime || mario.action === 6) {
      mario.lastDrawTime = +new Date;
      mario.action = 0;
    } else if (+new Date - mario.lastDrawTime > 80) {
      mario.lastDrawTime = +new Date;
      if (mario.action === 0)
        mario.action = 1;
      else if (mario.action === 1)
        mario.action = 0;
    }
  }

  if (!mario.isJump && (keys[37] || keys[39])) {
    if (!mario.lastDrawTime) {
      mario.lastDrawTime = +new Date;
      mario.action = mario.lastDirction === 'right' ? 0 : 8;
    } else if (+new Date - mario.lastDrawTime > 80) {
      mario.lastDrawTime = +new Date;
      if (mario.action === 0)
        mario.action = 1;
      else if (mario.action === 1)
        mario.action = 0;
      else if (mario.action === 8)
        mario.action = 9;
      else if (mario.action === 9)
        mario.action = 8;
    }
  }

  mario.gotoAndStop(mario.action);

  stage.update();
}