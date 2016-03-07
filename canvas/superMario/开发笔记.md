##总体架构

游戏选择了轻量级游戏引擎 [createjs](http://createjs.com/)

- easeljs（98.5 KB）
- preloadjs（57.0 KB）


随着 mario 的移动，画布整体左移（这里以 mario 右移为例）。同时 **视口中** 的 monsters 按照规律自动移动。

##Sprites

- mario（马里奥）
- monsters（怪物）
- grounds（地面砖块）
- bricks（空中砖块）
- pipes（绿色管子）
- clouds（白云）
- hills（小山）
- groves（树丛）
- finalBricks（终点前 8*8/2 砖块）
- flag（胜利旗子）
- target（目标房子）
- pole（旗杆）
- flagBrick（插旗杆的砖块）

##Render

每帧的渲染。除了 **mario** 和 **monsters** 外，其余物体均为 **静态物体**。也就是说只有 mario 和 monsters 拥有速度，而 **mario 的速度体现在了画布整体移动上**，monsters 的速度体现在自身的位置变化。

某一瞬间 mario 可能存在的位置（只要满足其一，其他的可以不需要检测）：

- grounds
- bricks
- pipes
- finalBricks
- flag

monsters 可能存在的位置：

- grounds
- bricks


##碰撞检测

游戏中最复杂的无疑是碰撞检测。由于 createjs 并没有自带碰撞检测的引擎（**或许是我没有找到**），所以手动进行简单检测。鉴于像素级的碰撞检测太过复杂，成本略高，故只进行简单的矩形碰撞检测（需后续优化）。

碰撞检测主要针对 mario 以及 monsters。

其中 mario 需要检测的碰撞物体有：

- monsters（如果 mario 在 monsters 上，则 monsters die，否则 game over）
- grounds（如果 mario 在 grounds 上，则游戏继续，否则 game over）
- bricks（如果 mario 在 bricks 上，则踩上去，否则掉下来）
- pipes（如果 mario 在 pipes 上，踩上去，否则掉下来）
- finalBricks（同 bricks）
- flag（mario 与其碰撞，then go to target)

其中 monsters 需要检测的碰撞物体有：

- mario
- grounds（如果 monsters 不在 grounds 上，则掉下去）
- bricks（如果 monsters 在 bricks 上，则踩下去）
- pipes（如果 monsters 碰到 pipes，则改变其速度方向）


##游戏引擎

Construct2、ImactJS、LimeJS、GameMaker、CreateJS、lycheeJS、Crafty、three.js、melonJS、Turbulenz、Quintus、Cocos2d-js

引擎对比：<http://www.w3cfuns.com/notes/13737/7a4d7dca4a8070ed9d4d1965fbb6e9b1>


##后续

- 约 60% ~ 70% 代码都是碰撞检测，可能 createjs 已经自带碰撞检测，进一步看看，如果没有，需要寻找 createjs 关于碰撞检测的第三方库，比如 <https://github.com/olsn/Collision-Detection-for-EaselJS>
- 学习 createjs 其他 API

## 2016-02-21 update

这其实相当于一个领导安排的 "作业"，年前初步 finish，年后领导表示不用继续了，所以尚存在很多 bug，其中最主要的 bug 无疑是碰撞检测部分。游戏中的两个 Sprites，不仅仅需要判断是否碰撞，还需要进一步判断碰撞点相对于 Sprite 的位置，比如 mario 和 monster 之间的碰撞，如果碰撞点在 monster 的上面，则 monster 被踩死，其他则不然。

关于碰撞，具体可以参考 <https://github.com/CreateJS/EaselJS/issues/724#event-537786957>。

关于 createjs 更多，可以参考以下链接：

- [Html5游戏框架createJs的简单用法](http://www.cnblogs.com/axes/p/3628975.html)
- [使用 CreateJS 之 EaseIJS](http://chengkang.pw/?p=224)
- [如何使用Createjs来编写HTML5游戏 系列共八篇](http://blog.csdn.net/lanix516/article/category/5706235)
- [EaselJS简明教程2-动画](http://blog.csdn.net/whqet/article/details/19234055)
- [createjs 官方示例 标题中文版](https://github.com/TingoZhou/x-canvas-tmp/blob/master/tutorials/index.html)