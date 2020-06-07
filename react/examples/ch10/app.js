import React from 'react'
import axios from 'axios'

export class FetchData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      lastGistUrl: ''
    }
  }

  componentDidMount() {
    axios.get(this.props.source).then(res => {
      let lastGist = res.data[0]
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      })
    })
  }

  render() {
    return(
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>
      </div>
    )
  }
}