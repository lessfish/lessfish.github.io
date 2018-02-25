该组件即 [SegmentFault Live](https://segmentfault.com/lives) 分数显示部分的实现

如果没有半分，用 font-awesome 的 `.fa-star` 类就可以，但是有半分，所以用了 `.fa-star-half`，在同一位置遮住 `.fa-star`。因为两者宽度不一样，所以要指定宽度，另外一个可以调整的是字体大小 `font-size`，毕竟两者也是特殊的字体。星星之间的间隔其实根据宽度调整就可以了。