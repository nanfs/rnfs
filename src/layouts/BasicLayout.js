import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import dayjs from 'dayjs' // 设置antd时间控件显示为中文
import 'dayjs/locale/zh-cn'
import routerData from '*/router'
import { checkAuth, getUser } from '@/utils/checkPermissions'
import asyncComponent from '*/asyncComponent'
import Header from './chip/Header'
import Sider from './chip/Sider'
import './chip/base.less'

dayjs.locale('zh-cn')

function RouterView(route) {
  if (route.children) {
    return route.children.map(childRoute => RouterView(childRoute))
  }
  if (!getUser()) {
    return <Redirect to="/login" key={route.path} />
  }
  return checkAuth(route.authority) ? (
    <Route
      path={route.path}
      key={route.path}
      component={asyncComponent(route.component)}
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
              <Switch>
                {routerData.map(route => RouterView(route)).flat()}
                <Redirect to="/permission/404" />
              </Switch>
            </HashRouter>
          </Content>
          <Footer>版权所有</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
