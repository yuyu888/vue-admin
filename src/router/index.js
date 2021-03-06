import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'


Vue.use(Router)

export default new Router({
  mode: 'history', // require service support
  base: '/admin',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/manager/login.vue'),
    },
    {
      path: '/error/404',
      name: 'Page404',
      component: () => import('@/views/errpage/404.vue'),
    },
    {
      path: '/error/403',
      name: 'Page403',
      component: () => import('@/views/errpage/403.vue'),
    },
    {
      path: '/manager',
      component: Layout,
      redirect: '/manager/menulist',
      children: [
        {
          path: 'menulist',
          component: () => import('@/views/manager/menulist.vue'),
          name: 'MenuList',

        },
        {
          path: 'userlist',
          component: () => import('@/views/manager/userlist.vue'),
          name: 'UserList',

        },
        {
          path: 'rolelist',
          component: () => import('@/views/manager/rolelist.vue'),
          name: 'RoleList',

        }
      ]
    },
    {
      path: '/echart',
      component: Layout,
      redirect: '/echart/bar',
      children: [
        {
          path: 'bar',
          component: () => import('@/views/echart/bar.vue'),
          name: 'Bar',

        },
        {
          path: 'chinamap',
          component: () => import('@/views/echart/chinamap.vue'),
          name: 'ChinaMap',

        }
      ]
    },
    {
      path: '/editor',
      component: Layout,
      redirect: '/editor/wangeditor',
      children: [
        {
          path: 'wangeditor',
          component: () => import('@/views//editor/wangeditor.vue'),
          name: 'Wangeditor',

        },
        {
          path: 'jsoneditor',
          component: () => import('@/views//editor/jsoneditor.vue'),
          name: 'JsonEditor',

        },
        {
          path: 'jsonuieditor',
          component: () => import('@/views//editor/jsonuieditor.vue'),
          name: 'JsonUiEditor',

        },
        {
          path: 'tablejsoneditor',
          component: () => import('@/views//editor/tablejsoneditor.vue'),
          name: 'TableJsonEditor',

        }
      ]
    },
  ]
})
