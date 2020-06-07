import Vue from 'vue'
import Element from './CreateElement.vue'

Element.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Element, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.getElementById('phone').appendChild(component.$el)

  const element = Instance.$children[0]

  return {
    add(noticeProps) {
      element.add(noticeProps)
    },
    remove(name) {
      element.remove(name)
    }
  }
}

export default Element
