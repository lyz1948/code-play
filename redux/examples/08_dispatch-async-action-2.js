import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({ 
  speak: function(state = {}, action) {
    switch(action.type) {
      case 'SAY':
      return {
        ...state,
        message: action.message
      }
      default:
        return state
    }
}})

const store_0 = createStore(reducer)

const sayActionCreator = function(message) {
  return function(dispatch) {
    setTimeout(function() {
      dispatch({
        type: 'SAY',
        message
      }, 2000)
    })
  }
}

store_0.dispatch(sayActionCreator('hi hi'))
