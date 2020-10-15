import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

const asyncRouterList = [
  {
    path: '/roles',
    component: Layout,
    name: 'roles',
    meta: {title: '角色权限'},
    redirect: '/roles/list',

    children: [
      {
        path: 'list',
        name: 'roles/list',
        component: () => import('@/views/roles/list'),
        meta: {title: '角色管理'}
      },
      {
        path: 'userList',
        name: 'roles/userList',
        component: () => import('@/views/roles/userList'),
        meta: {title: '用户管理'}
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    name: 'channel',
    meta: {title: '渠道管理'},
    redirect: '/channel/list',
    children: [
      {
        path: 'list',
        name: 'channel/list',
        component: () => import('@/views/channel/list'),
        meta: {title: '渠道管理'}
      }
    ]
  }
];

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    name: 'Layout',
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    meta: {title: '用户中心'},
    hidden: true,
    children: [
      {
        path: '/',
        name: 'user',
        component: () => import('@/views/user/userCenter'),
        meta: {title: '用户中心'}
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/user/password'),
        meta: {title: '修改登录密码'}
      }
    ]
  },
  {path: '/login', component: () => import('@/views/user/login'), name: '登录', hidden: true},
  {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
  {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true}
  // {path: '/error', redirect: 'noredirect', name: 'errorPages', meta: {title: 'errorPages', icon: '404'}},
  // {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export {asyncRouterList};

export const asyncRouterMap = [
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   }
  // },
  {path: '*', redirect: '/404', hidden: true}]
