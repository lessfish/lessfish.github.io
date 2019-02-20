废话不多说，先上demo（建议在chrome下打开 F键全屏 esc退出全屏）：

1. [我的demo-博客园简介](http://hanzichi.github.io/2015/reveal/cnblogs.html#/)
2. [官网demo](http://lab.hakim.se/reveal-js/#/)
3. [更多demo](https://github.com/hakimel/reveal.js/wiki/Example-Presentations)

今天为大家介绍一款基于css3和JavaScript的幻灯片播放工具，无意间发现了它，便爱不释手，弄清楚了它的使用方法，略记一二。如果你还在用PowerPoint做slides的话，真的可以尝试一下，不仅炫酷，熟悉了之后还会发现比传统的PPT制作更加简单。当然制作过程需要一点前端语言的技巧，如果没有，也没有关系，这里有[可视化的制作工具](http://slides.com/)，所见即所得，满足不同需求人群！

言归正传，首先因为它本质上就是页面，所以它的各种效果（比如翻页、全屏、放大）等都是基于JavaScript框架的，幸运的是这些框架都已经完全封装好了（如果需要你可以调用它的API），你只需要编写每个slide页面的代码就可以了，而这些代码就是简单的html了，甚至可以用markdown来编写。

接着进入实战，该项目的代码托管在[github](https://github.com/hakimel/reveal.js)里，除去其他一些引用的js、css文件，就只剩下一个简单的index页面了，可以看我整理的[模板文件](https://github.com/hanzichi/hanzichi.github.io/blob/master/2015/reveal/template.html)（模板文件效果预览点击[这里](http://hanzichi.github.io/2015/reveal/template.html#/)，如果你需要，可以直接拿它来进行修改。

### 1、每个slide的编写

***

很显然，每个slide其实是每个`<section>`标签内的内容。直接在里面写html内容完全没有问题，这里简单讲下一些需要注意的点。

- Slide Backgrounds

每个slide都能添加不同的背景，可以是颜色，图片，视频甚至是iframe：

```html
<section data-background="#ff0000">
    <h2>All CSS color formats are supported, like rgba() or hsl().</h2>
</section>
<section data-background="http://example.com/image.png">
    <h2>This slide will have a full-size background image.</h2>
</section>
<section data-background="http://example.com/image.png" data-background-size="100px" data-background-repeat="repeat">
    <h2>This background image will be sized to 100px and repeated.</h2>
</section>
<section data-background-video="https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.mp4,https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.webm" data-background-video-loop>
    <h2>Video. Multiple sources can be defined using a comma separated list. Video will loop when the data-background-video-loop attribute is provided.</h2>
</section>
<section data-background-iframe="https://slides.com">
    <h2>Embeds a web page as a background. Note that the page won't be interactive.</h2>
</section>
```

也可以同时配置`data-background-transition`的值，表示背景的切换方式（如果前后两个slide背景有变化的话）。注意，背景切换和幻灯片切换是两个不同的效果。

- Slide Transitions

我们可以在Reveal中配置两个slide之间的转换方式（全局配置），但是也可以在特定的slide中编写，优先级比全局的高：

```html
<section data-transition="zoom">
    <h2>This slide will override the presentation transition and zoom!</h2>
</section>

<section data-transition-speed="fast">
    <h2>Choose from three transition speeds: default, fast or slow!</h2>
</section>
```

也可以在同一个slide中声明进入和离开切换方式：

```html
<section data-transition="slide">
    The train goes on … 
</section>
<section data-transition="slide"> 
    and on … 
</section>
<section data-transition="slide-in fade-out"> 
    and stops.
</section>
<section data-transition="fade-in slide-out"> 
    (Passengers entering and leaving)
</section>
<section data-transition="slide">
    And it starts again.
</section>
```

- Fragments

这个功能就好像做PPT时在一个slide中，点一下，出现一点东西，再点一下，再出现点。[这里](http://lab.hakim.se/reveal-js/#/fragments)有个例子。默认的方式是原来不可见的变成可见，当然你可以有多种选择（注意它的格式 `fragment`）：

```html
<section>
    <p class="fragment grow">grow</p>
    <p class="fragment shrink">shrink</p>
    <p class="fragment fade-out">fade-out</p>
    <p class="fragment current-visible">visible only once</p>
    <p class="fragment highlight-current-blue">blue only once</p>
    <p class="fragment highlight-red">highlight-red</p>
    <p class="fragment highlight-green">highlight-green</p>
    <p class="fragment highlight-blue">highlight-blue</p>
</section>
```

但是都只是一个transition或许不能满足你的要求，比如你想要先出现，再隐藏，也有办法：

```html
<section>
    <span class="fragment fade-in">
        <span class="fragment fade-out">I'll fade in, then out</span>
    </span>
</section>
```

上面的元素“变形”都是按照html的顺序从上往下的，你也可以用`data-fragment-index`指定顺序：

```html
<section>
    <p class="fragment" data-fragment-index="3">Appears last</p>
    <p class="fragment" data-fragment-index="1">Appears first</p>
    <p class="fragment" data-fragment-index="2">Appears second</p>
</section>
```

- code

当然作为coder最重要的或许就是code的展示了，reveal框架默认用`highlight.js`来高亮代码（注意配置中要增加依赖文件）：

```html
<section>
    <pre><code data-trim>
var a = 10;
var b = 20;
var c = a + b;
if (c === 30) {
  console.log('hello world');
}
    </code></pre>
</section>
```

- Theming

可以选择指定的css来指定主题，个人比较喜欢black，这个可以在文件最开始引入。

- markdown支持

section内支持markdown代码，比如这样：

```html
<section data-markdown>
    <script type="text/template">
        ## Page title

        A paragraph with some text and a [link](http://hakim.se).
    </script>
</section>
```

需要注意的是这时Reveal的配置中(模板文件最后）就需要加上相应的markdown文件依赖。markdown文件也能独立存在然后在section中引用，markdown中每个元素也能添加相应的属性事件（比如需要点击才显示），详见[document](https://github.com/hakimel/reveal.js/#user-content-markdown)


### 2、Reveal的配置

***

Reveal的配置在页面底部的JavaScript中，你可以根据自己的喜好或者习惯配置幻灯片的播放，比如可以自动播放，也可以从右往左播放，都可以在这里设置，默认的配置在[这儿](https://github.com/hakimel/reveal.js#user-content-configuration)。默认配置应该就是最佳配置了，或者可以修改下这个：

```js
// Transition style
transition: 'default', // none/fade/slide/convex/concave/zoom
backgroundTransition: 'zoom', // none/fade/slide/convex/concave/zoom
```

这是两个slide之间切换的方式，前面说过可以给每个slide配置切换方式，当然具体的配置优先。

如果要使用markdown或者点击放大等功能，就要使用插件，在页面最下方的JavaScript文件中添加依赖。所有的依赖配置在[这儿](https://github.com/hakimel/reveal.js#user-content-dependencies)。很显然，有的配置你并用不到，比如那个math文件，是为了展示各种复杂的数学公式的。

### 3、Keyboard Bindings

***

比如你可以指定键来翻页等，这里介绍下一些default的快捷键。

1. 上下左右翻页
2. 空格 下一页
2. `Esc`或者`o`键进入Overview mode(预览模式），退出也一样
3. **`F`键全屏，`Esc`退出全屏**
4. `alt+click`点击放大，前提是依赖文件中加入了`zoom.js`
5. `B`或者`.`键暂停，再按一次恢复

### 4、PDF export

***

也许你觉得你传统的PPT文件可以保存，可以共享非常方便，其实我们的slides一样方便，它可以转为pdf文件。

html页面在chrome里可以被保存为pdf文件（打印选项中），很显然我们的slides也是html页面，只要把所有的slides显示在一个html页面中就ok了。这里我们可以改下url，加上`print-pdf`就可以了，实际上就是执行了一段代码，改变了文件的样式，接着就可以“打印”成pdf了。

例如将[我的demo](http://hanzichi.github.io/reveal/fish.html#/)的url改成`http://hanzichi.github.io/reveal/fish.html?print-pdf`，可能在当前页面预览时样式会有点问题，但是在chrome下打开打印选项（ctrl+p），就能愉快地转换成PDF了。

我也把我的demo导成了PDF，点击[这里](https://github.com/hanzichi/hanzichi.github.io/blob/master/reveal/reveal.pdf)查看效果

### 5、总结

***

除了具体每个slide的编写，其实最基本的设置有`data-transition`、`data-background`、`data-background-transition`以及`fragment`。还有一些有趣的设置，比如section之间可以嵌套，这样会形成一个竖着的幻灯片，再比如有些备注内容（PPT有这个功能），可以增加aside标签来展示，还可以嵌入自己的框架添加功能，有兴趣的可以参考[官方文档](https://github.com/hakimel/reveal.js)。