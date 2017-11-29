// 根据 markdown 文件生成 html 文件以及目录
// 考虑多进程。child_process 模块新建子进程
// 模块重新包装了 child_process，调用系统命令更加方便

// todo
// codedog 作为依赖
// 应该有一个命令是 ./node_modules/bin/xxx 的缩写，记不起来了
// 实现不优雅，应该用类似 Promise.all 去实现

const shell = require('shelljs')
const fs = require('fs')
const path = require('path')

let res = []

fs.readdir('./', (err, files) => {
  // 遍历章
  files.forEach(file => {
    if (file === 'node_modules') return
    let chapter = {}
    chapter.chapterName = file 
    chapter.sections = []

    let path1 = path.join(__dirname, file)

    fs.stat(path1, (err, stats) => {
      if (!stats.isDirectory()) return

      fs.readdir(path1, (err, files) => {
        // 遍历节
        files.forEach(file => {
          if (!file.endsWith('.md')) return
          chapter.sections.push(file)

          let path2 = path.join(path1, file)
          // 空格转义
          path2 = path2.replace(/ /g, a => {
            return '\\' + a;
          })

          shell.exec(`codedog ${path2}`)
        })

        res.push(chapter)
      })
    })
  })
})

setTimeout(() => {
  res.sort((a, b) => a.chapterName > b.chapterName)
  
  let markdownStr = ''
  let urlPrefix = `//hanzichi.github.io/css-secret/`
  markdownStr += `# CSS SECRET\n\n`

  res.forEach(chapter => {
    let {chapterName, sections} = chapter

    markdownStr += `## ${chapterName}\n\n`
    sections.sort()

    sections.forEach(sectionName => {
      let url = urlPrefix + chapterName + '/' + sectionName.replace('.md', '.html')
      url = encodeURI(url)
      markdownStr += `- [${sectionName.replace('.md', '')}](${url})\n`
    })

    markdownStr += '\n'
  })

  fs.writeFile('README.md', markdownStr, () => {
    console.log('saved!')
  })
}, 6000)