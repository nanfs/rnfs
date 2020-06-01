import React from 'react'
import { Layout } from 'antd'
import dayjs from 'dayjs' // 设置antd时间控件显示为中文
import 'dayjs/locale/zh-cn'
import './base.less'
import Header from './Header'
import Sider from './Sider'

const { Content, Footer } = Layout
// import ProLayout from '@ant-design/pro-layout'
dayjs.locale('zh-cn')

const ContentRouter = () => {
  return <div>Basic</div>
}
export default function BasicLayout(props) {
  console.log('BasicLayout', props)
  const { location } = props
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sider path={location.pathname} collapsed={true} />
        <Layout>
          <Content>
            <ContentRouter />
          </Content>
          <Footer>版权所有</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
