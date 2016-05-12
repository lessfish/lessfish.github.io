// 把要写的所有内容的html代码先放到变量str中
// 然后设置计时器每75ms读一个字符，也就是实现打字效果
// 如果读到的是html标签，则把整个读完
// 而如果标签只写了一半没有闭合css同样是有效果的，如果没这个hack也出不来这个打字机效果

$.fn.typewriter = function() {
  var $ele = $(this), str = $ele.html(), progress = 0;
  $ele.html('');

  var timer = setInterval(function() {
    var current = str.substr(progress, 1);

    if (current == '<') {
      progress = str.indexOf('>', progress) + 1;
    } else {
      progress++;
    }

    $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));

    if (progress >= str.length) {
      clearInterval(timer);
    }
  }, 75);
};