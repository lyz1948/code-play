import React from 'react'

export class FormInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 'hello' }
  }

  handleChange(value) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const value = this.state.value
    return (
      <div>
        <input type="text" value={value} onChange={ (event) => this.handleChange(event)}/>
        <p>{value}</p>
      </div>
    )
  }
}