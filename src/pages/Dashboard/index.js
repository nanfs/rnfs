import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('appStore')
@observer
class Dashboard extends React.Component {
  render() {
    return <div>dashboard {this.props.appStore.useNum}</div>
  }
}
export default Dashboard
