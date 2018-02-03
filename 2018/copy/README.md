# HTML5 复制操作

有了 HTML5 后，复制操作变的简单，再也不用 flash 了，典型的代表库是 [clipboard.js](https://github.com/zenorocha/clipboard.js/)

- [index-0](//hanzichi.github.io/2018/copy/index-0.html)（从 input 或者 textarea 元素中复制内容）
- [index-1](//hanzichi.github.io/2018/copy/index-1.html)（从 非 input 或者 textarea 元素中复制内容，构造隐藏的 input 标签）
- [index-2](//hanzichi.github.io/2018/copy/index-2.html)（从 非 input 或者 textarea 元素中复制内容，createRange 动态构造，**有 bug**，先复制局部，再点击复制按钮，复制的内容是之前的）
- [index-3](//hanzichi.github.io/2018/copy/index-3.html)（从 非 input 或者 textarea 元素中复制内容，document.execCommand()+ClipboardEvent，**也有 bug**，先按了复制按钮，然后复制其他东西，结果都是之前复制的东西）
