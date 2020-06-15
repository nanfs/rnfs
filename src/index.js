import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import { Provider } from 'mobx-react'
import Store from './Store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <Provider store={new Store()}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </Provider>,
  document.getElementById('app')
)
