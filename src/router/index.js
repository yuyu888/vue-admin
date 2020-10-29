import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'


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
      path: '/login',
      name: 'Login',
      component: () => import('@/views/manager/login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/manager/menulist.vue'),
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

        }
      ]
    },
  ]
})
