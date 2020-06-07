import React from 'react'

const arr = ['Marry', 'Lee', 'Mark']
var arr2 = [
  <h3 key={1}>Hello world!</h3>,
  <h4 key={2}>React is awesome</h4>
]
export class ArrayMap extends React.Component {
  render() {
    return (
      <div>
        {arr.map((name) => {
          return <div key={name}>hello {name}</div>
        })}
      </div>
    )
  }
}

export class ArrayMap2 extends React.Component {
  render() {
    return (
      <div>{arr2}</div>
    )
  }
}