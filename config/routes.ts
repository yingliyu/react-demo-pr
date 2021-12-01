/*
 * @Author: ylyu
 * @Date: 2021-11-17 14:59:32
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-01 15:08:27
 * @Description:
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/formily-login',
    name: 'formily-login',
    icon: 'smile',
    component: './FormilyLogin',
  },
  {
    path: '/formily-1v1',
    name: 'formily联动1v1',
    icon: 'smile',
    component: './FormilyAdvanced',
  },
  {
    path: '/formily-1v2',
    name: 'formily联动1v2',
    icon: 'smile',
    component: './FormilyAdvanced2',
  },
  {
    path: '/formily-dep',
    name: 'formily依赖联动',
    icon: 'smile',
    component: './FormilyDep',
  },
  {
    path: '/formily-chain',
    name: 'formily链式联动',
    icon: 'smile',
    component: './FormilyChained',
  },
  {
    path: '/formily-circle',
    name: 'formily循环联动',
    icon: 'smile',
    component: './FormilyCircle',
  },
  {
    path: '/formily-self',
    name: 'formily自身联动',
    icon: 'smile',
    component: './FormilySelf',
  },
  {
    path: '/formily-asyn',
    name: 'formily异步联动',
    icon: 'smile',
    component: './FormilyAsyn',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
