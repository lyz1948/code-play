import { createStore, combineReducers } from 'redux'

const userReducer = function(state = {}, action) {
  console.log('usersReducer was called with state', state, 'and action', action)
  switch(action.type) {
    default:
      return state
  }
}

const itemReducer = function(state = [], action) {
  console.log('itemsReducer was called with state', state, 'and action', action)
  switch(action.type) {
    default:
      return state
  }
}

const reducer = combineReducers({
  users: userReducer,
  items: itemReducer
})

const store_0 = createStore(reducer)
console.log('store_0 state after initialization:', store_0.getState())