import React from 'react'
import { Modal, Button, notification, message } from 'antd'
import { wrapResponse } from '@/utils/tool'
import classnames from 'classnames'
import './index.less'

const ModalCfg_init = {
  forceRender: true,
  // destroyOnClose: true,
  loading: false,
  okText: '确定',
  cancelText: '取消',
  hasFooter: true
}
export function createModalCfg(myCfg) {
  return { ...ModalCfg_init, ...myCfg }
}

class Modalx extends React.Component {
  state = {
    show: false,
    submitting: false
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this)
    this.form = (this.formRef && this.formRef.props.form) || undefined
  }

  componentDidUpdate() {
    this.form = (this.formRef && this.formRef.props.form) || undefined
  }

  show = () => {
    return new Promise(resolve => {
      this.setState(
        {
          show: true
        },
        resolve(true)
      )
    })
  }

  // 提交后出错处理
  break = error => {
    if (error) {
      message.error(error.message || error)
    }
    this.setState({
      submitting: false
    })
  }

  // 关闭后 如果有表单 重置表单
  afterClose = () => {
    this.form && this.form.resetFields()
  }

  onClose = () => {
    const { onClose } = this.props
    this.setState({
      show: false,
      submitting: false
    })
    onClose && onClose()
  }

  beforeSubmit = form => {
    return new Promise((resolve, reject) => {
      if (form) {
        form.validateFieldsAndScroll((errors, values) => {
          if (!errors) {
            this.setState({
              submitting: true
            })
            resolve(values)
          }
          reject(errors)
        })
      }
      this.setState({
        submitting: true
      })
    })
  }

  afterSubmit = res => {
    const { form } = (this.formRef && this.formRef.props) || {}
    return new Promise(resolve => {
      wrapResponse(res)
        .then(() => {
          this.setState({
            show: false,
            submitting: false
          })
          this.props.onSuccess && this.props.onSuccess()
          notification.success({ message: res.message || '操作成功' })
          resolve(res)
          form.resetFields()
        })
        .catch(() => {
          console.log(res.message, res)
          message.error(res.message || '操作失败')
          this.setState({
            submitting: false
          })
        })
    })
  }

  submit = () => {
    const { onOk } = this.props
    const { form } = (this.formRef && this.formRef.props) || {}
    this.beforeSubmit(form)
      .then(res => onOk(res))
      .then(res => this.afterSubmit(res))
      .catch(error => {
        console.log(error)
        this.setState({
          submitting: false
        })
      })
  }

  hasFormx() {
    if (
      React.isValidElement(this.props.children) &&
      this.props.children &&
      this.props.children?.type?.displayName?.includes('Form')
    ) {
      return true
    }
    return false
  }

  renderContent(setFormRef) {
    return this.hasFormx()
      ? React.cloneElement(this.props.children, {
          onRef: setFormRef,
          submitting: this.state.submitting
        })
      : this.props.children
  }

  render() {
    const { submitting } = this.state
    const { modalCfg, title } = this.props
    const setFormRef = ref => {
      this.formRef = ref
    }
    const cls = classnames('modalx', this.props.className)
    return (
      <Modal
        {...modalCfg}
        visible={this.state.show}
        onCancel={this.onClose}
        onOk={this.onOk}
        afterClose={this.afterClose}
        title={title || modalCfg.title}
        className={cls}
        footer={
          modalCfg && modalCfg.hasFooter
            ? [
                <Button key="back" onClick={this.onClose}>
                  {modalCfg.cancelText}
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={submitting}
                  disabled={submitting}
                  onClick={this.submit}
                >
                  {modalCfg.okText}
                </Button>
              ]
            : null
        }
      >
        {this.renderContent(setFormRef)}
      </Modal>
    )
  }
}
Modalx.createModalCfg = createModalCfg

export default Modalx
