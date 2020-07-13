import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../config/asyncComponent'
import AuthorizedRoute from '@/layouts/AuthorizedRoute'

const Router: React.FC<any> = () => {
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
export default Router
