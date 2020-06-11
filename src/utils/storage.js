export function setItem(obj, dist = 'localStorage') {
  if (dist === 'localStorage') {
    for (const [key, value] of Object.entries(obj)) {
      value !== null
        ? localStorage.setItem(key, JSON.stringify(value))
        : localStorage.removeItem(key, JSON.stringify(value))
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      value !== null
        ? sessionStorage.setItem(key, JSON.stringify(value))
        : sessionStorage.removeItem(key, JSON.stringify(value))
    }
  }
}
// 清理 session
export function clearSession() {
  sessionStorage.clear()
}
// 获取
export function getItem(item, dist = 'localStorage') {
  const result =
    dist === 'localStorage'
      ? JSON.parse(localStorage.getItem(item))
      : JSON.parse(sessionStorage.getItem(item))

  return result !== null ? result : ''
}

// 从本地获取
export function getSessionItem(item) {
  return getItem(item, 'sessionStorage')
}

export function setSessionItem(item) {
  return setItem(item, 'sessionStorage')
}
