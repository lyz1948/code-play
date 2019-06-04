import './style.css'
import printLog from './printLog.js'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = 'Webpack hot module server'
  const btn = document.createElement('button')
  btn.innerHTML = 'click me'
  btn.onclick = printLog
  div.appendChild(btn)
  return div
}

let element = component()
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./printLog.js', function() {
    console.log('accepting update the print log module')
    document.body.removeChild(element)
     element = component() // Re-render the "component" to update the click handler
     document.body.appendChild(element)
  })
}