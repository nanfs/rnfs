import React from 'react'
import { Layout, Icon, Dropdown, Menu } from 'antd'
import { setItemToLocal } from '@/utils/storage'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Header extends React.Component {
  render() {
    const { store } = this.props
    const { username } = store
    console.log(username)
    const renderUserInfo = () => (
      <Menu>
        <Menu.Item key="changePwd">
          <Icon type="lock" />
          <span>修改密码</span>
        </Menu.Item>
        <Menu.Item key="logout" onClick={logOut}>
          <Icon type="logout" />
          <span>注销</span>
        </Menu.Item>
      </Menu>
    )
    const logOut = () => {
      history.push('/login')
      setItemToLocal(null)
    }

    return (
      <Layout.Header className="header">
        <a
          className="logo"
          onClick={() => {
            return history.push('/dashboard')
          }}
        >
          <span className="text">rnfs</span>
        </a>
        <Dropdown overlay={renderUserInfo()} placement="bottomCenter">
          <div className="options">
            <Icon type="user" />
            <span>{username}</span>&nbsp;&nbsp;
            <Icon type="caret-down" />
          </div>
        </Dropdown>
      </Layout.Header>
    )
  }
}
export default Header
