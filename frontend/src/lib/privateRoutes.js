import { Route, Redirect } from 'react-router-dom'
import Auth from './authMethods'

import React from 'react'


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthorized() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute