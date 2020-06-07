import React from 'react'

export class FindNode extends React.Component {
  constructor(props) {
    super(props)
    this.myTextInput = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.myTextInput.current.focus()
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.myTextInput}/>
        <input type="button" value='点击我，获取焦点' onClick={this.handleClick}/>
      </div>
    )
  }
}