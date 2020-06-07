import React from 'react'

export class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date(), count: 0 }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.timerId = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    console.log('component will unmount')
    clearInterval(this.timerId)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <p>count {this.state.count}</p>
        <h4>It's {this.state.date.getTime()}</h4>
      </div>
    )
  }
}