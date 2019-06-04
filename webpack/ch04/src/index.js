function component() {
  const div = document.createElement('div')

  div.className = 'container'
  div.innerHTML = _.join(['hello', 'webpack'])

  return div
}

// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//     component()
//   }).catch(error => 'An error occurred while loading the component')
// }

async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName: "ladash" */ 'lodash')

  component()
}

getComponent().then( comp => {
  document.body.appendChild(comp)
})
