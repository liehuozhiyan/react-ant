import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/cdmsButton',
  title: '按钮',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
