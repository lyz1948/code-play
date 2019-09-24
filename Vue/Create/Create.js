import NewElement from './CreateElement.js'

// let elemInstance

// function getElemInstance () {
//   elemInstance = elemInstance || NewElement.newInstance()
//   return elemInstance
// }

function elem(type = 'text') {
  let instance = NewElement.newInstance()

  instance.add(type)
}

export default {
  create(options) {
    return elem(options)
  }
}
