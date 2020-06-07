import React from 'react'
import ReactDOM from 'react-dom'

export function tick () {
  const element = (
    <div>
      <h1>Tick</h1>
      <h2>It's {new Date().getTime()}</h2>
    </div>
  )
  ReactDOM.render(
    element,
    document.getElementById('app')
  )
}
