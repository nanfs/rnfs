import { dynamic } from '@/mint'

function routerData(app) {
  return [
    {
      path: '/login',
      authority: '',
      component: dynamic({
        app,
        models: () => [],
        component: () => import('../src/pages/Login')
      }),
      meta: {
        title: '登录页面'
      }
    },
    {
      path: '/',
      authority: 'admin,security,audit',
      component: dynamic({
        app,
        models: () => [],
        component: () => import('../src/layouts/BasicLayout')
      }),
      routes: [
        {
          path: '/dashboard',
          authority: 'admin,security',
          component: dynamic({
            app,
            models: () => [],
            component: () => import('../src/pages/Dashboard/index')
          }),
          meta: {
            title: '首页',
            icon: 'home'
          }
        }
      ]
    }
  ]
}
export default routerData
