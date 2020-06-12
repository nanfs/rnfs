import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAuth } from '@/utils/checkPermissions'

function Authorized(props) {
  const { children, authority, noMatch = null } = props
  const childrenRender = typeof children === 'undefined' ? null : children
  if (checkAuth(authority)) {
    return childrenRender
  }
  return noMatch
}

export default function AuthorizedRoute(props) {
  const { component: Component, authority, path, redirectPath } = props
  return (
    <Authorized
      authority={authority}
      noMatch={
        <Route render={() => <Redirect to={{ pathname: redirectPath }} />} />
      }
    >
      <Route path={path} key={path} component={Component} />
    </Authorized>
  )
}
