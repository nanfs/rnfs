/* eslint-disable no-plusplus */
export function required(rule, value, callback) {
  if (value === undefined || value === null || value.length === 0) {
    return callback(new Error('这是必填项'))
  }
  callback()
}
export function isInt(rule, value, callback) {
  const re = new RegExp('^(\\-)?([1-9]{1}[0-9]*|[0-9])$')
  if (value && !re.test(value)) {
    callback(new Error('请填写整数'))
  }
  callback()
}
export function notUndefined(rule, value, callback) {
  if (value === undefined) {
    return callback(new Error('这是必填项'))
  }
  callback()
}
export function moreThanValue(min) {
  return (rule, value, callback) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !Number.isNaN(value * 1.0)
    ) {
      if (value * 1.0 < min) {
        callback(new Error(`值不能小于${min}`))
      }
    }
    callback()
  }
}
export function lessThanValue(max) {
  return (rule, value, callback) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !Number.isNaN(value * 1.0)
    ) {
      if (value * 1.0 > max) {
        callback(new Error(`值不能大于${max}`))
      }
    }
    callback()
  }
}
export function minLength(min) {
  return (rule, value, callback) => {
    if (value !== undefined && value !== null && value !== '') {
      if (value.length < min) {
        callback(new Error(`长度不能小于${min}`))
      }
    }
    callback()
  }
}
export function textRange(min = 0, max) {
  return (rule, value, callback) => {
    if (value !== undefined && value !== null && value !== '') {
      if (value.length > max) {
        callback(new Error(`最多输入${max}个字符`))
      }
      if (value.length < min) {
        callback(new Error(`最少输入${min}个字符`))
      }
    }
    callback()
  }
}

export function checkEmail(rule, value, callback) {
  const re = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)$')
  if (value && !re.test(value)) {
    callback(new Error('邮箱格式错误'))
  }
  callback()
}
