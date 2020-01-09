import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import 'bulma'
import './style.scss'

import Login from './components/Login'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  </HashRouter>
)


ReactDOM.render(<App />, document.getElementById('root'))