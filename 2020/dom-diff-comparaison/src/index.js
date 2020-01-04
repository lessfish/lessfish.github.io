/* eslint-disable react/react-in-jsx-scope */
/* @jsx h */
import { h, mount, patch } from "petit-dom";
var libs = [];

var currentStep = -1;
var lastInput = "";
var currentInput = "";
var isAddKey = true;
var isKeyAddedConfirmed = false

const steps = [
  "36",
  "3678",
  "7836",
  "3678",
  "123678",
  "12345678",
  "a0123456789b",
  "12345678",
  "12378456",
  "12345678",
  "6ab127cd8",
  "1278",
  "890"
];

// 页面操作区渲染
var vnode = render();
document.querySelector(".app").appendChild(mount(vnode));

/**
 * 确认是否加 key
 */
function confirmKeyAdded () {
  isKeyAddedConfirmed = true 
  update()
}

/**
 * 进入 patch
 */
function update() {
  const oldVnode = vnode;

  // 操作栏 vnode
  vnode = render();

  // 对操作栏打补丁
  // 主要为了展示 current step
  patch(vnode, oldVnode);

  const value = currentInput.split("").filter(s => s).map(s => s.trim());

  // dom diff 变化核心
  // render new value（包括 react/preact/vue/snabbdom)
  libs.forEach(({ render, node }) => {
    render(value, isAddKey, node)
  });

  lastInput = currentInput;
}

function toggleAutoTest() {
  if (currentStep >= 0) {
    currentStep = -1;
    currentInput = "";
  } else {
    currentStep = 0;
    currentInput = steps[currentStep];
  }
  update();
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    currentInput = steps[currentStep];
  }
  update();
}

function render() {
  const isAutoTest = currentStep >= 0;
  const edit =
    currentInput !== lastInput
      ? `'${lastInput}' ➔ '${currentInput}'`
      : "No edit";
  
  return (
    <div>
      <p>
        Add the `key` for dom diff: 
        <input 
          type="checkbox" 
          checked={isAddKey}
          onchange={e => (isAddKey=e.target.checked)}
        />
        {/* for first render, it's must be pressed firstly! for dom observed */}
        <button onclick={confirmKeyAdded}>Click to make sure and start!</button>
      </p>
      {
        isKeyAddedConfirmed ? 
          <div>
            <input
              placeholder="e.g. 12345"
              disabled={isAutoTest}
              value={currentInput}
              oninput={e => (currentInput = e.target.value)}
            />
            <button disabled={isAutoTest} onclick={update}>
              Patch!
            </button>
            <button onclick={toggleAutoTest}>
              {isAutoTest ? "Abort predefined test" : "Start predefined test"}
            </button>
            <p>
              {"Current step : "}
              {edit}
            </p>
            {isAutoTest
              ? <button disabled={currentStep >= steps.length - 1} onclick={nextStep}>
                  Next
                </button>
              : null}
          </div> : ''
      }
    </div>
  );
}

const $root = document.querySelector(".libs");

/**
 * 
 * @param {String} name 
 * @param {Function} render 接受两个参数，可以渲染 `数组` 到 `dom 元素` 上
 */
function register(name, render) {
  const lib = { name, render };
  libs.push(lib);
  const node = document.createElement("div");
  node.id = name;
  $root.appendChild(node);
  lib.node = node;
}

// register 后，页面会生成 dom，里面内容为空
register("react", require("./react-diff").default);
register("preact", require("./preact-diff").default);
// 看起来，vue $mount 挂载的这步操作，是用新的 vnode 生成的 dom，replace 了原来的 dom（即挂载对象）
register("vue", require("./vue-diff").default);
register("snabbdom", require("./snabbdom-diff").default);