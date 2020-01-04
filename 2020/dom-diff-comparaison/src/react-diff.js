import React from "react";
import { render } from "react-dom";
import diffObserver from "./utils";

class Diff extends React.Component {
  componentDidMount() {
    // 监听 dom 变化，判断新增、移动或者没移动
    this.diffObs = diffObserver(".react-seq");
    this.diffObs();
  }

  render() {
    return (
      <div>
        <h2>react</h2>
        <div className="seq react-seq">
          {
            this.props.sequence.map(it => {
              const attrs = {
                // key: it,
                'data-key': it,
                className: 'box'
              }

              if (this.props.isAddKey) attrs.key = it
              
              return (
                <div 
                  // / key={this.props.isAddKey ? it : null} 
                  // key={it}
                  // data-key={it} 
                  // className="box"
                  {...attrs}
                >
                {it}
                </div>
              )
            }
          )}
        </div>
      </div>
    );
  }
}

// 函数也能当作组件
export default function renderDiff(sequence, isAddKey, parentDOM) {
  render(<Diff sequence={sequence} isAddKey={isAddKey}/>, parentDOM);
}
