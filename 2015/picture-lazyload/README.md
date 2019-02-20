### 关于惰性加载 

***

在讲图片的惰性加载前，我们先来聊聊惰性加载。惰性加载又称为延迟加载、懒加载等，还有个好听的英文名字叫做 "lazyload"。需要注意的是，惰性加载并不只是图片的专利，**Javascript 中函数也有惰性加载的概念**（详见 [高性能JavaScript 编程实践](http://www.cnblogs.com/zichi/p/4658303.html) "不要重复工作" 一节），而在 Javascript 异步加载中还有个 [LazyLoad类库](https://github.com/rgrove/lazyload)，而图片的惰性加载库（[lazyload](https://plugins.jquery.com/lazyload/)）与之完全是两个概念，这些一定要弄清楚，以免混淆概念。

图片的惰性加载是啥意思？为什么要用它？当我们页面上的东西越来越丰富的时候，我们发现页面的加载速度却越来越慢，而图片的加载量无疑是 HTTP 请求里面的大头。其实很多时候，你把整个页面加载完，用户却不会滑动到最下面，也就是说很多东西其实白白加载了。**因为图片的加载是大头，所以我们先拿图片开刀**，我们假设，如果试图加载一个 HTML 页面，图片先不加载，当用户将页面往下滑动，图片该出现在可视区域时，再将该图片加载，这样就能将一开始打开页面的 HTTP 请求量降低，这就是图片的惰性加载。


### 实现 

***

图片的惰性加载实现方式其实很简单。

- 在 HTML 文件中将需要惰性加载的图片的 src 属性置为一个**相同的地址**（一般设置为一张 loading 图），这样这张图只会加载一次（第二次即会读取缓存），或者干脆置为空（用户体验不好），将真实的图片地址存储在别的属性中（比如 data-original 属性)
- 监听事件（比如 scroll 事件），判断需要惰性加载的图片是否已经在可视区域，如果是，则将 src 属性替换成 data-original 属性值

接着我们来简单写下代码。

首先，按照第一步将真实的图片地址藏在 data-original 属性中。这里我假设所有图片都要进行惰性加载，现实开发中如果肯定是在第一屏的图片，它的 src 完全可以直接指向真实的地址。

```html
<ul>
  <li class='lazy'><img data-original='images/0.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/1.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/2.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/3.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/4.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/5.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/6.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/7.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/8.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/9.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/10.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/11.jpg' src='images/loading.gif'/></li>
  <li class='lazy'><img data-original='images/12.jpg' src='images/loading.gif'/></li>
</ul>
```

因为我把所有图片都设置为惰性加载模式，而首屏的图片需要直接显示，这里我写了个 init() 函数，注释都在代码中了：

```js
function init() {
  var images = document.images;
  // 加载首屏图片
  for (var i = 0, len = images.length; i < len; i++) {
    var obj = images[i];
    // 如果在可视区域并且还没被加载过
    if (obj.getBoundingClientRect().top < document.documentElement.clientHeight && !obj.isLoad) {
      obj.isLoad = true;
      // 先调用 HTML5 方法
      if (obj.dataset) 
        imageLoaded(obj, obj.dataset.original);
      else 
        imageLoaded(obj, obj.getAttribute('data-original'));
    } else {  // 假设图片标签在 HTML 中的顺序和实际页面中顺序一致
      break;
    }
  }
}
```

代码中写了个 imageLoaded() 函数来将真实的图片地址指向元素，如果直接将 data-original 属性值指向图片的 src 属性的话，看到的图片可能会一段一段出现，而先将图片完全加载，然后再赋值使图片出现的话，体验就好多了。

```js
function imageLoaded(obj, src) {
  var img = new Image();
  img.onload = function() {
    obj.src = src;
  };
  img.src = src;
}
```

OK，接着我们监听 scroll 事件。当用户滑动页面，图片出现在可视区域时，随即加载图片。

```js
window.onscroll = function() {
  lazyload();
};

function lazyload() {
  var lazy = 0;
  var images = document.images;
  for (var i = 0, len = images.length; i < len; i++) {
    var obj = images[i];
    if (obj.getBoundingClientRect().top - lazy < document.documentElement.clientHeight && !obj.isLoad) {
      obj.isLoad = true;
      if (obj.dataset) 
        imageLoaded(obj, obj.dataset.original);
      else 
        imageLoaded(obj, obj.getAttribute('data-original'));
    }
  }
}
```

有的时候并不能当图片刚好在可视区域的时候再去加载，而要稍微 "预加载"，可以调整下 lazyload() 函数中的 lazy 参数。

如果 "生硬" 地显示图片体验不大好，也可以搞点淡出效果，具体就不说了，可以看完整代码 [Github](https://github.com/hanzichi/hanzichi.github.io/tree/master/2015/picture-lazyload)

这样，一个简单的图片惰性加载 DEMO 就完成了！

PS：惰性加载虽然好处多多，但是也有一个 "非致命" 的缺点，影响 SEO。因为图片都被替换成假的图片，所以会影响图片的收录，**所以这功能不建议在详情页使用**