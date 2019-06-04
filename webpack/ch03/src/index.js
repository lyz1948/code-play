import printLog from './print'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = 'Webpack Development using watch and hot modules'

  return div
}

document.body.appendChild(component())

printLog()
