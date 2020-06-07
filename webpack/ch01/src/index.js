function component() {
  const div = document.createElement('div')

  div.innerHTML = 'Hello Webpack'

  return div
}

document.body.appendChild(component())