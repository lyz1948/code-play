import React from 'react'

export class StateStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }

  handleClick(e) {
    console.log(e)
    this.setState({
      liked: !this.state.liked
    })
  }

  render() {
    let text = this.state.liked ? '喜欢' : '讨厌'
    return (
      <div>
        <p onClick={() => this.handleClick()}>
          你 { text } 我，你点击了我。
        </p>
      </div>
    )
  }
}
