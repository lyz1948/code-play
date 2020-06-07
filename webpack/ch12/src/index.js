function component() {
  const div = document.createElement('div')
  const btn = document.createElement('button')

  div.innerHTML = ['hello', 'webpack'].join('\n\n')
  btn.innerHTML = 'click me to print log'
  div.appendChild(btn)
  btn.onclick = e => import(/* webpackChunkName "print" */ './print').then(module => {
    const print = module.default

    print()
  })
  return div
}

document.body.appendChild(component())
