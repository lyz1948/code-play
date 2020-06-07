import { createStore, combineReducers, applyMiddleware } from 'redux'

const thunkMiddleware = function({dispatch, getState}) {
  return function(next) {
    return function(action) {
      return typeof action === 'function'
        ? action(dispatch, getState)
        : next(action)
    }
  }
}

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)

const reducer = combineReducers({
  speak: function(state = {}, action) {
    console.log('speaker was called with state', state, 'and action', action)
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

const store_0 = finalCreateStore(reducer)

const asyncActionCreator = function(message) {
  return function(dispatch) {
    setTimeout(function() {
      console.log(new Date(), 'Dispatch action now:')
      dispatch({
        type: 'SAY',
        message
      })
    }, 2000)
  }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")
store_0.dispatch(asyncActionCreator('Hi there'))