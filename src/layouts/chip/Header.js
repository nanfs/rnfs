import React from 'react'
import { Layout, Icon, Dropdown, Menu } from 'antd'
import { getUser } from '@/utils/checkPermissions'
import { setItemToLocal } from '@/utils/storage'

export default function Header(props) {
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
    setItemToLocal(null)
  }

  return (
    <Layout.Header className="header">
      <a
        className="logo"
        onClick={() => {
          return props.history.push('/dashboard')
        }}
      >
        <span className="text">rnfs</span>
      </a>
      <Dropdown overlay={renderUserInfo()} placement="bottomCenter">
        <div className="options">
          <Icon type="user" />
          <span>{getUser()}</span>&nbsp;&nbsp;
          <Icon type="caret-down" />
        </div>
      </Dropdown>
    </Layout.Header>
  )
}
