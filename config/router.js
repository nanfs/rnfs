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
    path: '/dashboard',
    authority: 'admin,security',
    component: () => import('@/pages/Dashboard'),
    meta: {
      title: '首页',
      icon: 'home'
    }
  }
]
export default routerData
