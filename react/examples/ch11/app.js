import React from 'react'
import axios from 'axios'

export class PromiseData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      data: null
    }
  }

  componentDidMount() {
    this.props.promise.then(
      res => this.setState({ loading: false, data: res.data }),
      error => this.setState({ loading: false, error: error })
    )
  }

  render() {
    if (this.state.loading) {
      return <span>loading...</span>
    }
    else if (this.state.error !== null) {
      return <span>Error {this.state.error.message}</span>
    } else {
      let repos = this.state.data.items
      let repoList = repos.map((repo, index) => {
        return (
          <li key={index}><a href={repo.html_url}>{repo.name}</a>({repo.stargazers_count})<br/> {repo.description}</li>
        )
      })
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      )
    }
  }
}