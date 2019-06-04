import React from 'react'
import PropTypes from 'prop-types'

export class Welcome extends React.Component {
  render() {
    return <h4>hello {this.props.name}</h4>
  }
}

export class PropsChildren extends React.Component {
  render() {
    return <ol>
      {
        React.Children.map(this.props.children, function(child) {
          return <li>{child}</li>
        })
      }
    </ol>
  }
}

export class MyTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }
  render() {
    return <h4>{this.props.title}</h4>
  }
}

export class DefaultTitle extends React.Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    title: 'default props title'
  }
  render() {
    return <h4>{this.props.title}</h4>
  }
}

// export function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }