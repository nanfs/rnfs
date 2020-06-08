import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Layout, Button } from 'antd'
import { MyIcon } from '@/components'
import routerData from '*/router'

const { SubMenu } = Menu

export default function Sider(props) {
  const [, setOpenKeys] = useState([])
  const rootSubmenuKeys = []

  useEffect(() => {
    routerData.forEach(element => {
      if (element.children) {
        rootSubmenuKeys.push(element.meta.title)
        element.children.forEach(item => {
          if (props.path === item.path) {
            setOpenKeys(element.meta.title)
          }
        })
      }
    })
  })

  const renderMenuItem = item => (
    <Menu.Item key={item.path}>
      <NavLink to={item.path}>
        {item.iconComonpent ? (
          <MyIcon type={item.icon} component="svg" />
        ) : (
          <Icon type={item.meta.icon} />
        )}
        <span className="text">{item.meta.title}</span>
      </NavLink>
    </Menu.Item>
  )

  // 两级
  const renderSubMenu = subMenu => (
    <SubMenu
      key={subMenu.meta.title}
      title={
        <span>
          {subMenu.iconComonpent ? (
            <MyIcon type={subMenu.meta.icon} />
          ) : (
            <Icon type={subMenu.meta.icon} />
          )}
          <span className="text">{subMenu.meta.title}</span>
        </span>
      }
    >
      {subMenu.children.map(item => {
        if (item.children) {
          return renderSubMenu(item)
        }
        return renderMenuItem(item)
      })}
    </SubMenu>
  )

  return (
    <Layout.Sider className="sider" collapsible trigger={null}>
      <Button className="trigger" type="link">
        <Icon type="menu" style={{ fontSize: '20px' }}></Icon>
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        selectedKeys={[props.path]}
      >
        {routerData.map(item => {
          if (item.children) {
            return renderSubMenu(item)
          }
          return renderMenuItem(item)
        })}
      </Menu>
    </Layout.Sider>
  )
}
