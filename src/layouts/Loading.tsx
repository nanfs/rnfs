import React, { useEffect } from 'react'
import { Spin } from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const Loading: React.FC<{}> = () => {
  useEffect(() => {
    Nprogress.start()
    return () => Nprogress.done()
  })
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  )
}
export default Loading
