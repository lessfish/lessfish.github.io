const each = (arrLike, fn) => {
  for (var i = 0; i < arrLike.length; i++) {
    fn(arrLike[i], i, arrLike);
  }
};

const indexOf = [].indexOf;
const slice = [].slice;

export default function getObserver(selector) {
  var target;
  var config = { childList: true, subtree: true, characterData: true };
  var prevNodes = [];

  var observer = new MutationObserver(function(mutations) {
    console.log('dom 更新了！（包括移动/新增/删除，innerHTML 数据的变化，等）')
    var allNodes = target.childNodes;
    var addedNodes = [];
  
    mutations.forEach(function(mutation) {
      observer.disconnect();
      if (mutation.type === "childList") {
        if (mutation.addedNodes && mutation.addedNodes.length) {
          console.log('有新增 dom')
          console.log(mutation.addedNodes)
        }
        each(mutation.addedNodes, node => addedNodes.push(node));
      }
    });
    observer.disconnect();

    // 因为 move 的元素会被当作 new added 的元素，从 mutation.addedNodes 中取到
    // 所以可以先认为 prevNodes 都是没移动过的（如果是移动过的，也会在下面一个 each 中被覆盖状态）
    each(prevNodes, node => {
      node.classList.toggle("inserted", false);
      node.classList.toggle("moved", false);
      node.classList.toggle("old", true);
      node.classList.toggle("lcs", true); // not moved
    });

    // 遍历新 dom 列表
    // 新增的，或者 move 的
    each(addedNodes, node => {
      if (node.nodeType !== 1) return
      // 如果新的 dom 之前没有，则是新 insert 的
      if (indexOf.call(prevNodes, node) < 0) {
        node.classList.toggle("inserted", true);
      } else { // 否则是 moved 的
        node.classList.toggle("moved", true);
        node.classList.toggle("lcs", false);
      }
    });
    prevNodes = slice.call(allNodes);
    observer.observe(target, config);
  });

  return function observeDiffs() {
    // 需要观察变化的 dom
    target = document.querySelector(selector);
    observer.observe(target, config);
  };
}
