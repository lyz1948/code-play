import { createStore, combineReducers } from 'redux'

const itemsReducer = function(state = [], action) {
  console.log('items reducer was called with state', state, 'action ', action)
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

const addItemActionCreator = function(item) {
  return {
    type: 'ADD_ITEM',
    item
  }
}

const reducer = combineReducers({ items: itemsReducer })

const store_0 = createStore(reducer)

store_0.subscribe(function() {
  console.log('store_0 has been updated, Latest store state ', store_0.getState())
  // 更新视图
})

store_0.dispatch(addItemActionCreator({ id: 1, description: 'reducer' }))