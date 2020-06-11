import React from 'react'
import Loading from '@/layouts/Loading'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    state = {
      component: null
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : <Loading />
    }
  }
  return AsyncComponent
}
