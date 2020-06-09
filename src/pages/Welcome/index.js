import React from 'react'
import { inject, observer } from 'mobx-react'
import { Formx } from '@/components'
import { Form, Input, Button } from 'antd'

@inject('store')
@observer
class Welcome extends React.Component {
  render() {
    const { username, changeUserName } = this.props.store
    // console.log(this.Welcome.getFieldsValue())

    const setUser = ({ name }) => {
      console.log('setUser', name)
      changeUserName(name)
    }

    return (
      <Formx onSubmit={setUser} initValues={{ name: username }}>
        <Form.Item name="name" label="用户名" required>
          <Input placeholder="输入名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            修改用户名
          </Button>
          <p> {username}</p>
        </Form.Item>
      </Formx>
    )
  }
}
export default Welcome
