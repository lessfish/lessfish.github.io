// 一些配置文件
// 以及初始化游戏场景的一些数据
// grounds、clouds、bricks、hills、groves、pipes、finalBricks etc
// mario、monsters

function initData() {
  bricks = []
    , grounds = []
    , clouds = []
    , pipes = []
    , monsters = []
    , finalBricks = []
    , hills = []
    , groves = []
    , mario = null
    , targets = []
    , keys = {};

  // targets init 
  // targets 包括 flagBrick, pole, flag, target
  var baseX = 2800;
  var b = new createjs.Bitmap(loader.getResult("flagBrick"));
  b.x = 0 + baseX;
  b.y = 366;
  stage.addChild(b);
  targets.push(b);

  var b = new createjs.Bitmap(loader.getResult("pole"));
  b.x = 0 + baseX;  
  // b.x = 300;
  b.y = 45;
  stage.addChild(b);
  targets.push(b);

  var b = new createjs.Bitmap(loader.getResult("flag"));
  b.x = -18 + baseX;
  b.y = 78;
  stage.addChild(b);
  targets.push(b);

  var b = new createjs.Bitmap(loader.getResult("target"));
  b.x =  150 + baseX;
  b.y = 250;
  stage.addChild(b);
  targets.push(b);


  // grounds init
  var b = new createjs.Bitmap(loader.getResult("ground"));
  for (var i = 0; i < 120; i++) {
    if (i === 30 || i === 31 || i === 65 || i === 66)
      continue;
    var c = b.clone();
    c.x = i * 32;
    c.y = 450 - 20;
    stage.addChild(c);
    grounds.push(c);

    var c = b.clone();
    c.x = i * 32;
    c.y = 450 - 20 - 32;
    stage.addChild(c);
    grounds.push(c);
  }


  // clouds init
  var b = new createjs.Bitmap(loader.getResult("cloud"));
  var clouds_pos = [100, 300, 400, 600, 800, 1000, 1300, 1600, 1800, 2000, 2300, 2600];
  for (var i = 0; i < clouds_pos.length; i++) {
    var c = b.clone();
    c.x = clouds_pos[i];
    c.y = getRandomInt(0, 100);
    stage.addChild(c);
    clouds.push(c);
  }


  // hills init
  var b = new createjs.Bitmap(loader.getResult("hill"));
  var hills_pos = [30];
  for (var i = 0; i < hills_pos.length; i++) {
    var c = b.clone();
    c.x = hills_pos[i];
    c.y = 300;
    stage.addChild(c);
    hills.push(c);
  }


  // groves init
  var b = new createjs.Bitmap(loader.getResult("grove"));
  var groves_pos = [300, 600, 1100, 1400, 1900];
  for (var i = 0; i < groves_pos.length; i++) {
    var c = b.clone();
    c.x = groves_pos[i];
    c.y = 366;
    stage.addChild(c);
    groves.push(c);
  }


  // pipes init
  var b = new createjs.Bitmap(loader.getResult("pipe"));
  var pipes_pos = [400, 600, 1300, 1600, 1800, 2200];
  for (var i = 0; i < pipes_pos.length; i++) {
    var c = b.clone();
    c.x = pipes_pos[i]
    c.y = 332;
    c.scaleX = 0.5;
    c.scaleY = 0.6;
    stage.addChild(c);
    pipes.push(c);
  }


  // bricks init
  var b = new createjs.Bitmap(loader.getResult("brick"));
  var bricks_pos = [
    // [100, 100 + 150], // original x=800
    [800 - 32, 132 + 150],
    [800, 132 + 150],
    [800 + 32, 132 + 150],

    // [1100, 100 + 150],
    [1100 - 32, 132 + 150],
    [1100, 132 + 150],
    [1100 + 32, 132 + 150],
    // [100, 164]
  ];

  for (var i = 0; i < bricks_pos.length; i++) {
    var c = b.clone();
    c.x = bricks_pos[i][0];
    c.y = bricks_pos[i][1];
    stage.addChild(c);
    bricks.push(c);
  }

  
  // finalBricks init
  var finalBricks_pos = []
  var b = new createjs.Bitmap(loader.getResult("finalBrick"));
  for (var i = 0; i < 8; i++)
    for (var j = 0; j < 8; j++) 
      (i > j) && finalBricks_pos.push([0 + 2350 + 32 * i, 366 - 32 * j])

  for (var i = 0; i < finalBricks_pos.length; i++) {
    var c = b.clone();
    c.x = finalBricks_pos[i][0];
    c.y = finalBricks_pos[i][1];
    // console.log(c)
    stage.addChild(c);
    finalBricks.push(c);
  }
  
  
  // mario init
  var data = {images: [loader.getResult("mario")], frames: {width: 480 / 15, height: 52}};

  var spriteSheet = new createjs.SpriteSheet(data);
  
  // create a Sprite to display frames from the sprite sheet:
  mario = new createjs.Sprite(spriteSheet);

  // mario 可能的位置
  mario.isOnGround = false;  // 初始在 Grounds 上
  mario.isOnPipe = false;
  mario.isOnBrick = false;
  mario.isOnFinalBrick = false;
  mario.isJump = true;


  mario.lastDrawTime = undefined;
  mario.action = 0;
  mario.lastDirction = 'right';
  // mario.isJump = false;
  mario.isOver = false;


  mario.y = 300; // orginal 350
  mario.x = 70; // original 200

  mario.v = new Vector2(5, 0);
  mario.a = new Vector2(0, 0.5);

  stage.addChild(mario);

  // because we didn't specify any named animations, we have to reference frames by number:
  mario.gotoAndStop(0);

  // monsters init
  var monsters_pos = [[800+32, 252], [500, 370], [1250, 370], [1700, 370]];

  var data = {images: [loader.getResult("monster")], frames: {width: 60, height: 60}};

  var spriteSheet = new createjs.SpriteSheet(data);

  // create a Sprite to display frames from the sprite sheet:
  monster_a = new createjs.Sprite(spriteSheet);
  monster_a.scaleX = monster_a.scaleY = 0.5;

  for (var i = 0; i < monsters_pos.length; i++) {
    var b = monster_a.clone();

    // mean onBrick
    if (monsters_pos[i][1] !== 370) 
      b.isOnBrick = true;
    else 
      b.isOnGround = true;

    b.x = monsters_pos[i][0];
    b.y = monsters_pos[i][1];
    b.action = 0;
    b.gapTime = 400;
    b.v = new Vector2(-1/5, 0);
    b.a = new Vector2(0, 0);
    monsters.push(b);
    stage.addChild(b);
  }

  // because we didn't specify any named animations, we have to reference frames by number:
  // monster_a.gotoAndStop(0);

  // 事件监听
  document.onkeydown = function(e) {
    var code = e.keyCode;
    keys[code] = true;
  };

  document.onkeyup = function(e) {
    var code = e.keyCode;
    keys[code] = false;
  };

  // 设置 FPS
  createjs.Ticker.setFPS(60);

  // 每帧渲染回调 handleTick 函数
  createjs.Ticker.on("tick", handleTick);
}