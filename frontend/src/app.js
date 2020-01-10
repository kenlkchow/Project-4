import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </HashRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))