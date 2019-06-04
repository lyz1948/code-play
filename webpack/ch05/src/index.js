import _ from 'lodash'
import printLog from './printLog.js'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = _.join(['hello', 'webpack'])
  div.onclick = printLog.bind(null, 'Hello lyz')
  return div
}

document.body.appendChild(component())
