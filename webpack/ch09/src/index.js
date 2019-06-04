import printLog from './printLog.js'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = 'Hello Webpack Use Css Loader'
  const btn = document.createElement('button')
  btn.innerHTML = 'click me'
  btn.onclick = printLog
  div.appendChild(btn)
  return div
}

document.body.appendChild(component())