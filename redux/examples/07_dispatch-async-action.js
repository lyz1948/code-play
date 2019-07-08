import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  speak: function(action = {}, action) {
    switch(action.type) {
      case 'SAY':
        return {
          ...state,
          message: action.message
        }
      default:
        return state
    }
  }
})

const store_0 = createStore(reducer)

const sayActionCreator = function(message) {
  return {
    type: 'SAY',
    message
  }
}

console.log("\n", 'Running our normal action creator:', "\n")
console.log(new Date())
store_0.dispatch(sayActionCreator('haha'))

console.log(new Date())
console.log('store_0 state after action SAY:', store_0.getState())

// const sayActionCreator = function(message) {
//   setTimeout(function() {
//     return {
//       type: 'SAY',
//       message
//     }
//   }, 3000)
// }

// const sayActionCreator = function(message) {
//   return function(dispatch) {
//     setTimeout(function() {
//       dispatch({
//         type: 'SAY',
//         message
//       })
//     }, 2000)
//   }
// }