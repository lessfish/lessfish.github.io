为了方便查看 dom diff 过程，fork 自 [Children diff comparaison](https://codesandbox.io/s/BkLpXYQn)，在其基础上增加了 vue 的 dom diff，并且增加了是否添加 key 的选项

使用方法，首先需要确定 dom diff 是否需要 key，然后点确定按钮

接着可以点 "Start predefined test" 按钮，然后一路 "next"，运行 demo 提供的案例

也可以自己写案例，然后进行 "patch"

对于没有添加 key 的 dom diff，标签其实是复用了，简单的说，123 -> 321，其实是 1 基础上改造成了 3，第二位不动，第三位在 3 的基础上改造成了 1。如果是有 key，我们会根据 key 来判断是否是同一个 node，如果没加 key，相同 tag 会被认为是同一个 node

---

这个 demo 的整体思路是用 MutationObserver API 来实现 dom 变化的监测，然后 dom diff 完后，patch 过程会触发 dom 变化，新增的 dom 结构或者移动的 dom 结构便会被 MutationObserver 捕获到

