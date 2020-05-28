import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/cdmsIcon',
  title: 'icon',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
