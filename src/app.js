import React from 'react'
import { createBrowserHistory } from 'history'
import { Switch, Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { AuthorizedRoute } from '@/components/Authorized'
import UserLayout from '@/layouts/UserLayout'
import BasicLayout from '@/layouts/BasicLayout'

export default function App() {
  const history = createBrowserHistory()
  console.log('app')
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <AuthorizedRoute
            path="/login"
            authority={''}
            render={props => UserLayout(props)}
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            authority={''}
            render={props => BasicLayout(props)}
            redirectPath="/login"
          />
        </Switch>
      </Router>
    </ConfigProvider>
  )
}
