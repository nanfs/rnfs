import React from 'react'
import { Form, message } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5, pull: 1 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
}

class Formx extends React.Component {
  componentDidMount() {
    const { onRef } = this.props
    onRef && onRef(this)
    this.props.form.setFieldsValue(this.props.initValues)
    this.forceUpdate()
  }

  componentDidUpdate(prep) {
    if (
      JSON.stringify(this.props.initValues) !==
        JSON.stringify(prep.initValues) &&
      this.props.form
    ) {
      this.props.form.setFieldsValue(this.props.initValues)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    form
      .validateFieldsAndScroll((error, values) => {
        if (!error) {
          onSubmit && onSubmit(values)
        }
      })
      .catch(error => {
        message.error(error.message || error)
        console.log(error)
      })
  }

  renderFormItem = (child, submitting, isParentShow) => {
    if (!React.isValidElement(child)) {
      return child
    }
    if (child.props.name || child.props.prop) {
      const {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue
      } = this.props.form
      const fieldName = child.props.name || child.props.prop
      const rules = child.props.rules || undefined
      const validateTrigger = child.props.validateTrigger || 'onChange'
      const value = getFieldValue(fieldName)
      const values = getFieldsValue()
      const childNode = getFieldDecorator(
        fieldName,
        {
          validateTrigger,
          rules,
          valuePropName: child.props.valuepropname ? 'checked' : 'value'
        },
        {}
      )(
        React.cloneElement(child.props.children, {
          disabled: child.props.children.props.disabled || submitting,
          onChange: e => {
            const { onChange } = child.props.children.props
            // 将新值抛出去和之前不同
            onChange && onChange(e, value, values)
          }
        })
      )
      return React.cloneElement(
        child,
        { disabled: true || child.props?.disabled || submitting },
        childNode
      )
    }
    if (child.props.children) {
      const sonNode = React.Children.map(child.props.children, son =>
        this.renderFormItem(son, submitting, isParentShow)
      )
      return React.cloneElement(
        child,
        { disabled: child.props?.disabled || submitting },
        sonNode
      )
    }
    return (
      isParentShow !== false &&
      React.cloneElement(child, {
        disabled: child.props?.disabled || submitting
      })
    )
  }

  render() {
    const { children, className, style, submitting, isParentShow } = this.props
    const formLayout = this.props.formItemLayout || formItemLayout

    return (
      <Form
        {...formLayout}
        onSubmit={this.handleSubmit}
        className={className}
        style={style}
      >
        {React.Children.map(children, child =>
          this.renderFormItem(child, submitting, isParentShow)
        )}
      </Form>
    )
  }
}
export default Form.create()(Formx)
