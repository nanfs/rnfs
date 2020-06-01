import React from 'react'
import { Router } from 'react-router-dom'

import RouteView from '@/components/RouteView'
import { AuthorizedRoute } from '@/components/Authorized'
import getRouterConfig from '../config/router'

// eslint-disable-next-line react/display-name
export default ({ history, app }) => {
  const routes = getRouterConfig(app)
  return (
    <Router history={history}>
      <RouteView
        routes={routes}
        renderRoute={props => {
          const { path, authority, component, ...other } = props
          return (
            <AuthorizedRoute
              path={path}
              authority={authority}
              component={component}
              redirectPath="/login"
              RouteProps={other}
            />
          )
        }}
      />
    </Router>
  )
}
