# 不可见 Unicode 字符查找

在写 js 中，如果字符串混入了 `\u2028` 或者 `\u2029`，可能会出现意想不到的错误。这两个 Unicode 字符，不可见，正常情况下是不能出现在代码中的，需要进行处理

手动的话，可以先将字符串用 <http://tool.chinaz.com/Tools/Unicode.aspx> 转为 Unicode 码，然后用这个工具继续搜索 <https://unicode-table.com/cn/>

今天第二次碰到了这个问题，so 做了这个简单的工具，目前只支持处理 `\u2028` 和 `\u2029`

测试用例可见 <https://www.v2ex.com/t/397117>，那是我第一次碰到这个问题