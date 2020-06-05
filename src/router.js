import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Loading from '@/layouts/Loading'

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
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
