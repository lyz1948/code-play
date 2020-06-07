import React from 'react'

// export default class About extends React.Component {
//   render() {
//     return (<h2>About</h2>)
//   }
// }

import * as React from 'react'

interface AppState {
  count: number;
}

interface AppProps {
  steps: number;
}

interface AppRefs {
  stepInput: HTMLInputElement;
}

export default class TestApp extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      count: 0
    }
  }

  incrementCounter() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <input type="text" ref="stepInput" />
        <button onClick={() => this.incrementCounter()}>Increment</button>
        Count : {this.state.count}
      </div>
    )
  }
}
