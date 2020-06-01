import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkRoute } from '@/utils/checkPermissions'

function Authorized(props) {
  const { children, authority, noMatch = null } = props
  const childrenRender = typeof children === 'undefined' ? null : children
  return checkRoute(authority, childrenRender, noMatch)
}

export default function AuthorizedRoute(props) {
  console.log('auth', props)
  const {
    component: Component,
    render,
    authority,
    redirectPath,
    RouteProps,
    ...other
  } = props
  return (
    <Authorized
      authority={authority}
      {...other}
      noMatch={
        <Route
          {...RouteProps}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      }
    >
      <Route
        {...RouteProps}
        render={renderProps =>
          Component ? <Component {...renderProps} /> : render(renderProps)
        }
      />
    </Authorized>
  )
}
