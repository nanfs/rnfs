import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          <Route
            path={'/login'}
            component={lazy(() => import('@/pages/Login'))}
          />
          <Route
            path={'/'}
            component={lazy(() => import('@/layouts/BasicLayout'))}
          />
        </Switch>
      </Suspense>
    </HashRouter>
  )
}
