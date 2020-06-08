import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import { Provider } from 'mobx-react'
import Store from './Store'

ReactDOM.render(
  <Provider store={new Store()}>
    <Router />
  </Provider>,
  document.getElementById('app')
)
