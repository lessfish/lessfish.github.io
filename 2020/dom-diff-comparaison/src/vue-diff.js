import diffObserver from "./utils";
import Vue from 'vue'
import once from 'lodash.once'

function generateVueInstance(isAddKey) {
  const vm = new Vue({
    // el: '#vue',
    data() {
      return {
        sequence: []
      }
    },
    mounted() {
      // 监听 dom 变化，判断新增、移动或者没移动
      this.diffObs = diffObserver(".vue-seq");
      this.diffObs();
    },
    render: function(h) {
      return h("div", {}, [
        h("h2", {}, "vue"),
        h(
          "div",
          {
            // class 要这么写，和 snabbdom 不同
            "class": {
              "seq": true,
              "vue-seq": true
            }
          },
          this.sequence.map(it =>
            h(
              "div",
              isAddKey ? 
              {
                class: {
                  "box": true
                },
                key: it,
                dataset: { key: it }
              }:
              {
                class: {
                  "box": true
                },
                dataset: { key: it }
              },
              it
            )
          )
        )
      ]);
    }
  })

  return vm
}


const gvm = once(generateVueInstance);

export default function renderDiff(sequence, isAddKey, parentDOM) {
  const vm = gvm(isAddKey)
  vm.sequence = sequence
  vm.$mount(parentDOM)
}