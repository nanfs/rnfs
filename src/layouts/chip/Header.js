import React from 'react'
import { Layout } from 'antd'

export default function Header() {
  return (
    <Layout.Header className="header">
      <div
        className="logo"
        onClick={() => {
          return this.props.history.push('/dashboard')
        }}
      >
        <span className="text">rnfs</span>
      </div>
    </Layout.Header>
  )
}
