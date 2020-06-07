import { createStore } from 'redux'

export const store_0 = createStore(() => {})

const reducer = function(...args) {
  console.log('Reducer was called with args', args)
}

export const store_1 = createStore(reducer)