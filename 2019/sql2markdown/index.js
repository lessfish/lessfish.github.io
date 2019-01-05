
function getRowData(str) {
  str = str.trim()
  // 去除前后括号
  str = str.substring(1, str.length - 1)

  return str.split(',').map(item => removeQuotes(item.trim()))
}

// 去除数据中的引号和反引号
function removeQuotes(str) {
  return str.replace(/[\'\`]/g, '')
}

// 获取列数据最大长度
function getMaxLenInColumn(n) {
  // 遍历行
  let maxn = 0
  for (let i = 0; i < rowsLen; i++) {
    maxn = Math.max(maxn, data[i][n].length)
  }
  return maxn
}

function getMdFromSql(sql) {
  const p = /\(.*?\)/g
  const ret = sql.match(p)
  
  if (!ret) return ''

  // this for window
  this.data = ret.map(item => getRowData(item))
  this.rowsLen = data.length 
  this.columnLen = data[0].length
  this.maxn = []

  data.splice(1, 0, new Array(columnLen).fill(':---'))
  rowsLen += 1

  for (let i = 0; i < columnLen; i++) {
    maxn[i] = getMaxLenInColumn(i)
  }

  let md = ''

  for (let i = 0; i < rowsLen; i++) {
    md += '|'
    const repeatItem = i === 1 ? '-' : ' '
    for (let j = 0; j < columnLen; j++) {
      let item = data[i][j]
      md += ' ' + item + repeatItem.repeat(maxn[j] - item.length)
      md += ' |'
    }
    md += '\n'
  }

  return md
}