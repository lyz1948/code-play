import { createStore, combineReducers } from 'redux'

const userReducer = function(state = {}, action) {
  console.log(
    'users reducer was called with state ',
    state,
    'and action ',
    action
  )
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}

const itemsReducer = function(state = [], action) {
  console.log(
    'users reducer was called with state ',
    state,
    'and action ',
    action
  )
  switch(action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.item
      ]
    default:
      return state
  }
}

const reducer = combineReducers({
  users: userReducer,
  items: itemsReducer
})

const store_0 = createStore(reducer)
console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())

store_0.dispatch({
  type: 'AN_ACTION'
})

console.log('store_0 state after action AN_ACTION:', store_0.getState())

const setNameActionCreator = name => {
  return {
    type: 'SET_NAME',
    name
  }
}

store_0.dispatch(setNameActionCreator('lyz'))

console.log('store_0 state after action SET_NAME:', store_0.getState())