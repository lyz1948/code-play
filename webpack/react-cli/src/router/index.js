import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../views/Home.jsx'
import About from '../views/About.jsx'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      <Link to="/">Home</Link>&emsp;|&emsp;
      <Link to="/about">About</Link>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Switch>
    </main>
  </div>
)

export default PrimaryLayout
