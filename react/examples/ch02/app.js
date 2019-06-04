import React from 'react'
import ReactDOM from 'react-dom'

function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
}

function getGreeting(user) {
  if (user) {
    return <h3>Hello, {formatName(user)}!</h3>
  }
  return <h3>Hello, Stranger.</h3>
}

const element = (
 getGreeting(user)
)

ReactDOM.render(
  element,
  document.getElementById('app')
)