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
    authority: 'security',
    component: () => import('@/pages/Welcome'),
    meta: {
      title: '欢迎',
      icon: 'home'
    }
  },
  {
    path: '/permission',
    exact: true,
    meta: {
      title: '权限',
      icon: 'home'
    },
    children: [
      {
        path: '/permission/403',
        component: () => import('@/pages/Permission/403'),
        meta: {
          title: '没有权限',
          icon: 'home'
        }
      },
      {
        path: '/permission/404',
        component: () => import('@/pages/Permission/404'),
        meta: {
          title: '找不到',
          icon: 'home'
        }
      }
    ]
  }
]

export default routerData
