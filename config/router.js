const routerData = [
  {
    path: '/dashboard',
    authority: 'admin,security',
    component: () => import('@/pages/Dashboard'),
    meta: {
      title: '首页',
      icon: 'home'
    }
  },
  {
    path: '/welcome',
    authority: 'admin,security',
    component: () => import('@/pages/Welcome'),
    meta: {
      title: '欢迎',
      icon: 'home'
    }
  }
]
export default routerData
