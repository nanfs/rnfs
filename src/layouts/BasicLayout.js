import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import dayjs from 'dayjs' // 设置antd时间控件显示为中文
import 'dayjs/locale/zh-cn'
import routerData from '*/router'
import Loading from '@/layouts/Loading'
import { checkAuth, getUser } from '@/utils/checkPermissions'
import Header from './chip/Header'
import Sider from './chip/Sider'
import './chip/base.less'

dayjs.locale('zh-cn')

function RouterView(route) {
  if (route.children) {
    return route.children.map(childRoute => RouterView(childRoute))
  }
  if (!getUser()) {
    return <Redirect to="/login" />
  }
  return checkAuth(route.authority) ? (
    <Route
      path={route.path}
      key={route.path}
      component={lazy(route.component)}
    />
  ) : (
    <Redirect to="/permission/403" from={route.path} key={route.path} />
  )
}
const { Content, Footer } = Layout
export default function BasicLayout(props) {
  const { location } = props
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header {...props} user={getUser()} />
      <Layout>
        <Sider path={location.pathname} collapsed={true} />
        <Layout>
          <Content>
            <HashRouter>
              <Suspense fallback={<Loading />}>
                <Switch>
                  {routerData.map(route => RouterView(route)).flat()}
                  <Redirect to="/permission/404" />
                </Switch>
              </Suspense>
            </HashRouter>
          </Content>
          <Footer>版权所有</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
