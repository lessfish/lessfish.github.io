最终效果（chrome 下）： [搜索框下拉 demo](http://hanzichi.github.io/2015/search-pull-down/index.h5.html)

今天就来简单讲解下如何做这样一个类似百度搜索框的下拉效果。

### 1、html 以及 css 部分 ###
***

首先你得要有个输入框，这里我用了 `<input type='text' />` 控件，其次当用户在输入框中输入内容后，下拉效果随即出现，比如在我的代码中最多会出现 10 个联想词，那么就得写 10 个 div（来显示这些词），这里我用了 table 元素，这里注意 table 中的 td 元素还得有个 hover 后变色的效果。html 和 css 部分相对来说还是比较简单的，直接看代码。

**html 部分：**
```html
<input type='text' id='txt' />
<table cellpadding='2' cellspacing='0'>
  <tbody>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
    <tr><td></td></tr>
  </tbody>
</table>
```

**css 部分:**

```css
input {
  height: 24px;
  width: 535px;
  font-size: 20px;
}

table {
  font-family: '微软雅黑', '宋体', '黑体';
}

td {
  background-color: rgb(249,252,255);
  height: 24px;
  width: 535px;
}

td:hover {
  background-color: rgb(168,213,252);
  cursor: default;
}
```

### 2、Javascript 部分之数据的获取 ###
***

很显然，demo 的核心是数据的获取，也就是说当用户输入一些词汇的时候，你怎么去找到那些联想词。在之前，我一直以为百度首页是用 ajax 去调用接口的，其实不然，原来是 jsonp。其实也很好理解，很多网址导航网站或者个人网站都有百度搜索，如果是用 ajax 去调用的，除非设置了 CORS，否则根据同源策略就取不到数据了嘛！所以 jsonp 还是个很好的办法。

我们可以打开 [2345网址导航](http://www.2345.com/) 的首页，调出 chrome 下的 network 面板，在网页的百度搜索框处随便输入一些字符（比如s），这时就会在 network 面板下发现一些 http 请求，其中我们要的就是以下这个了：

![](http://images2015.cnblogs.com/blog/675542/201510/675542-20151011190350596-93042297.png)

看该请求的 url，很明显是个 jsonp 获取数据的格式，cb 后面跟着的就是 callback 的函数名嘛，你也可以把这个 url 在浏览器中打开，返回的是一个包裹着 json 数据的函数执行。

既然2345网址导航能用百度的接口，当然我们自己写的网页也可以啦。我们可以动态插入一个 script 标签，然后把 src 属性指向该接口的 url（url中需要约定一个回调函数的函数名），然后再写个函数来处理数据，比如这样：

```js
var s = document.createElement('script');
s.src = 'http://unionsug.baidu.com/su?wd=' + encodeURI(this.value.trim()) + '&p=3&cb=fn';
document.body.appendChild(s);

function fn(data) {
  var tds = document.querySelectorAll('td');

  data.s.forEach(function(item, index) {
    tds[index].style.display = '';
    tds[index].innerHTML = item;
  });

  // delete scripts
  var s = document.querySelectorAll('script');
  for (var i = 1, len = s.length; i < len; i++) {
    document.body.removeChild(s[i]);
  }
}
```

注意执行完 fn 函数后，也就是说我们已经处理完了得到的数据（数据已经展示在了 table 中），那么就可以把这个动态插入的脚本删掉了（delete scripts）。


### 3、Javascript 部分之其他逻辑处理 ###
***

解决了这个最重要的环节，其他的就是一些细节问题了。

比如说这里我是监听了输入框的 keyup 事件；比如在编码的过程中要用 encodeURI() 函数；在获取输入框内容的时候我用了 trim() 函数；点击联想词会打开新页面，这里我用了事件委托；在输入框内输入后出现联想词，然后点击空白区域，联想词就会消失。都是一些很细节的东西。


### 4、总结 ###
***

其实做出效果并不难，个人觉得 demo 的难度是要兼容，特别是兼容 ie6 这样坑爹的浏览器，一些高级 api 不能用，甚至连 hover 都不支持。所以这只是上篇，给出一个具体的思路，而下篇则会进行兼容性的修改，代码会大换血的感觉。

源码参考：[搜索框下拉 demo 源码](https://github.com/hanzichi/hanzichi.github.io/blob/master/2015/search-pull-down/index.h5.html)

***

### 后续 ###
***

本来是打算另起一篇讲讲兼容性的，但是觉得没有必要也不浪费篇目了。

兼容代码效果预览： [搜索框下拉 demo](http://hanzichi.github.io/2015/search-pull-down/index.ie6.html)

源代码可以参考： [搜索框下拉 demo 兼容ie6 源码](https://github.com/hanzichi/hanzichi.github.io/blob/master/2015/search-pull-down/index.ie6.html)

其实要做到兼容性，做到如下几条即可。

1. querySelector() 以及 querySelectorAll() 的替换，很显然这两个 api 是 h5 的，所以得替换成 getElementById() 和 getElementsByTagName()
2. 事件监听部分 IE 和 其他浏览器分别实现各自的监听，详细可以参考源码
3. e 和 window.e 以及 target 和 srcElement 
4. trim() trim()函数是ES5的内容，低版本浏览器不见得都支持，可以在 String 上写个扩展方法
5. hover 坑爹的 IE6 连 hover 都不支持，这里我参考了 [ 完美解决IE6不支持hover的方法（W3Cfuns.com重点推荐）](http://www.w3cfuns.com/thread-347-1-1.html)

*依然存在的问题:* 虽然效果可以出来了，但是依然存在两个问题。

1. delete scripts 部分 因为调用的是 jsonp 的接口，所以动态生成 script 标签后，在取完数据后最好能 remove 掉生成的标签，但是不知道为什么 ie6 下 delete scripts 部分报错（源码 123~129 部分）
2. 编码 用utf-8 编码的话，ie6下报错，我猜想可能是运行到 encodeURI() 函数时出错了（源码 106行），但是为什么目前我也不清楚，换成 gb2312 却可以,但是 title 的中文却乱码了（本地却没有），暂时对编码还不了解，先这样吧。

暂时先这样吧，以后弄明白了再补充吧。

### 再更（2015-10-13）###
***

今天把源码又优化了下，table 元素自动生成，这样不用写死 10 个 tr（td）元素了。代码放在 [github](https://github.com/hanzichi/hanzichi.github.io/blob/master/2015/search-pull-down/index.ie6.update.html) 了。