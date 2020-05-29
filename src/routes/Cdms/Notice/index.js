import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/cdmsNotice',
  title: 'notice',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
