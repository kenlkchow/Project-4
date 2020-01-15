import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'bulma'
import './style.scss'

import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Nodes from './components/Nodes'
import Home from './components/Home'
import Profile from './components/Profile'

const App = () => (
  <HashRouter>
    <Navbar />
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/nodes" component={Nodes} />

      <Route exact path="/profile" component={Profile} />
    </Switch>
  </HashRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))