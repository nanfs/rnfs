import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import dayjs from 'dayjs' // 设置antd时间控件显示为中文
import 'dayjs/locale/zh-cn'
import routerData from '*/router'
import './chip/base.less'
import Header from './chip/Header'
import Sider from './chip/Sider'

const { Content, Footer } = Layout
dayjs.locale('zh-cn')
export default function BasicLayout(props) {
  const { location } = props
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sider path={location.pathname} collapsed={true} />
        <Layout>
          <Content>
            <HashRouter>
              <Suspense fallback={<Spin size="large" />}>
                <Switch>
                  {routerData.map((item, index) => {
                    return (
                      <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        component={lazy(item.component)}
                      />
                    )
                  })}
                  <Redirect to="/dashboard" />
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
