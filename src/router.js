import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '*/asyncComponent'
import AuthorizedRoute from '@/layouts/AuthorizedRoute'

export default function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route
          path={'/login'}
          component={asyncComponent(() => import('@/pages/Login'))}
        />
        <AuthorizedRoute
          path="/"
          authority={'admin'}
          component={asyncComponent(() => import('@/layouts/BasicLayout'))}
          redirectPath="/login"
        />
        <Redirect to="/login" />
      </Switch>
    </HashRouter>
  )
}
