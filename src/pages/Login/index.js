import React from 'react'
import LoginFrom from './chip/LoginForm'
import './login.less'

export default function Login(props) {
  return (
    <div className="login-wrap">
      <LoginFrom className="login-form" {...props} />
      <div className="footer">
        <p>This is template nanfs@DMS</p>
      </div>
    </div>
  )
}
