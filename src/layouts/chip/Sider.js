import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon, Layout, Button } from 'antd'
import { MyIcon } from '@/components'
import routerData from '*/router'

const { SubMenu } = Menu

export default function Sider({ path }) {
  const [openKeys, setOpenKeys] = useState([path])
  const [collapsed, setCollapsed] = useState(false)
  // 默认过滤 父级展示
  const setFatherOpen = childPath => {
    routerData
      .filter(father => father.children)
      .forEach(element => {
        if (element.children.find(item => item.path === childPath)) {
          return setOpenKeys([childPath, element.path])
        }
      })
  }

  useEffect(() => {
    setFatherOpen(path)
  }, [])

  const renderMenuItem = item => (
    <Menu.Item
      key={item.path}
      onClick={() => {
        setOpenKeys([item.path])
        setFatherOpen(item.path)
      }}
    >
      <NavLink to={item.path}>
        {item.meta.iconComonpent ? (
          <MyIcon type={item.meta.icon} component="svg" />
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
      key={subMenu.path}
      title={
        <span>
          {subMenu.meta.iconComonpent ? (
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
    <Layout.Sider
      className="sider"
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <Button
        className="trigger"
        type="link"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon type="menu"></Icon>
      </Button>
      <Menu
        mode="inline"
        selectedKeys={[path]}
        openKeys={collapsed ? [] : openKeys}
        onOpenChange={key => setOpenKeys(key)}
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
