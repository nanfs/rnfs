import React from 'react'
import { HashRouter, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import dayjs from 'dayjs' // 设置antd时间控件显示为中文
import 'dayjs/locale/zh-cn'
import routerData from '*/router'
import { getUser } from '@/utils/checkPermissions'
import AuthorizedRoute from './AuthorizedRoute'
import asyncComponent from '*/asyncComponent'
import Header from './chip/Header'
import Sider from './chip/Sider'
import './chip/base.less'

dayjs.locale('zh-cn')

function RouterView(route) {
  if (route.children) {
    return route.children.map(childRoute => RouterView(childRoute))
  }
  return (
    <AuthorizedRoute
      path={route.path}
      key={route.path}
      authority={route.authority}
      component={asyncComponent(route.component)}
      redirectPath="/permission/403"
    />
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
                <Redirect exact from="/" to="/dashboard" />
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
