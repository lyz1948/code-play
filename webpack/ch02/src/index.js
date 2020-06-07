import './style.css'
import Icon from './scan.png'

function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = 'Hello Webpack Use Css Loader'

  const myIcon = new Image()
  myIcon.src = Icon

  div.appendChild(myIcon)

  const fontIcon = document.createElement('i')
  fontIcon.className = 'iconfont icon-heart1'

  div.appendChild(fontIcon)

  return div
}

document.body.appendChild(component())
