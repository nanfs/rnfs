// 获取项目参数
export function getPropertieslocal() {
  return JSON.parse(sessionStorage.getItem('properties')) || {}
}

// 设置项目参数
export function setPropertiesToLocal(properties) {
  if (properties) {
    sessionStorage.setItem('properties', JSON.stringify(properties))
  } else {
    sessionStorage.removeItem('properties')
  }
}

export function setItemToLocal(Obj) {
  if (Obj) {
    for (const [key, value] of Object.entries(Obj)) {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  } else {
    sessionStorage.clear()
  }
}

export function setObjItemTolocal(ObjName, Obj) {
  if (!ObjName) {
    sessionStorage.clear()
  } else if (Obj) {
    sessionStorage.setItem(ObjName, JSON.stringify(Obj))
  } else {
    sessionStorage.removeItem(ObjName)
  }
}

// 从本地获取
export function getItemFromLocal(item) {
  return JSON.parse(sessionStorage.getItem(item)) || ''
}
