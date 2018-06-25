抽时间看了下 [hover.css](http://ianlunn.github.io/Hover/) 以及 [hoverbuttons.css](https://varin6.github.io/Hover-Buttons/) 两个 css 库。这两个 css 库的作用是类似的，都是在 button 被 hover 的时候做文章，原理也类似，以一个 a 标签作为 button，然后再设置 transition，在 hover 的时候触发，如果 hover 的时候有新的元素出现，就在 `a::before` 里做文章，在那里生成

hover.css 中这个折角的效果非常吸引我，特地将其代码抽了出来。实现其实不难，左上角利用 `a::before` 新生成一个元素覆盖在原来的 button 上，width 和 height 渐变的 transition，难的是如何绘制这个矩形，具体可以参考源码

虽然 hoverbuttons.css 关注度远不及 hover.css，我觉得 Border Transitions 有几个效果还是蛮炫酷的
