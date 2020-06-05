import { message } from 'antd'
import dayjs from 'dayjs'

// 时间格式化
export function dateFormat(val, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!val) {
    return val
  }
  return dayjs(val).format(format)
}
// // 对象转数组
export function obj2KeyValueArray(obj) {
  const array = []
  if (!obj) return array
  Object.keys(obj).forEach(o => {
    array.push({ key: o, value: obj[o] })
  })
  return array
}

// 获取搜索中的键值对
export function searchObj(string) {
  if (!string || !string.indexOf('?')) {
    return {}
  }
  const validUrl = string.match(/\?([^#]+)/)[1]
  const urlParamArr = validUrl.split('&')
  const urlParam = {}
  for (let i = 0; i < urlParamArr.length; i++) {
    const subArr = urlParamArr[i].split('=')
    const key = decodeURIComponent(subArr[0])
    const value = decodeURIComponent(subArr[1])
    urlParam[key] = value
  }
  return urlParam
}

export function getFileStream(fileUrl, fileName) {
  fetch(fileUrl, {
    method: 'POST',
    // body: window.JSON.stringify(params),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      const filename = fileName
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    })
}
export function formatTimeToString(time, formatString = 'YYYY/MM/DD') {
  if (typeof time === 'string') {
    return time
  }
  return time.format(formatString)
}
export function wrapResponse(res, errorText = '执行出错') {
  return new Promise((resolve, reject) => {
    switch (res.code) {
      case 200:
        if (res.success !== undefined && res.success === false) {
          // 处理错误情况
          message.error(res.message || errorText)
          console.assert(res.message, res)
          reject(res)
          break
        }
        resolve(res.data)
        break

      case 201:
        if (res.success !== undefined && res.success === false) {
          reject(res)
          break
        }
        resolve(res.data)
        break

      case 404:
        reject(res)
        break

      default:
        if (
          res.data?.data &&
          res.data.data.errorCode &&
          res.data.data.errorCode.indexOf('TOKEN-') === 0
        ) {
          reject(res)
          break
        }
    }
  })
}

export function scrollToAnchor(id) {
  document.getElementById(id).scrollIntoView()
}

// 防抖动函数
export function debounce(fn, wait) {
  let timer = null
  return function() {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

export function findArrObj(arr, key, target) {
  const current = arr?.find(item => item[key] === target) || {}
  return current
}
