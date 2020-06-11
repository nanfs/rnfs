import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '*/asyncComponent'

import { getUser } from '@/utils/checkPermissions'

export default function Router() {
  console.log('123', getUser())
  return (
    <HashRouter>
      <Switch>
        <Route
          path={'/login'}
          component={asyncComponent(() => import('@/pages/Login'))}
        />
        <Route
          path={'/'}
          component={asyncComponent(
            getUser()
              ? () => import('@/layouts/BasicLayout')
              : () => <Redirect to="/login" />
          )}
        />
        )
        <Redirect to="/login" />
      </Switch>
    </HashRouter>
  )
}
