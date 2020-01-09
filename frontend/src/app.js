import React from 'react'
import ReactDOM from 'react-dom'
import Register from './components/Register'
import { HashRouter, Switch, Route } from 'react-router-dom'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
    </Switch>
  </HashRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)