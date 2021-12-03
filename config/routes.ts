/*
 * @Author: ylyu
 * @Date: 2021-11-17 14:59:32
 * @LastEditors: ylyu
 * @LastEditTime: 2021-12-03 16:12:14
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
    path: '/formily',
    name: 'Formily',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/formily/demo',
        name: 'Formily-demo',
        component: './formily/FormilyDemo',
      },
      {
        path: '/formily/login',
        name: 'Formily-登录',
        component: './formily/FormilyLogin',
      },
      {
        path: '/formily/reg',
        name: 'Formily-注册',
        component: './formily/FormilyReg',
      },
      {
        path: '/formily/1v1',
        name: 'Formily-联动一对一',
        component: './formily/FormilyV1',
      },
      {
        path: '/formily/1v2',
        name: 'Formily-联动一对多',
        component: './formily/FormilyV2',
      },
      {
        path: '/formily/dep',
        name: 'Formily-依赖联动',
        component: './formily/FormilyDep',
      },
      {
        path: '/formily/chain',
        name: 'Formily-链式联动',
        component: './formily/FormilyChained',
      },
      {
        path: '/formily/circle',
        name: 'Formily-循环联动',
        component: './formily/FormilyCircle',
      },
      {
        path: '/formily/self',
        name: 'Formily-自身联动',
        component: './formily/FormilySelf',
      },
      {
        path: '/formily/asyn',
        name: 'Formily-异步联动',
        component: './formily/FormilyAsyn',
      },
    ],
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
