import React, { useState } from 'react'
import { Button, Input, Form, Icon } from 'antd'
import { Formx } from '@/components'
import { required } from '@/utils/valid'
import { setSessionItem } from '@/utils/storage'
import { wrapResponse } from '@/utils/tool'
import loginApi from '@/services/login'

export default function LoginForm(props) {
  const [submitting, setSubmitting] = useState(false)
  const formItemLayout = { wrapperCol: { sm: { span: 24 } } }

  const login = values => {
    setSubmitting(true)
    console.log('login', values)
    loginApi
      .login(values)
      .then(res =>
        wrapResponse(res).then(() => {
          setSubmitting(false)
          const result =
            typeof res.data === 'object'
              ? res.data
              : {
                  userName: res.data,
                  userRole: res.data,
                  threePowersSwitch: false,
                  userId: 1
                }
          console.log(result)
          setSessionItem(result)
          props.history.push('dashboard')
        })
      )
      .catch(() => {
        setSubmitting(false)
      })
  }

  return (
    <Formx
      submitting={submitting}
      onSubmit={login}
      className="login-form"
      formItemLayout={formItemLayout}
    >
      <Form.Item name="username" required rules={[required]}>
        <Input prefix={<Icon type="user" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" required rules={[required]}>
        <Input.Password
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="密码"
          visibilityToggle
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={submitting}
        >
          登录
        </Button>
      </Form.Item>
    </Formx>
  )
}
