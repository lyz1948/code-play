import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { Welcome, PropsChildren, MyTitle, DefaultTitle } from './examples/ch04/app'
import { Clock } from './examples/ch05/app'
import { ArrayMap, ArrayMap2 } from './examples/ch06/app'
import { FindNode } from './examples/ch07/app'
import { StateStatus } from './examples/ch08/app'
import { FormInput } from './examples/ch09/app'
import { FetchData } from './examples/ch10/app'
import { PromiseData } from './examples/ch11/app'


function App() {
  return (
    <div>
      <div>
        <h1>Props属性</h1>
        <Welcome name="Sara" />
        <Welcome name="Marry" />
        <h1>Children 属性</h1>
        <PropsChildren>
          <span>hello</span>
          <span>world</span>
        </PropsChildren>
        <h1>propTypes</h1>
        <MyTitle title={'hello'}/>
        <DefaultTitle />
      </div>

      <div>
        <h1>生命周期</h1>
        <Clock />
      </div>

      <div>
        <h1>Use JavaScript in JSX</h1>
        <ArrayMap />
        <h1>Use Array in JSX</h1>
        <ArrayMap2 />
      </div>

      <div>
        <h1>React.createRef</h1>
        <FindNode />
      </div>

      <div>
        <h1>this.state</h1>
        <StateStatus />
      </div>

      <div>
        <h1>From Input</h1>
        <FormInput />
      </div>

      <div>
        <h1>Fetch Data</h1>
        <FetchData source='https://api.github.com/users/octocat/gists'/>
      </div>

      <div>
        <h1>Promise Data</h1>
        <PromiseData promise={axios.get('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
