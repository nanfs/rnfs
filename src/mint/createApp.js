/* global document */
import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

function createApp() {
  const history = createHashHistory()
  // 单例, 通过app来暴露接口
  const app = {
    _router: null,
    _history: history,
    router,
    start
  }
  return app

  function router(r) {
    app._router = r
  }

  function start(appSelector) {
    // 如果指定appSelector， 才是真正启动
    if (appSelector) {
      const root = document.getElementById(appSelector)
      ReactDOM.render(
        <ConfigProvider locale={zhCN}>
          {app._router({ history: app._history, app })}{' '}
        </ConfigProvider>,
        root
      )
    }
  }
}

export default createApp
