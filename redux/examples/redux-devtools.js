import { createStore } from 'redux'

var store = createStore(() => {})

var actionCreator = function() {
  return {
    type: 'AN_ACTION'
  }
}

console.log(actionCreator())
// { type: 'AN_ACTION' }