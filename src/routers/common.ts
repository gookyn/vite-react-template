import { lazy } from 'react';

const commonRouters: object[] = [
  {
    path: '/welcome',
    KeepAlive: true,
    component: lazy(() => import('@/pages/welcome')),
  },
  {
    path: '/home',
    KeepAlive: true,
    component: lazy(() => import('@/pages/home')),
  },
];

export default commonRouters;
