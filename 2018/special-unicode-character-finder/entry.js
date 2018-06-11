if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

console.log('ENV: ' + process.env.NODE_ENV)

import './style.scss'

// 以下开始写自己的 js
// ...

document.querySelector('#finder-btn').onclick = () => {
  let val = document.querySelector('textarea').value 
  let caseNum = 0

  document.querySelector('.result-area').innerHTML = val.replace(/(\u2028|\u2029)/g, () => {
    caseNum++
    return "<span class='special-case'></span>"
  })

  document
    .querySelector('#finder-result')
    .innerHTML = `共发现 <span class="text-danger">${caseNum}</span> 处`
}


document.querySelector('#remove-btn').onclick = () => {
  let val = document.querySelector('textarea').value
  let caseNum = 0

  let res = val.replace(/(\u2028|\u2029)/g, () => {
    caseNum++
    return ""
  })

  document.querySelector('textarea').value = res

  document
    .querySelector('#remove-result')
    .innerHTML = `删除成功！共删除 <span class="text-danger">${caseNum}</span> 处`
}