# 如何开发一个简单的 Canvas 小游戏  / 特效

推荐下列资料：

- [How to make a simple HTML5 Canvas game](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/)
- [如何开发一个简单的HTML5 Canvas 小游戏](http://www.cnblogs.com/Wayou/p/how-to-make-a-simple-html5-canvas-game.html)（上文译文）
- [source code（上文所涉及 demo）](https://github.com/lostdecade/simple_canvas_game)

备注几个可能需要注意的点。


## 游戏的基本原理

![](images/renderjpg)


## 创建画布

```javascript
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
```

如果需要画布铺满浏览器窗口：

```
body {margin:0; padding:0; wdith:100%; height: 100%}
canvas {display:block; background-color:#000; margin:0 auto;}
```

```javascript
window.canvas = document.createElement('canvas');
window.ctx = canvas.getContext('2d');
canvas.height = window.height = window.innerHeight;
canvas.width = window.width = window.innerWidth;
document.body.appendChild(window.canvas);
```

## 准备图片

图片需要加载完才能使用，一般的游戏引擎都会有个资源加载模块，可以简单地使用如下代码：

```javascript
// 背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";
```

## 事件监听

事件监听（以 keydown 事件为例）的写法需要改变传统思路。

```javascript
// 处理按键
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
```

在前端开发中，一般是用户触发了点击事件然后才去执行动画或发起异步请求之类的，但是如果这样写，**会有卡顿，并且不能同时响应两个按键。**


# 其他资料

- [canvas api](http://www.cnblogs.com/zichi/p/5120873.html)
- [碰撞检测](http://www.cnblogs.com/zichi/p/5141044.html)
- [随笔分类 - Canvas](http://www.cnblogs.com/zichi/category/627224.html)