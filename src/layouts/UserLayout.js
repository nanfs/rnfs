import React from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'

import routerData from '../../config/router'

export default function UserLayout() {
  console.log('userlayout', routerData)
  return (
    <Layout>
      <Switch>
        {routerData
          .filter(item => item.component)
          .map((item, index) => (
            <Route
              key={index}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Layout>
  )
}
