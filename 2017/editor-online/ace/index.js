const editor = ace.edit("editor")
editor.setTheme("ace/theme/monokai")
editor.getSession().setMode("ace/mode/html")
// editor.setShowPrintMargin(false);
editor.getSession().setTabSize(2)
editor.getSession().setValue(
`<!DOCTYPE html>
<html>
<head>
  <title></title>
  <style>

  </style>
</head>
<body>

</body>
</html>`)

let iframe = document.getElementsByClassName('preview')[0];

editor.getSession().on('change', function(e) {
  iframe.srcdoc =  editor.getValue()
})

document.body.onclick = e => {
  let target = e.target
  if (target.className !== 'btn-new-page') return
  runCode()
}

function runCode() {
  let code = ace.edit("editor").getValue()
  let handler = window.open('')
  handler.opener = null
  handler.document.write(code)
  handler.document.close()
}